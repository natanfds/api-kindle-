import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from '../types';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    let buffer: Buffer;
    try {
      buffer = Buffer.from(sendEmailDto.fileContent, 'base64');
    } catch (e) {
      console.log(e);
      throw new BadRequestException(
        'Invalid file content, it must be base64 encoded',
      );
    }
    return await this.emailService.sendEmail(
      sendEmailDto.emailTo,
      sendEmailDto.fileName,
      buffer,
    );
  }
}
