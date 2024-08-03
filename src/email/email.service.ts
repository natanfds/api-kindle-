import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly emailHost: string;
  private readonly emailPort: number;
  private readonly emailUser: string;
  private readonly emailPass: string;
  private readonly emailFrom: string;

  constructor(private configService: ConfigService) {
    this.emailHost = this.configService.get<string>('EMAIL_HOST');
    this.emailPort = this.configService.get<number>('EMAIL_PORT');
    this.emailUser = this.configService.get<string>('EMAIL_USER');
    this.emailPass = this.configService.get<string>('EMAIL_PASS');
    this.emailFrom = this.configService.get<string>('EMAIL_FROM');
  }

  public async sendEmail(
    emailTo: string,
    fileName: string,
    fileContent: Buffer,
  ) {
    const transporter = await nodemailer
      .createTransport(
        {
          host: this.emailHost,
          port: this.emailPort,
          secure: process.env.EMAIL_SECURE === 'true',
          auth: {
            user: this.emailUser,
            pass: this.emailPass,
          },
        },
        {
          from: this.emailFrom,
        },
      )
      .sendMail({
        to: emailTo,
        subject: 'Document from api',
        attachments: [
          {
            filename: fileName,
            content: fileContent,
          },
        ],
      });

    const { accepted, rejected, response, envelope, messageId } = transporter;

    return {
      accepted,
      rejected,
      response,
      envelope,
      messageId,
    };
  }
}
