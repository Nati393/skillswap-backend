import { Controller, Get, Post, Put, Param, Body } from '@nestjs/common';
import { ExchangesService } from './exchange.service';
import { Exchange } from './exchange.schema';

@Controller('exchanges')
export class ExchangesController {
  constructor(private readonly exchangesService: ExchangesService) {}

  @Get()
  findAll(): Promise<Exchange[]> {
    return this.exchangesService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<Exchange[]> {
    return this.exchangesService.findByUser(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Exchange | null> {
    return this.exchangesService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<Exchange>): Promise<Exchange> {
    return this.exchangesService.create(data);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Exchange | null> {
    return this.exchangesService.updateStatus(id, status);
  }
}