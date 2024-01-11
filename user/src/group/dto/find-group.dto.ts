import { Prisma } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

export class FindGroupDto {
    @IsNumber()
    @IsOptional()
    skip?: number

    @IsNumber()
    @IsOptional()
    take?: number

    @IsNumber()
    @IsOptional()
    cursor?: number

    @IsEnum(Prisma.SortOrder)
    @IsOptional()
    sort?: Prisma.SortOrder
}
