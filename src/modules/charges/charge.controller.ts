import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { Charge } from './entities/charge.entity';

@Controller('charges')
export class ChargeController {
  constructor(private readonly chargeService: ChargeService) {}

  @Post()
  async create(@Body() createChargeDto: CreateChargeDto): Promise<Charge> {
    return this.chargeService.create(createChargeDto);
  }

  @Get()
  async findAll(): Promise<Charge[]> {
    return this.chargeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Charge> {
    return this.chargeService.findOne(id);
  }
}
