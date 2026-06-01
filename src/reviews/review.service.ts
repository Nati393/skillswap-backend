import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './review.schema';
import { UsersService } from '../users/user.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async findOne(id: string): Promise<Review | null> {
    return this.reviewModel.findById(id).exec();
  }

  async findByUser(userId: string): Promise<Review[]> {
    return this.reviewModel.find({ reviewedId: userId }).exec();
  }

  async create(data: Partial<Review>): Promise<Review> {
    // Si viene reviewerId, busca el nombre del reviewer para guardarlo
    if (data.reviewerId) {
      const reviewer = await this.usersService.findOne(data.reviewerId.toString());
      if (reviewer) {
        data.reviewerName = reviewer.fullName;
      }
    }

    const review = new this.reviewModel(data);
    await review.save();

    if (data.reviewedId) {
      const allReviews = await this.reviewModel
        .find({ reviewedId: data.reviewedId })
        .exec();

      const average =
        allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

      await this.usersService.update(data.reviewedId.toString(), {
        averageRating: Math.round(average * 10) / 10,
      } as any);
    }

    return review;
  }
}