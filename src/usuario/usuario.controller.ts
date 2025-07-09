import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<Usuario> {
    return this.usuarioService.findByEmail(email);
  }

  @Post()
  async create(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() usuario: Partial<Usuario>,
  ): Promise<Usuario> {
    return this.usuarioService.update(id, usuario);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usuarioService.delete(id);
  }
}
