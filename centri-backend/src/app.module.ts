import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getDatabaseConfig } from './config/database.config';
import { Form1Module } from './api/module/form1/form1.module';

@Module({
  imports: [TypeOrmModule.forRoot(getDatabaseConfig()), Form1Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
