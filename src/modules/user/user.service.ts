import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserNotFoundError } from 'src/common/errors/user-not-fund.error';
import { UsersNotFoundError } from 'src/common/errors/users-not-found.error';
import { userToReturnMapper } from 'src/common/mappers/user-to-return.mapper';
import { UserDeletedError } from 'src/common/errors/user-deleted.error';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 12)
    };

    const createdUser = await this.prisma.user.create({
      data: {
        ...data,
        adverts: {
          create: []
        }
      }
    });

    return userToReturnMapper(createdUser);
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null
      },
      include: {
        adverts: true,
        UserPhoto: true
      }
    });

    if (!user) throw new UserNotFoundError('User not found!');

    return { ...user, password: undefined };
  }

  async findUserDataOnly(id: string) {
    return {
      ...await this.prisma.user.findFirst({
        where: {
          id,
          deletedAt: null
        },

      }),
      password: undefined
    }
  }

  async findUsersByName(name: string) {
    const users = await this.prisma.user.findMany({
      where: {
        name: {
          contains: `${name}`,
          mode: 'insensitive'
        },
      },
    });


    if (!users) throw new UsersNotFoundError('User not found!');

    return users;
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email: email }
    });

    if (!user) throw new UserNotFoundError('User not found!');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(id);
    const data: UpdateUserDto = {}

    if (!user)
      throw new UserNotFoundError('User not found!');

    if (updateUserDto.email && updateUserDto.email !== user.email)
      data.email = updateUserDto.email;

    if (updateUserDto.password && updateUserDto.password !== user.password)
      data.password = bcrypt.hashSync(updateUserDto.password, 10);

    if (updateUserDto.name && updateUserDto.name !== user.name)
      data.name = updateUserDto.name;

    if (updateUserDto.phone &&
      updateUserDto.phone !== user.phone)
      data.phone = updateUserDto.phone;

    const userUpdated = await this.prisma.user.update({
      where: { id },
      data
    });

    return userToReturnMapper(userUpdated);
  }

  async remove(id: string) {
    const user = await this.findUserById(id);

    if (!user) throw new UserNotFoundError('User not found!');

    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() }
    });

    await this.prisma.advert.updateMany({
      data: {
        deletedAt: new Date()
      },
      where: {
        ownerId: id
      }
    });

    await this.prisma.userPhoto.update({
      data: {
        deleteAt: new Date()
      },
      where: {
        userId: id
      }
    })

    return {
      message: "User deleted successfully!"
    };
  }
}
