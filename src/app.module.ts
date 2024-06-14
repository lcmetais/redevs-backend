import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { AdvertModule } from './modules/advert/advert.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { UserPhotoModule } from './modules/userphoto/userphoto.module';
import { MailModule } from './services/mail/mail.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AdvertModule,
    AuthModule,
    ImageModule,
    UserPhotoModule,
    AdminModule,
    MailModule
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
