import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de usuarios exitosa', type: [Usuario] })
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un usuario por ID' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: Usuario })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findOne(@Param('id') id: number): Promise<Usuario> {
    return this.usuarioService.findOne(id);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Obtiene un usuario por email' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado', type: Usuario })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async findByEmail(@Param('email') email: string): Promise<Usuario> {
    return this.usuarioService.findByEmail(email);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado', type: Usuario })
  @ApiResponse({ status: 400, description: 'Email inválido o duplicado' })
  @ApiBody({ schema: { example: { email: 'nuevo@ejemplo.com' } } })
  async create(@Body() usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado', type: Usuario })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  @ApiResponse({ status: 400, description: 'Email duplicado' })
  @ApiBody({ schema: { example: { email: 'nuevo.cambio@ejemplo.com' } } })
  async update(@Param('id') id: number, @Body() usuario: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.update(id, usuario);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un usuario' })
  @ApiResponse({ status: 204, description: 'Usuario eliminado' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.usuarioService.delete(id);
  }
}