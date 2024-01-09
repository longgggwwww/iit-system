import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteWardDto } from './dto/delete-ward.dto'
import { FindWardDto } from './dto/find-ward.dto'

@Injectable()
export class WardService {
    constructor(private prisma: PrismaService) {}

    async findAll(dto: FindWardDto) {
        const { skip, take, cursor } = dto
        return this.prisma.ward.findMany({
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
        return this.prisma.ward.findUniqueOrThrow({
            where: { id },
        })
    }

    async remove(id: number) {
        return this.prisma.ward.delete({
            where: { id },
        })
    }

    async removeBatch(dto: DeleteWardDto) {
        return this.prisma.ward.deleteMany({
            where: {
                id: { in: dto.ids },
            },
        })
    }
}
