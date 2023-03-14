import * as bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { BadRequestException } from '../../exceptions/bad-request.exception';
import { LoginRequestDTO, LoginResponse, SignupRequestDTO, SignupResponse } from './dtos';
import { UnauthorizedException } from '../../exceptions/unauthorized.exception';
import { User, UserDocument } from '../user/user.schema';
import { UserQueryService } from '../user/user.query.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private readonly userQueryService: UserQueryService, private readonly jwtService: JwtService) {}

  async checkUserExists(email: string): Promise<void> {
    const user = await this.userQueryService.findByEmail(email);
    if (user) {
      throw BadRequestException.RESOURCE_ALREADY_EXISTS('A user with this email address already exists.');
    }
  }

  generateOTP(): number {
    const OTP_MIN = 100000;
    const OTP_MAX = 999999;
    return Math.floor(Math.random() * (OTP_MAX - OTP_MIN + 1)) + OTP_MIN;
  }

  async sendVerificationEmail(user: UserDocument) {
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

  async validateUser(email: string, password: string): Promise<UserDocument> {
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

  async login(loginRequestDTO: LoginRequestDTO): Promise<LoginResponse> {
    const { email, password } = loginRequestDTO;

    const user = await this.validateUser(email, password);

    const payload = {
      _id: user._id,
      email: user.email,
    };
    const accessToken = await this.jwtService.sign(payload);

    const userObj = this.userQueryService.convertDocumentToUser(user);

    delete userObj.password;
    delete userObj.verificationCode;

    return {
      accessToken,
      user: userObj,
    };
  }
}
