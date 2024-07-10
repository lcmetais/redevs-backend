import { Module } from '@nestjs/common';
import { AdvertModule } from '../advert/advert.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [PrismaModule, AdvertModule],
})
export class AdminModule { }
