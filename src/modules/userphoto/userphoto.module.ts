import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UserPhotoService } from './userphoto.service';

@Module({
    providers: [UserPhotoService],
    imports: [PrismaModule],
    exports: [UserPhotoService]
})
export class UserPhotoModule { };