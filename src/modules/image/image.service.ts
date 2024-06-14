import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TCreateImage } from './dto/create-image.dto';
import { Image } from '@prisma/client';

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) { }

  async create(image: TCreateImage) {

    const imageToSave: Partial<Image> = {
      originalName: image.originalName,
      advertId: image.advertId,
      imageStorageUrl: image.imageStorageUrl
    }

    await this.prisma.image.create({
      data: {
        imageStorageUrl: imageToSave.imageStorageUrl,
        originalName: imageToSave.originalName,
        advert: { connect: { id: imageToSave.advertId } }
      }
    });

    return { message: "Images salvas com sucesso!" };
  }

  async remove(id: string) {
    await this.prisma.image.update({
      data: {
        deletedAt: new Date()
      },
      where: {
        id
      }
    });

    return { message: 'Image Deletada!' }
  }
}
