import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { IsPublic } from 'src/common/decorators/is-public.decorator';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { GetUserId } from 'src/common/decorators/user.decorator';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @IsPublic()
  @Get('/get/id/:id')
  findOneById(@Param('id',) id: string) {
    return this.userService.findUserById(id);
  }

  @Get('/get/userdataonly/')
  findUserDataOnly(@Query('id') id: string, @GetUserId() userId: string) {
    return this.userService.findUserDataOnly(id ?? userId);
  }

  @IsPublic()
  @Get('/get/name/:name')
  findOneByName(@Param('name') name: string) {
    return this.userService.findUsersByName(name);
  }

  // @Get('/get/email/:email')
  // findOneByEmail(@Param('email') email: string) {
  //   return this.userService.findUserByEmail(email);
  // }

  @Patch('/patch/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
