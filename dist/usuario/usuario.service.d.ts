import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
export declare class UsuarioService {
    private usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario>;
    create(usuario: Partial<Usuario>): Promise<Usuario>;
    update(id: number, usuario: Partial<Usuario>): Promise<Usuario>;
    delete(id: number): Promise<void>;
}
