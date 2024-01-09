import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class UpsertDto {
    @IsNumber()
    @IsNotEmpty()
    roleId?: number

    @IsString()
    @IsNotEmpty()
    thumbnail?: string
}
