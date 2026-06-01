import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<Omit<User, 'password'>[]> {
    return this.userModel.find().select('-password').exec();
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findById(id).select('-password').exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    // Este SÍ devuelve la contraseña — solo para uso interno del login
    return this.userModel.findOne({ email }).exec();
  }

  async create(data: Partial<User>): Promise<Omit<User, 'password'>> {
    // Verificar si el email ya existe
    const existing = await this.userModel.findOne({ email: data.email });
    if (existing) {
      throw new Error('EMAIL_TAKEN');
    }

    // Hashear la contraseña antes de guardar
    const hashed = await bcrypt.hash(data.password!, 10);
    const user = new this.userModel({ ...data, password: hashed });
    const saved = await user.save();

    // Devolver sin la contraseña
    const { password, ...rest } = saved.toObject();
    return rest;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    // Si viene una contraseña nueva, hashearla también
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .select('-password')
      .exec();
  }

  async delete(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findBySkill(skillId: string): Promise<User[]> {
    return this.userModel.find({ skills: skillId }).select('-password').exec();
  }

  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.findByEmail(email);
    if (!user) return null;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return null;

    // Devolver sin contraseña
    const { password: _, ...rest } = (user as any).toObject();
    return rest;
  }

  async follow(userId: string, targetId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { following: targetId }
    });
    await this.userModel.findByIdAndUpdate(targetId, {
      $addToSet: { followers: userId }
    });
  }

  async unfollow(userId: string, targetId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { following: targetId }
    });
    await this.userModel.findByIdAndUpdate(targetId, {
      $pull: { followers: userId }
    });
  }
}