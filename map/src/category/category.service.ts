import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { DeleteCategoryDto } from './dto/delete-category.dto'
import { FindCategoryDto } from './dto/find-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateCategoryDto) {
        const { name, icon, color, groupId, userId } = dto
        return this.prisma.category.create({
            data: {
                name,
                icon,
                color,
                group: {
                    connect: {
                        id: groupId,
                    },
                },
            },
            include: {
                group: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async findAll(dto: FindCategoryDto) {
        const { skip, take, cursor, sort } = dto
        return this.prisma.category.findMany({
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
                group: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async findOne(id: number) {
        return this.prisma.category.findUniqueOrThrow({
            where: { id },
            include: {
                _count: true,
                group: {
                    include: {
                        _count: true,
                    },
                },
                places: true,
            },
        })
    }

    async update(id: number, dto: UpdateCategoryDto) {
        const { name, icon, color, groupId, placeIds } = dto
        return this.prisma.category.update({
            where: { id },
            data: {
                name,
                icon,
                color,
                group: groupId
                    ? {
                          connect: {
                              id: groupId,
                          },
                      }
                    : undefined,
                places:
                    placeIds && placeIds.length > 0
                        ? {
                              set: placeIds.map((id) => ({ id })),
                          }
                        : undefined,
            },
            include: {
                _count: true,
                group: {
                    include: {
                        _count: true,
                    },
                },
                places: true,
            },
        })
    }

    async remove(id: number) {
        return this.prisma.category.delete({
            where: { id },
        })
    }

    async removeBatch(dto: DeleteCategoryDto) {
        return this.prisma.category.deleteMany({
            where: {
                id: { in: dto.ids },
            },
        })
    }
}
