import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtDecode } from 'jwt-decode';
import { IPayload } from 'src/common/interfaces/payload.interface';
import { UserService } from 'src/modules/user/user.service';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../user/entities/user.entity';
import { UserNotFoundError } from 'src/common/errors/user-not-fund.error';
import { MailService } from 'src/services/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService,
        private readonly mailService: MailService
    ) { }

    async validateUser(email: string, password: string) {
        try {
            const user = await this.userService.findUserByEmail(email);

            if (!user) {
                return null;
            }

            const passwordIsValid = await bcrypt.compare(password, user.password);

            if (!passwordIsValid) {
                return null;
            }

            const { password: _, ...result } = user;
            return result;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }

    async login(user: User) {
        const userValidated = await this.validateUser(user.email, user.password);

        if (!userValidated) throw new UnauthorizedException();

        const payloadForAccessToken: IPayload = {
            sub: userValidated.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 2,
            nbf: Math.floor(Date.now() / 1000),
            iat: Math.floor(Date.now() / 1000),
            jti: uuidv4(),
        };
        const payloadForRefreshToken: IPayload = {
            sub: userValidated.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 4,
            nbf: Math.floor(Date.now() / 1000),
            iat: Math.floor(Date.now() / 1000),
            jti: uuidv4(),
        };

        return {
            accessToken: this.jwtService.sign(payloadForAccessToken),
            refreshToken: this.jwtService.sign(payloadForRefreshToken),
        };
    }

    async refreshToken(refreshToken) {
        const payloadFromToken = jwtDecode<IPayload>(refreshToken);

        const payloadForAccessToken: IPayload = {
            sub: payloadFromToken.sub,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 * 2,
            nbf: Math.floor(Date.now() / 1000),
            iat: Math.floor(Date.now() / 1000),
            jti: uuidv4(),
        };

        return {
            accessToken: await this.jwtService.signAsync(payloadForAccessToken),
        };
    }

    async forgotpassword(email: string) {
        const user = await this.userService.findUserByEmail(email);

        if (!user) throw new UserNotFoundError();

        const payloadForForgotPassword: IPayload = {
            sub: user.id,
            exp: Math.floor(Date.now() / 1000) + 60 * 5,
            nbf: Math.floor(Date.now() / 1000),
            iat: Math.floor(Date.now() / 1000),
            jti: uuidv4(),
        };

        const htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Redefinição de senha</title>
        </head>
        <body style="font-family: Arial, sans-serif;">

            <h1>Redefinição de senha</h1>
            
            <p>Olá, ${user.name}</p>
            
            <p>Você solicitou a redefinição de sua senha. Para continuar, clique no link abaixo:</p>
            
            <p><a href="http://redevs.com.br/esqueceusenha/redefinirsenha?token=${this.jwtService.sign(payloadForForgotPassword)}" style="text-decoration: none; color: #007bff;">Redefinir senha</a></p>
            
            <p>Se você não solicitou a redefinição de senha, por favor, ignore este e-mail.</p>
            
            <p>Obrigado,</p>
            <p>Rede VS</p>

        </body>
        </html>`;

        await this.mailService.sendMail({
            to: email,
            subject: 'Redefinição de Senha',
            text: '',
            html: htmlContent
        });
    }
}
