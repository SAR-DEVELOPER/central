import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import { Form1Module } from './api/module/form1/form1.module';
import { Form2Module } from './api/module/form2/form2.module';
import { Form3Module } from './api/module/form3/form3.module';

@Module({
  imports: [TypeOrmModule.forRoot(getDatabaseConfig()), Form1Module, Form2Module, Form3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
