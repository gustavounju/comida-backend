import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
export declare class UsuarioController {
    private readonly usuarioService;
    constructor(usuarioService: UsuarioService);
    findAll(): Promise<Usuario[]>;
    findOne(id: number): Promise<Usuario>;
    findByEmail(email: string): Promise<Usuario>;
    create(usuario: Partial<Usuario>): Promise<Usuario>;
    update(id: number, usuario: Partial<Usuario>): Promise<Usuario>;
    delete(id: number): Promise<void>;
}
