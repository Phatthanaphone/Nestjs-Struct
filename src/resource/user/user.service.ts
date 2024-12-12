import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const saltRounds = 10;
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { email, name, roleId, updatedAt } = createUserDto;

    // Perform email and role checks in a transaction to optimize database queries
    const [existingUser, existingRole] = await this.prisma.$transaction([
      this.prisma.user.findFirst({ where: { email } }),
      this.prisma.role.findUnique({ where: { id: roleId } }),
    ]);

    if (existingUser) {
      throw new BadRequestException('This email already exists');
    }

    if (!existingRole) {
      throw new NotFoundException('Role not found');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);
    // Create user if checks pass
    return this.prisma.user.create({
      data: {
        password: hashedPassword,
        email,
        name,
        role: {
          connect: { id: roleId },
        },
        updatedAt,
      },
    });

  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const result = await this.prisma.user.findUnique({ where: { id } })
    if (!result) throw new NotFoundException("Not found")
    return result
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
