import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AdvertController } from './advert.controller';
import { AdvertService } from './advert.service';
import { UserModule } from '../user/user.module';
import { MailModule } from 'src/services/mail/mail.module';

@Module({
  controllers: [
    AdvertController
  ],
  providers: [
    AdvertService
  ],
  imports: [
    PrismaModule,
    UserModule,
    MailModule
  ],
  exports: [
    AdvertService
  ]
})
export class AdvertModule { }
