import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) { }

    @Post('/login')
    async login(@Body() body) {
        return await this.authService.login(body);
    }

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Post('/refresh/:token')
    async refresh(@Param('token') refreshToken) {
        return this.authService.refreshToken(refreshToken);
    }

    @Get('/forgotpassword/:email')
    async forgotpassword(@Param('email') email: string) {
        return this.authService.forgotpassword(email);
    }

}
