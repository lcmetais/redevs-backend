import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { ImageService } from './image.service';
import { TCreateImage } from './dto/create-image.dto';

@UseGuards(JwtGuard)
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post('/create/')
  async uploadImage(@Body() image: TCreateImage) {
    return await this.imageService.create(image);
  }

  @Delete('/remove/:id')
  async deleteImage(@Param('id') id: string) {
    return await this.imageService.remove(id);
  }
}
