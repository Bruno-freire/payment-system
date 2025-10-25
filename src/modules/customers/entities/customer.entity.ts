// entities/customer.entity.ts
import { Charge } from 'src/modules/charges/entities/charge.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';

@Entity('customers')
@Unique(['email', 'document'])
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  document: string;

  @Column()
  phone: string;

  @OneToMany(() => Charge, (charge) => charge.customer)
  charges: Charge[];
}