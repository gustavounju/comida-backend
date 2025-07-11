import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), ConfigModule],
  providers: [AdminService],
  controllers: [AdminController],
  exports: [AdminService], // Exportamos AdminService para que esté disponible
})
export class AdminModule {}
