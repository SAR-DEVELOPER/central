import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form3Response } from './form3.entity';
import { SubmitForm3Dto } from './dto/submit-form3.dto';

@Injectable()
export class Form3Service {
  private readonly logger = new Logger(Form3Service.name);

  constructor(
    @InjectRepository(Form3Response)
    private readonly form3Repository: Repository<Form3Response>,
  ) {}

  /**
   * Submit a new Form3 response
   */
  async submitForm(
    dto: SubmitForm3Dto,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<Form3Response> {
    try {
      const response = this.form3Repository.create({
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

      return await this.form3Repository.save(response);
    } catch (error) {
      this.logger.error('Failed to save form response', error);
      throw new InternalServerErrorException('Failed to save form response');
    }
  }

  /**
   * Get all form responses (for admin/research purposes)
   */
  async getAllResponses(): Promise<Form3Response[]> {
    return await this.form3Repository.find({
      order: { submittedAt: 'DESC' },
    });
  }

  /**
   * Get a single response by ID
   */
  async getResponseById(id: string): Promise<Form3Response | null> {
    return await this.form3Repository.findOne({ where: { id } });
  }

  /**
   * Get statistics (optional - for analytics)
   */
  async getStatistics(): Promise<any> {
    const total = await this.form3Repository.count();
    const byGender = await this.form3Repository
      .createQueryBuilder('response')
      .select('response.jenisKelamin', 'jenisKelamin')
      .addSelect('COUNT(*)', 'count')
      .groupBy('response.jenisKelamin')
      .getRawMany();

    const byAge = await this.form3Repository
      .createQueryBuilder('response')
      .select('response.umur', 'umur')
      .addSelect('COUNT(*)', 'count')
      .groupBy('response.umur')
      .getRawMany();

    const byEducation = await this.form3Repository
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

