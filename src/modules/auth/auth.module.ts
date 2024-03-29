import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtUnverifiedUserStrategy } from './strategies/jwt-unverified-user.strategy';
import { JwtUserStrategy } from './strategies/jwt-user.strategy';

import { UsersModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.get('jwt.privateKey'),
        publicKey: configService.get('jwt.publicKey'),
        signOptions: { expiresIn: configService.get('jwt.expiresIn'), algorithm: 'RS256' },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
    }),
    UsersModule,
  ],
  providers: [AuthService, JwtUnverifiedUserStrategy, JwtUserStrategy],
  controllers: [AuthController],
  exports: [JwtUnverifiedUserStrategy, JwtUserStrategy, PassportModule],
})
export class AuthModule {}
