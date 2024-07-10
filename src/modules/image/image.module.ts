import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [PrismaModule],
  exports: [ImageService]
})
export class ImageModule { }
