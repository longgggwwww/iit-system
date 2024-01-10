import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'
import { FindUserDto } from './dto/find-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateUserDto) {
        const { username, password, userId } = dto
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        return this.prisma.user.create({
            data: {
                username,
                password: hash,
                profile: {
                    create: {},
                },
                role: {
                    connect: {
                        id: 1,
                    },
                },
            },
        })
    }

    async findAll(dto: FindUserDto) {
        const { skip, take, cursor } = dto
        return this.prisma.user.findMany({
            skip,
            take,
            cursor: cursor
                ? {
                      id: cursor,
                  }
                : undefined,
            include: {},
        })
    }

    async findOne(id: number) {
        return this.prisma.user.findUniqueOrThrow({
            where: {
                id,
            },
            include: {},
        })
    }

    async update(id: number, dto: UpdateUserDto) {
        const { username, password } = dto
        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                username,
            },
            include: {},
        })
    }

    async remove(id: number) {
        return this.prisma.user.delete({
            where: {
                id,
            },
        })
    }

    async removeBatch(dto: DeleteUserDto) {
        return this.prisma.user.deleteMany({
            where: {
                id: {
                    in: dto.ids,
                },
            },
        })
    }
}
