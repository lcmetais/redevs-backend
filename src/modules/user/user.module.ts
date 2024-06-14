import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserPhotoModule } from '../userphoto/userphoto.module';

@Module({
  controllers: [
    UserController,
  ],
  providers: [
    UserService,
  ],
  imports: [
    PrismaModule,
    UserPhotoModule
  ],
  exports: [
    UserService,
  ]
})
export class UserModule { }
