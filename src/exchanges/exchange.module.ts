import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangesController } from './exchange.controller';
import { ExchangesService } from './exchange.service';
import { Exchange, ExchangeSchema } from './exchange.schema';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Exchange.name, schema: ExchangeSchema }]),
    UsersModule,
  ],
  controllers: [ExchangesController],
  providers: [ExchangesService],
  exports: [ExchangesService],
})
export class ExchangesModule {}