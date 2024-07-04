import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailObjectDTO } from './dtos/send-mail-object.dto';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class MailService {
    private transporter;

    constructor(private readonly userService: UserService) {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "lcmetaismg@gmail.com",
                pass: process.env.MAIL_PASS
            }
        });
    }

    async sendMail(sendMailObjectDto: SendMailObjectDTO): Promise<void> {
        try {
            await this.transporter.sendMail({
                from: `Rede VS <lcmetaismg@gmail.com>`,
                to: sendMailObjectDto.to,
                subject: sendMailObjectDto.subject,
                text: sendMailObjectDto.text,
                html: sendMailObjectDto.html
            });

            console.log('Email enviado.');
        } catch (error) {
            console.error(error);
        }
    }
}
