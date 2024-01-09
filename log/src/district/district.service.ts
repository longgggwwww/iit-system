import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteDistrictDto } from './dto/delete-district.dto'
import { FindDistrictDto } from './dto/find-district.dto'

@Injectable()
export class DistrictService {
    constructor(private prisma: PrismaService) {}

    async findAll(dto: FindDistrictDto) {
        const { skip, take, cursor } = dto
        return this.prisma.district.findMany({
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
        return this.prisma.district.findUniqueOrThrow({
            where: { id },
        })
    }

    async remove(id: number) {
        return this.prisma.district.delete({
            where: { id },
        })
    }

    async removeBatch(dto: DeleteDistrictDto) {
        return this.prisma.district.deleteMany({
            where: {
                id: { in: dto.ids },
            },
        })
    }
}
