import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { BannerService } from '../banner/banner.service';
import { AddBannerDTO } from '../banner/dtos/add-banner.dto';
import { UpdateBannerDTO } from '../banner/dtos/update-banner.dto';
import { IsPublic } from 'src/common/decorators/is-public.decorator';

@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly bannerService: BannerService
  ) { }

  @Get('/advertsnotapproved')
  getAllAdvertsNotApproved(
    @Query('take') take: number,
    @Query('skip') skip: number
  ) {
    return this.adminService.getAllAdvertsNotApproved(take, skip);
  }

  @Get('/users')
  getUsers() {
    return this.adminService.getAllUser();
  }

  @Put('/user/:id')
  updateRole(@Param('id') userId: string) {
    return this.adminService.updateUserRole(userId);
  }

  @Put('/advertaprrove/:id')
  approveAdvert(@Param('id') id: string) {
    return this.adminService.approveAdvert(id);
  }

  @Post('/banner')
  createNewBanner(@Body() addBannerDto: AddBannerDTO) {
    return this.bannerService.addNewBanner(addBannerDto);
  }

  @IsPublic()
  @Get('/banners')
  getBanner() {
    return this.bannerService.getBanners();
  }

  @Put('/banner/:id')
  updateBanner(
    @Param('id') bannerId: string,
    @Body() newDataForBanner: UpdateBannerDTO,
  ) {
    return this.bannerService.updateBanner(bannerId, newDataForBanner);
  }

  @Delete('/banner/:id')
  removeBanner(@Param('id') bannerId: string) {
    return this.bannerService.deleteBanner(bannerId);
  }
}
