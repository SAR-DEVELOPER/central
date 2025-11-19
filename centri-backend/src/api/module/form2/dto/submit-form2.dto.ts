import { IsString, IsNotEmpty, IsBoolean, IsObject, IsDateString, IsOptional, ValidateNested, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

class IdentityDto {
    @IsString()
    @IsNotEmpty()
    nama: string;

    @IsString()
    @IsNotEmpty()
    kap: string;

    @IsString()
    @IsNotEmpty()
    namaKlienKAP: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Laki-laki', 'Perempuan'])
    jenisKelamin: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['< 35 tahun', '35 – 45 tahun', '> 45 tahun'])
    umur: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['S1', 'S2', 'S3'])
    pendidikan: string;

    @IsBoolean()
    @IsOptional()
    consent?: boolean;
}

class OpenEndedDto {
    @IsString()
    @IsOptional()
    comments?: string;

    @IsString()
    @IsOptional()
    suggestions?: string;
}

export class SubmitForm2Dto {
    @ValidateNested()
    @Type(() => IdentityDto)
    identity: IdentityDto;

    @IsObject()
    @IsNotEmpty()
    answers: Record<string, number>;

    @IsObject()
    @IsOptional()
    answersRaw?: Record<string, string>;

    @ValidateNested()
    @Type(() => OpenEndedDto)
    @IsOptional()
    openEnded?: OpenEndedDto;

    @IsDateString()
    @IsNotEmpty()
    submittedAt: string;
}

