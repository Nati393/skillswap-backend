import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  async findByUser(userId: string): Promise<Post[]> {
    return this.postModel.find({ userId }).exec();
  }

  async create(data: Partial<Post>): Promise<Post> {
    const post = new this.postModel(data);
    return post.save();
  }

  async update(id: string, data: Partial<Post>): Promise<Post | null> {
    return this.postModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Post | null> {
    return this.postModel.findByIdAndDelete(id).exec();
  }

  async like(id: string): Promise<Post | null> {
    return this.postModel
      .findByIdAndUpdate(id, { $inc: { likesCount: 1 } }, { new: true })
      .exec();
  }
}