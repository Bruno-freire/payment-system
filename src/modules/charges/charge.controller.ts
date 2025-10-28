import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ChargeService } from './charge.service';
import { CreateChargeDto } from './dto/create-charge.dto';
import { Charge } from './entities/charge.entity';
import { UpdateChargeStatusDto } from './dto/update-charge.dto';

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

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateChargeStatusDto) {
    return this.chargeService.updateStatus(id, dto);
  }
}
