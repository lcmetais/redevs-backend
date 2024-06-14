import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshJwtStrategy } from './strategies/refreshToken.strategy';
import { MailModule } from 'src/services/mail/mail.module';

@Module({
  providers: [
    AuthService,
    UserService,
    PrismaService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy
  ],
  controllers: [
    AuthController
  ],
  exports: [
    AuthService
  ],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET
    }),
    MailModule
  ]
})
export class AuthModule { }
