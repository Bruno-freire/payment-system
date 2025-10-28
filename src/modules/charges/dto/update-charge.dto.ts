import { IsEnum } from 'class-validator';
import { PaymentStatus } from '../enum/payment-enum';

export class UpdateChargeStatusDto {
   @IsEnum(PaymentStatus, {
    message: 'Status inválido. Use um dos valores: PAID, FAILED ou EXPIRED.',
  })
  status: PaymentStatus;
}