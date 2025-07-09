import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { Admin } from './admin.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('admins')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos los administradores' })
  @ApiResponse({ status: 200, description: 'Lista de administradores exitosa', type: [Admin] })
  async findAll(): Promise<Admin[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtiene un administrador por ID' })
  @ApiResponse({ status: 200, description: 'Administrador encontrado', type: Admin })
  @ApiResponse({ status: 404, description: 'Administrador no encontrado' })
  async findOne(@Param('id') id: number): Promise<Admin> {
    return this.adminService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crea un nuevo administrador' })
  @ApiResponse({ status: 201, description: 'Administrador creado', type: Admin })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiBody({ schema: { example: { username: 'admin2', password: 'Admin456!' } } })
  async create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminService.create(createAdminDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualiza un administrador' })
  @ApiResponse({ status: 200, description: 'Administrador actualizado', type: Admin })
  @ApiResponse({ status: 404, description: 'Administrador no encontrado' })
  @ApiBody({ schema: { example: { username: 'admin2_updated', password: 'NewAdmin456!' } } })
  async update(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return this.adminService.update(id, updateAdminDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Elimina un administrador' })
  @ApiResponse({ status: 204, description: 'Administrador eliminado' })
  @ApiResponse({ status: 404, description: 'Administrador no encontrado' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.adminService.delete(id);
  }
}