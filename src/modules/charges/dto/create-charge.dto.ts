import { 
  IsEnum, IsNumber, IsOptional, IsString, IsUUID, ValidateIf 
} from 'class-validator';
import { PaymentMethod } from '../enum/payment-enum';

export class CreateChargeDto {
  @IsUUID()
  customerId: string;

  @IsNumber()
  amount: number;

  @IsString()
  currency: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ValidateIf(o => o.method === PaymentMethod.BOLETO)
  @IsString()
  dueDate?: Date; // obrigatório apenas para boleto

  @ValidateIf(o => o.method === PaymentMethod.CARD)
  @IsNumber()
  installments?: number; // obrigatório apenas para cartão
}
