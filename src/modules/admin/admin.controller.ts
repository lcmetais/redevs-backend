import { Controller, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

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
}
