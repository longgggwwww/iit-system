import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteUserDto } from './dto/delete-user.dto'
import { FindUserDto } from './dto/find-user.dto'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

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
        })
    }

    async findOne(id: number) {
        return this.prisma.user.findUniqueOrThrow({
            where: { id },
        })
    }

    async remove(id: number) {
        return this.prisma.user.delete({
            where: { id },
        })
    }

    async removeBatch(dto: DeleteUserDto) {
        return this.prisma.user.deleteMany({
            where: {
                id: { in: dto.ids },
            },
        })
    }
}
