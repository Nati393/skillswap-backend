import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './skill.schema';

@Injectable()
export class SkillsService {
  constructor(@InjectModel(Skill.name) private skillModel: Model<SkillDocument>) {}

  async findAll(): Promise<Skill[]> {
    return this.skillModel.find().exec();
  }

  async findOne(id: string): Promise<Skill | null> {
    return this.skillModel.findById(id).exec();
  }

  async findByUser(userId: string): Promise<Skill[]> {
    return this.skillModel.find({ userId }).exec();
  }

  async create(data: Partial<Skill>): Promise<Skill> {
    const skill = new this.skillModel(data);
    return skill.save();
  }

  async update(id: string, data: Partial<Skill>): Promise<Skill | null> {
    return this.skillModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<Skill | null> {
    return this.skillModel.findByIdAndDelete(id).exec();
  }
}