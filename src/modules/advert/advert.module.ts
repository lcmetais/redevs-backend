import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AdvertController } from './advert.controller';
import { AdvertService } from './advert.service';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [
    AdvertController
  ],
  providers: [
    AdvertService
  ],
  imports: [
    PrismaModule,
    UserModule
  ],
  exports: [
    AdvertService
  ]
})
export class AdvertModule { }
