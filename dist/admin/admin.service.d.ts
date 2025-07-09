import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: Repository<Admin>);
    findAll(): Promise<Admin[]>;
    findOne(id: number): Promise<Admin>;
    create(createAdminDto: CreateAdminDto): Promise<Admin>;
    update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin>;
    delete(id: number): Promise<void>;
    findByUsername(username: string): Promise<Admin>;
}
