import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { BadRequestException } from '../../exceptions/bad-request.exception';
import { SignupRequestDTO } from './dtos/signup-request.dto';
import { SignupResponse } from './dtos/signup-response.dto';
import { User, UserDocument } from '../user/user.schema';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  checkUserExists(email: string): void {
    const user = this.userService.findByEmail(email);
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
    console.log(email);
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

    const user = await this.userService.create(createUserDTO);
    await this.sendVerificationEmail(user);

    return {
      message: 'Please check your email for the verification code',
    };
  }
}
