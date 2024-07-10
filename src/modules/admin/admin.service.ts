import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getAllAdvertsNotApproved(take: number, skip: number) {
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
                    isApproved: false,
                },
                orderBy: [
                    { name: 'desc' },
                    { createdAt: 'desc' }
                ],
                skip: (skip - 1) * 24,
                take: take
            }),
            this.prisma.advert.count({
                where: {
                    deletedAt: null,
                    isApproved: false,
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

    async approveAdvert(id: string) {
        const updatedAdvert = await this.prisma.advert.update({
            where: {
                id
            },
            data: {
                isApproved: true
            }
        });

        if (!updatedAdvert) throw new Error('Erro ao aprovar anúncio!');

        return {
            message: 'Anúncio aprovado com sucesso!'
        }
    }

    async getAllUser() {
        const users = await this.prisma.user.findMany({
            where: {
                deletedAt: null
            }
        });

        return users;
    }
}
