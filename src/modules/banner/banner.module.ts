import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [BannerService],
  imports: [PrismaModule],
  exports: [BannerService]
})
export class BannerModule { }
