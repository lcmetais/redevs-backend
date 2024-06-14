import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AdvertModule } from '../advert/advert.module';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [PrismaModule, AdvertModule],
})
export class AdminModule { }
