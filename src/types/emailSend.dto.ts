import { ApiProperty } from '@nestjs/swagger';

export class SendEmailDto {
  @ApiProperty({ description: 'Email address to send the file to' })
  emailTo: string;
  @ApiProperty({ description: 'Name of the file to send to the email' })
  fileName: string;
  @ApiProperty({ description: 'Base64 encoded file content' })
  fileContent: string;
}
