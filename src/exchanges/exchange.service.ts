import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exchange, ExchangeDocument } from './exchange.schema';
import { UsersService } from '../users/user.service';

@Injectable()
export class ExchangesService {
  constructor(
    @InjectModel(Exchange.name) private exchangeModel: Model<ExchangeDocument>,
    private usersService: UsersService,
  ) {}

  async findAll(): Promise<Exchange[]> {
    return this.exchangeModel.find().exec();
  }

  async findOne(id: string): Promise<Exchange | null> {
    return this.exchangeModel.findById(id).exec();
  }

  async findByUser(userId: string): Promise<Exchange[]> {
    return this.exchangeModel.find({
      $or: [{ requesterId: userId }, { receiverId: userId }],
    }).exec();
  }

  async create(data: Partial<Exchange>): Promise<Exchange> {
    const exchange = new this.exchangeModel(data);
    return exchange.save();
  }

  async updateStatus(id: string, status: string): Promise<Exchange | null> {
    const exchange = await this.exchangeModel.findById(id).exec();
    if (!exchange) return null;

    if (status === 'completed') {
      const requester = await this.usersService.findOne(
        exchange.requesterId.toString(),
      );

      if (!requester || requester.timeBalance < exchange.hours) {
        throw new BadRequestException(
          'El usuario no tiene suficientes horas en su banco de tiempo',
        );
      }

      await this.usersService.update(exchange.requesterId.toString(), {
        $inc: { timeBalance: -exchange.hours },
      } as any);

      await this.usersService.update(exchange.receiverId.toString(), {
        $inc: { timeBalance: exchange.hours },
      } as any);
    }

    exchange.status = status;
    await exchange.save();
    return exchange;
  }
}