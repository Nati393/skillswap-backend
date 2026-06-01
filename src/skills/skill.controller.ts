import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { SkillsService } from './skill.service';
import { Skill } from './skill.schema';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  findAll(): Promise<Skill[]> {
    return this.skillsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<Skill[]> {
    return this.skillsService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Skill | null> {
    return this.skillsService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Skill>): Promise<Skill> {
    return this.skillsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Skill>): Promise<Skill | null> {
    return this.skillsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Skill | null> {
    return this.skillsService.delete(id);
  }
}