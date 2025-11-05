import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form1Controller } from './form1.controller';
import { Form1Service } from './form1.service';
import { Form1Response } from './form1.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form1Response])],
  controllers: [Form1Controller],
  providers: [Form1Service],
  exports: [Form1Service],
})
export class Form1Module {}
