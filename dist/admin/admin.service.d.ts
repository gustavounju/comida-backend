import { Repository } from 'typeorm';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
export declare class AdminService {
    private adminRepository;
    constructor(adminRepository: Repository<Admin>);
    findAll(): Promise<Admin[]>;
    findOne(id: number): Promise<Admin>;
    findByUsername(username: string): Promise<Admin>;
    create(createAdminDto: CreateAdminDto): Promise<Admin>;
    update(id: number, updateAdminDto: any): Promise<Admin>;
    delete(id: number): Promise<void>;
}
