import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form3Controller } from './form3.controller';
import { Form3Service } from './form3.service';
import { Form3Response } from './form3.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Form3Response])],
  controllers: [Form3Controller],
  providers: [Form3Service],
  exports: [Form3Service],
})
export class Form3Module {}

