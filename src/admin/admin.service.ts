import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findAll(): Promise<Admin[]> {
    return this.adminRepository.find();
  }

  async findOne(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new Error('Administrador no encontrado');
    }
    return admin;
  }

  async findByUsername(username: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { username } });
    if (!admin) {
      throw new Error('Administrador no encontrado');
    }
    return admin;
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin); // save devuelve una promesa de Admin o Admin[]
  }

  async update(id: number, updateAdminDto: any): Promise<Admin> {
    await this.adminRepository.update(id, updateAdminDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }
}