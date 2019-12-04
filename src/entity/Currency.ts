import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from './Country';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @IsNotEmpty()
  currencyName: string;

  @Column({ length: 10 })
  @IsNotEmpty()
  currencySymbol: string;

  @Column({ type: 'float' })
  @IsNotEmpty()
  currencyDolarValue: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(
    type => Country,
    country => country.currencies,
    { nullable: false }
  )
  country: Country;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
