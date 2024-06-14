import { Injectable } from '@nestjs/common';
import { AdvertNotFoundError } from 'src/common/errors/advert-not-found.error';
import { AdvertsNotFoundError } from 'src/common/errors/adverts-not-found.error';
import { UserNotFoundError } from 'src/common/errors/user-not-fund.error';
import { advertToReturnMapper } from 'src/common/mappers/advert-to-return.mapper';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';

@Injectable()
export class AdvertService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(userId: string, createAdvetDto: CreateAdvertDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      throw new UserNotFoundError('User not found!');

    const createdAdvert = await this.prisma.advert.create({
      data: {
        name: createAdvetDto.name,
        value: Number(createAdvetDto.value),
        shortDescription: createAdvetDto.shortDescription,
        longDescription: createAdvetDto.longDescription,
        specificPhone: createAdvetDto.specificPhone,
        owner: { connect: { id: userId } },
        category: createAdvetDto.category,
        deletedAt: null,
      },
    });

    return advertToReturnMapper(createdAdvert);
  }

  async findUniqueAdvert(id: string) {
    const advert = await this.prisma.advert.findUnique({
      where: {
        id
      }
    });

    if (!advert) throw new AdvertNotFoundError();

    return {
      ...advert
    }
  }

  async findAllWithFilters(
    name: string,
    // category: string,
    take: number,
    skip: number
  ) {
    const [allAdverts, totalAdverts] = await this.prisma.$transaction([
      this.prisma.advert.findMany({
        select: {
          id: true,
          name: true,
          category: true,
          images: {
            select: {
              id: true,
              originalName: true,
              imageStorageUrl: true
            },
            where: {
              deletedAt: null
            }
          },
          shortDescription: true,
          longDescription: true,
          specificPhone: true,
          value: true
        },
        where: {
          deletedAt: null,
          isApproved: true,
          name: {
            contains: `${name}`,
            mode: 'insensitive'
          }
        },
        orderBy: [
          { name: 'desc' },
          { createdAt: 'desc' }
        ],
        skip: (skip - 1) * take,
        take: take
      }),
      this.prisma.advert.count({
        where: {
          deletedAt: null,
          isApproved: true,
          name: {
            contains: `${name}`,
            mode: 'insensitive'
          }
        },
      }),
    ]);

    if (!allAdverts.length) {
      return {
        data: [],
        count: 0,
        currPage: skip,
        nextPage: skip + 1,
        prevPage: skip - 1 < 0 ? 0 : skip - 1,
        lastPage: 1,
      };
    }

    return {
      data: allAdverts,
      count: totalAdverts,
      currPage: skip,
      nextPage: (skip + 1) > (totalAdverts / allAdverts.length) ? skip : skip + 1,
      prevPage: (skip - 1) < 0 ? skip : skip - 1,
      lastPage: Math.ceil(totalAdverts / allAdverts.length),
    };
  }

  async findAllByOwner(ownerId: string) {
    const adverts = await this.prisma.advert.findMany({
      where: {
        ownerId: ownerId,
        deletedAt: {
          equals: null,
        },
      },
      include: {
        images: true,
      },
    });

    if (!adverts) throw new AdvertsNotFoundError();

    return adverts;
  }

  async update(id: string, updateAdvetDto: UpdateAdvertDto) {
    if (!updateAdvetDto) throw new Error('Nenhum dado foi informado para atualizar!');

    const data: UpdateAdvertDto = {}

    const advert = await this.findUniqueAdvert(id);

    if (updateAdvetDto.name && updateAdvetDto.name !== advert.name)
      data.name = updateAdvetDto.name;

    if (Number(updateAdvetDto.value) && Number(updateAdvetDto.value) !== advert.value)
      data.value = Number(updateAdvetDto.value);

    if (updateAdvetDto.shortDescription && updateAdvetDto.shortDescription !== advert.shortDescription)
      data.shortDescription = updateAdvetDto.shortDescription;

    if (updateAdvetDto.longDescription && updateAdvetDto.longDescription !== advert.longDescription)
      data.longDescription = updateAdvetDto.longDescription;

    if (updateAdvetDto.specificPhone && updateAdvetDto.specificPhone !== advert.specificPhone)
      data.specificPhone = updateAdvetDto.specificPhone;

    if (updateAdvetDto.category && updateAdvetDto.category !== advert.category)
      data.category = updateAdvetDto.category;

    const advertUpdated = await this.prisma.advert.update({
      where: {
        id
      },
      data: {
        ...data,
        updatedAt: new Date()
      }
    });

    return advertToReturnMapper(advertUpdated);
  }

  async remove(id: string) {

    await this.prisma.advert.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    });

    await this.prisma.image.updateMany({
      data: {
        deletedAt: new Date()
      },
      where: {
        advertId: id
      }
    });

    return {
      message: "Advert successfully deleted"
    }
  }
}
