import { IsAlpha, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
    @IsAlpha()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string

    userId?: number
}
