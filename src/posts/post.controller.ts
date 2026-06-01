import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './post.service';
import { Post as PostEntity } from './post.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<PostEntity[]> {
    return this.postsService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PostEntity | null> {
    return this.postsService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<PostEntity>): Promise<PostEntity> {
    return this.postsService.create(data);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() data: Partial<PostEntity>,
  ): Promise<PostEntity | null> {
    return this.postsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<PostEntity | null> {
    return this.postsService.delete(id);
  }

  @Put(':id/like')
  like(@Param('id') id: string): Promise<PostEntity | null> {
    return this.postsService.like(id);
  }
}