import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import type { Request } from 'express';
import { Form1Service } from './form1.service';
import { SubmitForm1Dto } from './dto/submit-form1.dto';

@Controller('api/form1')
export class Form1Controller {
  constructor(private readonly form1Service: Form1Service) {}

  @Post('submit')
  @HttpCode(HttpStatus.CREATED)
  async submitForm(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    dto: SubmitForm1Dto,
    @Req() req: Request,
  ) {
    const ipAddress = (req.ip || req.socket.remoteAddress) as string;
    const userAgent = req.get('user-agent');

    const response = await this.form1Service.submitForm(
      dto,
      ipAddress,
      userAgent,
    );

    return {
      success: true,
      message: 'Form submitted successfully',
      data: {
        id: response.id,
        submittedAt: response.submittedAt,
      },
    };
  }

  @Get('responses')
  async getAllResponses() {
    const responses = await this.form1Service.getAllResponses();
    return {
      success: true,
      count: responses.length,
      data: responses,
    };
  }

  @Get('responses/:id')
  async getResponseById(@Param('id') id: string) {
    const response = await this.form1Service.getResponseById(id);
    if (!response) {
      return {
        success: false,
        message: 'Response not found',
      };
    }
    return {
      success: true,
      data: response,
    };
  }

  @Get('statistics')
  async getStatistics(): Promise<{
    success: boolean;
    data: {
      total: number;
      byGender: any[];
      byAge: any[];
      byEducation: any[];
    };
  }> {
    const stats = await this.form1Service.getStatistics();
    return {
      success: true,
      data: stats,
    };
  }
}
