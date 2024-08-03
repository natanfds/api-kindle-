import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from '../types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('email')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send email with attachment' })
  @ApiResponse({ status: 201, description: 'Email sent successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid file content, it must be base64 encoded',
  })
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

    try {
      await this.emailService.sendEmail(
        sendEmailDto.emailTo,
        sendEmailDto.fileName,
        buffer,
      );
      return { message: 'Email sent successfully' };
    } catch (e) {
      console.log(e);
      throw new BadRequestException('Failed to send email');
    }
  }
}
