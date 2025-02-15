import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 5 })
  agency: string;

  @Column({ length: 10, unique: true })
  account_number: string;

  @Column({ length: 50 })
  type: string;

  @Column({ length: 200 })
  holder_name: string;

  @Column({ length: 200 })
  holder_email: string;

  @Column({ length: 20 })
  holder_document: string;

  @Column({ length: 20 })
  holder_type: string;

  @Column({ length: 20, default: 'ACTIVE' })
  status: string;

  @Column({ type: 'numeric', precision: 18, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}