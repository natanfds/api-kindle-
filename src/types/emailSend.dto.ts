import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ValidateFileName } from '../decorators';

export class SendEmailDto {
  @ApiProperty({ description: 'Email address to send the file to' })
  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email address is required' })
  emailTo: string;

  @ApiProperty({ description: 'Name of the file to send to the email' })
  @IsString({ message: 'File name must be a string' })
  @IsNotEmpty({ message: 'File name is required' })
  @ValidateFileName({ message: 'Invalid file name' })
  fileName: string;

  @ApiProperty({ description: 'Base64 encoded file content' })
  @IsString({ message: 'File content must be a string' })
  @IsNotEmpty({ message: 'File content is required' })
  fileContent: string;
}
