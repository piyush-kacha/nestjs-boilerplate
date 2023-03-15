import * as bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { plainToClass } from 'class-transformer';

import { BadRequestException } from '../../exceptions/bad-request.exception';
import { LoginRequestDTO, LoginResponse, SignupRequestDTO, SignupResponse, VerifyOTPRequestDTO, VerifyOTPResponse } from './dtos';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { User, UserDocument } from '../user/user.schema';
import { UserQueryService } from '../user/user.query.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userQueryService: UserQueryService, private readonly jwtService: JwtService) {}

  /**
   * Checks if a user with the given email already exists in the database
   * @param {string} email - email to check for existence in database
   * @returns {Promise<void>}
   * @throws {BadRequestException} - throws an error if a user with the email already exists in the database
   */
  async checkUserExists(email: string): Promise<void> {
    const user = await this.userQueryService.findByEmail(email);
    if (user) {
      throw BadRequestException.RESOURCE_ALREADY_EXISTS('A user with this email address already exists.');
    }
  }

  /**
   * Generates a random six digit OTP
   * @returns {number} - returns the generated OTP
   */
  generateOTP(): number {
    const OTP_MIN = 100000;
    const OTP_MAX = 999999;
    return Math.floor(Math.random() * (OTP_MAX - OTP_MIN + 1)) + OTP_MIN;
  }

  /**
   * Sends a verification email to the user's email address
   * @param {User} user - the user object to send the verification email to
   * @returns {Promise<void>}
   */
  async sendVerificationEmail(user: User) {
    const verificationLink = `http://your-website.com/auth/verify?code=${user.verificationCode}`;
    const email = {
      to: user.email,
      from: 'noreply@your-website.com',
      subject: 'Verify your email',
      html: `
        <p>Hello ${user.name},</p>
        <p>Thank you for signing up with our website.</p>
        <p>Please click the link below to verify your email:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
      `,
    };
    this.logger.debug(email);
    // send email request to mail service
  }

  /**
   * Signs up a new user
   * @param {SignupRequestDTO} signupRequestDTO - object containing the user's signup information (email, password, name)
   * @returns {Promise<SignupResponse>} - returns an object containing a message indicating the user should check their email for verification code
   * @throws {BadRequestException} - throws an error if the email address provided already exists in the database
   */
  async signup(signupRequestDTO: SignupRequestDTO): Promise<SignupResponse> {
    const { email, password, name } = signupRequestDTO;
    await this.checkUserExists(email);

    const saltOrRounds = 10;

    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const createUserDTO: User = {
      name,
      email,
      password: hashedPassword,
      verified: false,
      verificationCode: this.generateOTP(),
    };

    const user = await this.userQueryService.create(createUserDTO);
    await this.sendVerificationEmail(user);

    return {
      message: 'Please check your email for the verification code',
    };
  }

  /**
   * Validates the user with the given email and password.
   * @param {string} email - The email address of the user to validate.
   * @param {string} password - The password of the user to validate.
   * @returns {Promise<UserDocument>} A Promise that resolves to a UserDocument representing the validated user.
   * @throws {UnauthorizedException} If no user is found with the given email address or if the password is invalid.
   */

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userQueryService.findByEmail(email);
    if (!user) {
      throw UnauthorizedException.RESOURCE_NOT_FOUND('No user found with this email address.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS('Invalid credentials');
    }
    return user;
  }

  /**
   * Login service that takes in a loginRequestDTO
   * @param {LoginRequestDTO} loginRequestDTO The DTO with the email and password provided by the user
   * @returns {Promise<LoginResponse>} Returns an object containing the AccessToken and userInfo.
   */
  async login(loginRequestDTO: LoginRequestDTO): Promise<LoginResponse> {
    const { email, password } = loginRequestDTO;

    let user = await this.validateUser(email, password);

    const payload = {
      _id: user._id,
      email: user.email,
    };
    const accessToken = await this.jwtService.sign(payload);

    user = plainToClass(User, user, { excludeExtraneousValues: true });
    return {
      accessToken,
      user,
    };
  }

  /**
   * Verify user's OTP code
   * @param {VerifyOTPRequestDTO} verifyOTPRequestDTO The verification request data transfer object
   * @param {UserDocument} user User document
   * @returns {Promise<VerifyOTPResponse>} Returns the response containing a message indicating success or failure of the operation
   */
  async verifyOTP(verifyOTPRequestDTO: VerifyOTPRequestDTO, user: UserDocument): Promise<VerifyOTPResponse> {
    const { otp } = verifyOTPRequestDTO;

    // Check if the OTP provided matches the stored verification code for the user in question
    if (user.verificationCode !== otp) {
      throw UnauthorizedException.UNAUTHORIZED_ACCESS('Invalid verification code');
    }

    // Update the verified status of the user in the database to true
    await this.userQueryService.updateVerifiedStatus(user._id);

    // Return a response containing a success message
    return {
      message: 'Your email has been verified successfully',
    };
  }
}
