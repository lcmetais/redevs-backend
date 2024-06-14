import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { AdvertService } from './advert.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';

@UseGuards(JwtGuard)
@Controller('advert')
export class AdvertController {
  constructor(private readonly advetService: AdvertService) { }

  @Post('/create/')
  async create(@CurrentUser() owner, @Body() createAdvetDto: CreateAdvertDto) {
    return await this.advetService.create(owner.user, createAdvetDto);
  }

  @IsPublic()
  @Get('/get')
  async findAllWithFilters(
    @Query('name') name: string,
    // @Query('category') category: string,
    @Query('take') take: number,
    @Query('skip') skip: number
  ) {
    return await this.advetService.findAllWithFilters(name, take, skip);
  }

  @IsPublic()
  @Get('/get/owner/:ownerId/')
  async findAllByOwner(@Param('ownerId') ownerId: string) {
    return await this.advetService.findAllByOwner(ownerId);
  }

  @Patch('/patch/:id')
  async update(@Param('id') id: string, @Body() updateAdvetDto: UpdateAdvertDto) {
    return await this.advetService.update(id, updateAdvetDto);
  }

  @Delete('/delete/remove/:id')
  async remove(@Param('id') id: string) {
    return await this.advetService.remove(id);
  }
}
