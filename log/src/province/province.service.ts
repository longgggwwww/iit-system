import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteProvinceDto } from './dto/delete-province.dto'
import { FindProvinceDto } from './dto/find-province.dto'

@Injectable()
export class ProvinceService {
    constructor(private prisma: PrismaService) {}

    async findAll(dto: FindProvinceDto) {
        const { skip, take, cursor } = dto
        return this.prisma.province.findMany({
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
        return this.prisma.province.findUniqueOrThrow({
            where: { id },
        })
    }

    async remove(id: number) {
        return this.prisma.province.delete({
            where: { id },
        })
    }

    async removeBatch(dto: DeleteProvinceDto) {
        return this.prisma.province.deleteMany({
            where: {
                id: { in: dto.ids },
            },
        })
    }
}
