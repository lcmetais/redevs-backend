import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserPhoto } from './dto/userphoto.dto';

@Injectable()
export class UserPhotoService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async createUserPhoto(createUserPhoto: CreateUserPhoto, userId: string) {
        const createUserPhotoInDataBase = await this.prisma.userPhoto.create({
            data: {
                ...createUserPhoto,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        return {
            message: 'Photo added sucessfully!',
            photo: {
                ...createUserPhotoInDataBase
            }
        }
    }

    async deleteUserPhoto(userId: string) {
        const findUserPhoto = await this.prisma.userPhoto.findFirst({
            where: {
                userId
            }
        });

        if (!findUserPhoto) throw Error('Photo not find');

        await this.prisma.userPhoto.delete({
            where: {
                userId
            }
        });

        return {
            message: 'Photo deleted sucessfully!'
        }
    }
}
