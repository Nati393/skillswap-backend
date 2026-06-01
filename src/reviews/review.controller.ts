import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ReviewsService } from './review.service';
import { Review } from './review.schema';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  findAll(): Promise<Review[]> {
    return this.reviewsService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<Review[]> {
    return this.reviewsService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Review | null> {
    return this.reviewsService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Review>): Promise<Review> {
    return this.reviewsService.create(data);
  }
}