import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form2Response } from './form2.entity';
import { SubmitForm2Dto } from './dto/submit-form2.dto';

@Injectable()
export class Form2Service {
    private readonly logger = new Logger(Form2Service.name);

    constructor(
        @InjectRepository(Form2Response)
        private readonly form2Repository: Repository<Form2Response>,
    ) { }

    /**
     * Submit a new Form2 response
     */
    async submitForm(
        dto: SubmitForm2Dto,
        ipAddress?: string,
        userAgent?: string,
    ): Promise<Form2Response> {
        try {
            const response = this.form2Repository.create({
                nama: dto.identity.nama,
                kap: dto.identity.kap,
                namaKlienKAP: dto.identity.namaKlienKAP,
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

            return await this.form2Repository.save(response);
        } catch (error) {
            this.logger.error('Failed to save form response', error);
            throw new InternalServerErrorException('Failed to save form response');
        }
    }

    /**
     * Get all form responses (for admin/research purposes)
     */
    async getAllResponses(): Promise<Form2Response[]> {
        return await this.form2Repository.find({
            order: { submittedAt: 'DESC' },
        });
    }

    /**
     * Get a single response by ID
     */
    async getResponseById(id: string): Promise<Form2Response | null> {
        return await this.form2Repository.findOne({ where: { id } });
    }

    /**
     * Get statistics (optional - for analytics)
     */
    async getStatistics(): Promise<any> {
        const total = await this.form2Repository.count();
        const byGender = await this.form2Repository
            .createQueryBuilder('response')
            .select('response.jenisKelamin', 'jenisKelamin')
            .addSelect('COUNT(*)', 'count')
            .groupBy('response.jenisKelamin')
            .getRawMany();

        const byAge = await this.form2Repository
            .createQueryBuilder('response')
            .select('response.umur', 'umur')
            .addSelect('COUNT(*)', 'count')
            .groupBy('response.umur')
            .getRawMany();

        const byEducation = await this.form2Repository
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

