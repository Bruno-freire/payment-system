import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { CustomerModule } from './modules/customers/customer.module';
import { ChargeModule } from './modules/charges/charge.module';

@Module({
  imports: [CoreModule, CustomerModule, ChargeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
