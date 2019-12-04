import { IsNotEmpty, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Currency } from './Currency';

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(
    type => Currency,
    currency => currency.countries,
    { nullable: false }
  )
  currency: Currency;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
