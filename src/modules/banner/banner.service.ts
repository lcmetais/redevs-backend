import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddBannerDTO } from './dtos/add-banner.dto';
import { UpdateBannerDTO } from './dtos/update-banner.dto';

@Injectable()
export class BannerService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async addNewBanner(addBannerDto: AddBannerDTO) {
        const newBanner = await this.prisma.banner.create({
            data: { ...addBannerDto }
        });

        return {
            banner: {
                ...newBanner,
                id: undefined,
                createdat: undefined,
                updatedAt: undefined,
                deletedAt: undefined
            },
            message: 'Banner adicionado com sucesso'
        }
    }

    async getBanners() {
        const banners = await this.prisma.banner.findMany({
            where: {
                deletedAt: null
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        const mappedBanners = banners.map((banner) => {
            return {
                id: banner.id,
                bannerName: banner.bannerName,
                bannerUrl: banner.bannerUrl
            }
        });

        return mappedBanners;
    }

    async updateBanner(id: string, updatedBannerDto: UpdateBannerDTO) {
        const banner = await this.prisma.banner.findFirst({
            where: {
                id
            }
        });

        if (!banner) throw new NotFoundException('Banner não encontrado!');

        const updatedBanner = await this.prisma.banner.update({
            where: { id: banner.id },
            data: {
                bannerName: updatedBannerDto.newBannerName,
                bannerUrl: updatedBannerDto.newBannerUrl
            }
        });

        return {
            banner: {
                ...updatedBanner,
                id: undefined,
                createdat: undefined,
                updatedAt: undefined,
                deletedAt: undefined
            },
            message: 'Banner atualizado!'
        }
    }

    async deleteBanner(id: string) {
        const banner = await this.prisma.banner.findFirst({
            where: {
                id
            }
        });

        if (!banner) throw new NotFoundException('Banner não encontrado!');

        await this.prisma.banner.update({
            where: { id: banner.id },
            data: {
                deletedAt: new Date()
            }
        });

        return {
            message: 'Banner deletado!'
        }
    }
}
