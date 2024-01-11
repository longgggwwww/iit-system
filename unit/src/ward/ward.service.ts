import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateWardDto } from './dto/create-ward.dto'
import { DeleteWardDto } from './dto/delete-ward.dto'
import { FindWardDto } from './dto/find-ward.dto'
import { UpdateWardDto } from './dto/update-ward.dto'

@Injectable()
export class WardService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateWardDto) {
        const { name, code, districtId, userId } = dto
        return this.prisma.ward.create({
            data: {
                name,
                code,
                district: {
                    connect: {
                        id: districtId,
                    },
                },
                userId,
            },
            include: {
                district: {
                    include: {
                        _count: true,
                        province: true,
                    },
                },
            },
        })
    }

    async findAll(dto: FindWardDto) {
        const { skip, take, cursor, sort } = dto
        return this.prisma.ward.findMany({
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
                district: {
                    include: {
                        _count: true,
                        province: true,
                    },
                },
            },
        })
    }

    async findOne(id: number) {
        return this.prisma.ward.findUniqueOrThrow({
            where: { id },
            include: {
                district: {
                    include: {
                        _count: true,
                        province: true,
                    },
                },
            },
        })
    }

    async update(id: number, dto: UpdateWardDto) {
        const { name, code, districtId } = dto
        return this.prisma.ward.update({
            where: { id },
            data: {
                name,
                code,
                district: districtId
                    ? {
                          connect: {
                              id: districtId,
                          },
                      }
                    : undefined,
            },
            include: {
                district: {
                    include: {
                        _count: true,
                        province: true,
                    },
                },
            },
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
