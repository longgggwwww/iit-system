import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeletePermGroupDto } from './dto/delete-perm-group.dto'
import { FindPermGroupDto } from './dto/find-perm-group.dto'

@Injectable()
export class PermGroupService {
    constructor(private prisma: PrismaService) {}

    async findAll(dto: FindPermGroupDto) {
        const { skip, take, cursor } = dto
        return this.prisma.permissionGroup.findMany({
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
        return this.prisma.permissionGroup.findUniqueOrThrow({
            where: { id },
        })
    }

    async remove(id: number) {
        return this.prisma.permissionGroup.delete({
            where: { id },
        })
    }

    async removeBatch(dto: DeletePermGroupDto) {
        return this.prisma.permissionGroup.deleteMany({
            where: {
                id: { in: dto.ids },
            },
        })
    }
}
