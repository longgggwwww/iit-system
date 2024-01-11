import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDepartmentDto } from './dto/create-department.dto'
import { DeleteDepartmentDto } from './dto/delete-department.dto'
import { FindDepartmentDto } from './dto/find-department.dto'
import { UpdateDepartmentDto } from './dto/update-department.dto'

@Injectable()
export class DepartmentService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateDepartmentDto) {
        const { name, code, companyId, userId } = dto
        return this.prisma.department.create({
            data: {
                name,
                code,
                company: {
                    connect: {
                        id: companyId,
                    },
                },
                userId,
            },
            include: {
                company: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async findAll(dto: FindDepartmentDto) {
        const { skip, take, cursor, sort } = dto
        return this.prisma.department.findMany({
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
                company: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async findOne(id: number) {
        return this.prisma.department.findUniqueOrThrow({
            where: { id },
            include: {
                _count: true,
                company: {
                    include: {
                        _count: true,
                    },
                },
                positions: true,
            },
        })
    }

    async update(id: number, dto: UpdateDepartmentDto) {
        const { name, code, companyId, positionIds } = dto
        return this.prisma.department.update({
            where: { id },
            data: {
                name,
                code,
                company: companyId
                    ? {
                          connect: {
                              id: companyId,
                          },
                      }
                    : undefined,
                positions:
                    positionIds && positionIds.length > 0
                        ? {
                              set: positionIds.map((id) => ({ id })),
                          }
                        : undefined,
            },
            include: {
                _count: true,
                company: {
                    include: {
                        _count: true,
                    },
                },
                positions: true,
            },
        })
    }

    async remove(id: number) {
        return this.prisma.department.delete({
            where: { id },
        })
    }

    async removeBatch(dto: DeleteDepartmentDto) {
        return this.prisma.department.deleteMany({
            where: {
                id: { in: dto.ids },
            },
        })
    }
}
