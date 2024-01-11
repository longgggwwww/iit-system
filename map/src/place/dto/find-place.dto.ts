import { Prisma } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional } from 'class-validator'

export class FindPlaceDto {
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
