import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../guard/jwt/auth.guard';
import { Role, Roles } from '../../guard/permission/roles';
import { RolesGuard } from '../../guard/jwt/roles.guard';
import { ParseIdPipe } from 'src/pipe/validate-id';
import { IMyRequest } from 'src/interface/app';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  findAll(@Req() req: IMyRequest) {
    const params = {
      page: +req.page,
      limit: +req.limit,
      offset: +req.offset,
      sortBy: req.sortBy,
      orderBy: req.orderBy,
      search: req.search,
      skip : req.skip
    };
    return this.userService.findAllByPage(params);
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
