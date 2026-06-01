import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<Omit<User, 'password'>[]> {
    return this.usersService.findAll();
  }

  @Get('skill/:skillId')
  findBySkill(@Param('skillId') skillId: string): Promise<User[]> {
    return this.usersService.findBySkill(skillId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<User>): Promise<Omit<User, 'password'>> {
    return this.usersService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<User>): Promise<User | null> {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<User | null> {
    return this.usersService.delete(id);
  }

  @Put(':id/follow')
  follow(
    @Param('id') targetId: string,
    @Body('userId') userId: string,
  ): Promise<void> {
    return this.usersService.follow(userId, targetId);
  }

  @Put(':id/unfollow')
  unfollow(
    @Param('id') targetId: string,
    @Body('userId') userId: string,
  ): Promise<void> {
    return this.usersService.unfollow(userId, targetId);
  }
}