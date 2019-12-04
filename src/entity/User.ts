import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  @IsNotEmpty()
  name: string;

  @Column({ unique: true, length: 255 })
  @IsEmail()
  email: string;

  @Exclude()
  @Column({ length: 255 })
  @Length(6, 255)
  password: string;

  @Column({ default: 'en-US', length: 5, type: 'char' })
  lang: string;

  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  typeUser: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 9);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
