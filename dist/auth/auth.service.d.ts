import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
export declare class AuthService {
    private jwtService;
    private adminService;
    constructor(jwtService: JwtService, adminService: AdminService);
    login(username: string, password: string): Promise<{
        access_token: string;
    }>;
    validateUser(payload: any): Promise<any>;
}
