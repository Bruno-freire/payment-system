import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateChargeDto } from './dto/create-charge.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Charge } from './entities/charge.entity';
import { PaymentMethod, PaymentStatus } from './enum/payment-enum';
import { UpdateChargeStatusDto } from './dto/update-charge.dto';

@Injectable()
export class ChargeService {
  constructor(
    @InjectRepository(Charge)
    private readonly chargeRepository: Repository<Charge>,

    @InjectRepository(Customer)
    private readonly customerRepo: Repository<Customer>,
  ) {}
  // Method to create a charge
  async create(charge: CreateChargeDto): Promise<Charge> {
    // Verifica se o cliente existe
    const customer = await this.customerRepo.findOne({
      where: { id: charge.customerId },
    });
    if (!customer) throw new NotFoundException('Cliente não encontrado');

    // Valida campos específicos por método de pagamento
    switch (charge.method) {
      case PaymentMethod.BOLETO:
        if (!charge.dueDate)
          throw new BadRequestException(
            'Data de vencimento é obrigatório para Boleto',
          );
        break;
      case PaymentMethod.CARD:
        if (!charge.installments)
          throw new BadRequestException(
            'Quantidade de parcelas é obrigatório para Cartão',
          );
        break;
      case PaymentMethod.PIX:
        break;
      default:
        throw new BadRequestException('Método de pagamento inválido');
    }

    // Cria a cobrança
    const chargeCreated = this.chargeRepository.create({
      amount: charge.amount,
      currency: charge.currency,
      method: charge.method,
      status: PaymentStatus.PENDING,
      customer,
      dueDate: charge.dueDate,
      installments: charge.installments,
    });

    await this.chargeRepository.save(charge);

    return chargeCreated;
  }

  async findAll(): Promise<Charge[]> {
    return this.chargeRepository.find({
      relations: ['customer'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Charge> {
    const charge = await this.chargeRepository.findOne({
      where: { id },
      relations: ['customer'],
    });

    if (!charge) throw new NotFoundException('Cobrança não encontrada');
    return charge;
  }

  async updateStatus(id: string, dto: UpdateChargeStatusDto) {
    const charge = await this.chargeRepository.findOne({ where: { id } });

    if (!charge) throw new NotFoundException('Cobrança não encontrada');

    if (charge.status === 'PAID')
      throw new BadRequestException(
        'Cobrança já está paga e não pode ser alterada',
      );

    charge.status = dto.status;
    await this.chargeRepository.save(charge);

    return charge;
  }
}
