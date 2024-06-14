import { } from "@prisma/client";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message: 'Password is too weak'
    })
    password: string;

    @IsString()
    phone: string;
}
