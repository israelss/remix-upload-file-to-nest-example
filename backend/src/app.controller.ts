import { AppService } from './app.service';
import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file'))
  upload(@Body() body: any, @UploadedFile(new ParseFilePipe({fileIsRequired: true, validators: [
    new FileTypeValidator({fileType: 'application/pdf'}),
  ]})) file: Express.Multer.File) {
    console.log(file)
    console.log(body)
    return {
      message: 'success',
      data: {
        fileName: file.originalname
      }
    }
  }
}
