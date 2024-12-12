import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) { }
  async create(createRoleDto: CreateRoleDto) {
    return await this.prisma.role.create({ data: createRoleDto })
  }

  async findAll() {
    return await this.prisma.role.findMany()
  }

  async findOne(id: number) {
    const result = await this.prisma.role.findUnique({
      where: { id },
    })
    if (!result) throw new NotFoundException('not found');
    return result
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
