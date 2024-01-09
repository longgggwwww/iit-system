import { IsNumber, IsOptional } from 'class-validator'

export class FindPermGroupDto {
    @IsNumber()
    @IsOptional()
    skip?: number

    @IsNumber()
    @IsOptional()
    take?: number

    @IsNumber()
    @IsOptional()
    cursor?: number
}
