import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateProvinceDto } from './dto/create-province.dto'
import { DeleteProvinceDto } from './dto/delete-province.dto'
import { FindProvinceDto } from './dto/find-province.dto'
import { UpdateProvinceDto } from './dto/update-province.dto'

@Injectable()
export class ProvinceService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateProvinceDto) {
        const { name, code, userId } = dto
        return this.prisma.province.create({
            data: {
                name,
                code,
                userId,
            },
        })
    }

    async findAll(dto: FindProvinceDto) {
        const { skip, take, cursor, sort } = dto
        return this.prisma.province.findMany({
            skip,
            take,
            cursor: cursor
                ? {
                      id: cursor,
                  }
                : undefined,
            orderBy: {
                id: sort,
            },
            include: {
                _count: true,
            },
        })
    }

    async findOne(id: number) {
        return this.prisma.province.findUniqueOrThrow({
            where: { id },
            include: {
                _count: true,
                districts: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async update(id: number, dto: UpdateProvinceDto) {
        const { name, code, districtIds } = dto
        return this.prisma.province.update({
            where: { id },
            data: {
                name,
                code,
                districts:
                    districtIds && districtIds.length > 0
                        ? {
                              set: districtIds.map((id) => ({ id })),
                          }
                        : undefined,
            },
            include: {
                _count: true,
                districts: {
                    include: {
                        _count: true,
                    },
                },
            },
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
