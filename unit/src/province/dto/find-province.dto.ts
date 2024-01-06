import { IsNumber, IsOptional } from 'class-validator';

export class FindProvinceDto {
    @IsNumber()
    @IsOptional()
    skip?: number;

    @IsNumber()
    @IsOptional()
    take?: number;

    @IsNumber()
    @IsOptional()
    cursor?: number;
}
