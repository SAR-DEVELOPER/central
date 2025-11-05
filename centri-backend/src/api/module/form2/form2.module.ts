import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form2Controller } from './form2.controller';
import { Form2Service } from './form2.service';
import { Form2Response } from './form2.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Form2Response])],
    controllers: [Form2Controller],
    providers: [Form2Service],
    exports: [Form2Service],
})
export class Form2Module { }

