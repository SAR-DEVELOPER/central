import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('form3_responses')
export class Form3Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Respondent Identity
  @Column({ type: 'varchar', length: 255 })
  nama: string;

  @Column({ type: 'varchar', length: 255 })
  perusahaan: string;

  @Column({ type: 'varchar', length: 255 })
  jabatan: string;

  @Column({ type: 'varchar', length: 50 })
  jenisKelamin: string;

  @Column({ type: 'varchar', length: 50 })
  umur: string;

  @Column({ type: 'varchar', length: 50 })
  pendidikan: string;

  @Column({ type: 'boolean', default: false })
  consent: boolean;

  // Survey Answers - stored as JSONB for flexibility
  // Structure: { "A11": 1, "A12": 2, ... }
  @Column({ type: 'jsonb' })
  answers: Record<string, number>;

  // Raw Likert choices - for reference
  // Structure: { "A11": "SS", "A12": "S", ... }
  @Column({ type: 'jsonb' })
  answersRaw: Record<string, string>;

  // Open-ended responses
  @Column({ type: 'jsonb', nullable: true })
  openEnded: {
    comments?: string;
    suggestions?: string;
  };

  // Metadata
  @Column({ type: 'timestamp' })
  submittedAt: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Optional: IP address for tracking (privacy considerations apply)
  @Column({ type: 'varchar', length: 45, nullable: true })
  ipAddress?: string;

  // Optional: User agent
  @Column({ type: 'text', nullable: true })
  userAgent?: string;
}

