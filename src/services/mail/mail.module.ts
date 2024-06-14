import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { UserModule } from 'src/modules/user/user.module';

@Module({
  imports: [UserModule],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule { }
