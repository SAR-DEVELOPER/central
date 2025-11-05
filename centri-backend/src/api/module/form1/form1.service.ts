import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form1Response } from './form1.entity';
import { SubmitForm1Dto } from './dto/submit-form1.dto';

@Injectable()
export class Form1Service {
  constructor(
    @InjectRepository(Form1Response)
    private readonly form1Repository: Repository<Form1Response>,
  ) {}

  /**
   * Submit a new Form1 response
   */
  async submitForm(
    dto: SubmitForm1Dto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<Form1Response> {
    try {
      const response = this.form1Repository.create({
        nama: dto.identity.nama,
        perusahaan: dto.identity.perusahaan,
        jabatan: dto.identity.jabatan,
        jenisKelamin: dto.identity.jenisKelamin,
        umur: dto.identity.umur,
        pendidikan: dto.identity.pendidikan,
        consent: dto.identity.consent || false,
        answers: dto.answers,
        answersRaw: dto.answersRaw || {},
        openEnded: dto.openEnded || {},
        submittedAt: new Date(dto.submittedAt),
        ipAddress,
        userAgent,
      });

      return await this.form1Repository.save(response);
    } catch {
      throw new InternalServerErrorException('Failed to save form response');
    }
  }

  /**
   * Get all form responses (for admin/research purposes)
   */
  async getAllResponses(): Promise<Form1Response[]> {
    return await this.form1Repository.find({
      order: { submittedAt: 'DESC' },
    });
  }

  /**
   * Get a single response by ID
   */
  async getResponseById(id: string): Promise<Form1Response | null> {
    return await this.form1Repository.findOne({ where: { id } });
  }

  /**
   * Get statistics (optional - for analytics)
   */
  async getStatistics(): Promise<any> {
    const total = await this.form1Repository.count();
    const byGender = await this.form1Repository
      .createQueryBuilder('response')
      .select('response.jenisKelamin', 'jenisKelamin')
      .addSelect('COUNT(*)', 'count')
      .groupBy('response.jenisKelamin')
      .getRawMany();

    const byAge = await this.form1Repository
      .createQueryBuilder('response')
      .select('response.umur', 'umur')
      .addSelect('COUNT(*)', 'count')
      .groupBy('response.umur')
      .getRawMany();

    const byEducation = await this.form1Repository
      .createQueryBuilder('response')
      .select('response.pendidikan', 'pendidikan')
      .addSelect('COUNT(*)', 'count')
      .groupBy('response.pendidikan')
      .getRawMany();

    return {
      total,
      byGender,
      byAge,
      byEducation,
    };
  }
}
