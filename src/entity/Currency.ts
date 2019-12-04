import { IsNotEmpty, Min, MaxLength } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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
  @MaxLength(255)
  currencyName: string;

  @Column({ length: 10 })
  @IsNotEmpty()
  @MaxLength(10)
  currencySymbol: string;

  @Column({ type: 'float' })
  @IsNotEmpty()
  @Min(0)
  currencyDolarValue: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(
    type => Country,
    country => country.currency
  )
  countries: Country[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
