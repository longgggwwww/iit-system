import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreatePermissionDto } from './dto/create-permission.dto'
import { DeletePermissionDto } from './dto/delete-permission.dto'
import { FindPermissionDto } from './dto/find-permission.dto'
import { UpdatePermissionDto } from './dto/update-permission.dto'

@Injectable()
export class PermissionService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreatePermissionDto) {
        const { name, code, groupId, userId } = dto
        return this.prisma.permission.create({
            data: {
                name,
                code,
                group: {
                    connect: {
                        id: groupId,
                    },
                },
                user: userId
                    ? {
                          connect: {
                              id: userId,
                          },
                      }
                    : undefined,
            },
            include: {
                group: {
                    include: {
                        _count: true,
                    },
                },
                user: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async findAll(dto: FindPermissionDto) {
        const { skip, take, cursor } = dto
        return this.prisma.permission.findMany({
            skip,
            take,
            cursor: cursor
                ? {
                      id: cursor,
                  }
                : undefined,
            include: {
                _count: true,
                group: {
                    include: {
                        _count: true,
                    },
                },
                user: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async findOne(id: number) {
        return this.prisma.permission.findUniqueOrThrow({
            where: { id },
            include: {
                _count: true,
                group: {
                    include: {
                        _count: true,
                    },
                },
                roles: {
                    include: {
                        _count: true,
                    },
                },
                user: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async update(id: number, dto: UpdatePermissionDto) {
        const { name, code, groupId, roleIds } = dto
        return this.prisma.permission.update({
            where: { id },
            data: {
                name,
                code,
                group: groupId
                    ? {
                          connect: {
                              id: groupId,
                          },
                      }
                    : undefined,
                roles:
                    roleIds && roleIds.length > 0
                        ? {
                              set: roleIds.map((id) => ({ id })),
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
                roles: {
                    include: {
                        _count: true,
                    },
                },
                user: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async remove(id: number) {
        return this.prisma.permission.delete({
            where: { id },
            include: {
                _count: true,
                group: {
                    include: {
                        _count: true,
                    },
                },
                roles: {
                    include: {
                        _count: true,
                    },
                },
                user: {
                    include: {
                        _count: true,
                    },
                },
            },
        })
    }

    async removeBatch(dto: DeletePermissionDto) {
        return this.prisma.permission.deleteMany({
            where: {
                id: { in: dto.ids },
            },
        })
    }
}
