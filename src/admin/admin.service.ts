import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

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
    return this.adminRepository.findOneByOrFail({ id });
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createAdminDto.password, salt);
    const newAdmin = this.adminRepository.create({ ...createAdminDto, password: hashedPassword });
    return this.adminRepository.save(newAdmin);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const existingAdmin = await this.findOne(id);
    if (updateAdminDto.password) {
      const salt = await bcrypt.genSalt(10);
      updateAdminDto.password = await bcrypt.hash(updateAdminDto.password, salt);
    }
    Object.assign(existingAdmin, updateAdminDto);
    return this.adminRepository.save(existingAdmin);
  }

  async delete(id: number): Promise<void> {
    await this.adminRepository.delete(id);
  }

  async findByUsername(username: string): Promise<Admin> {
    return this.adminRepository.findOneByOrFail({ username });
  }
}