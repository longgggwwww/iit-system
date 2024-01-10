import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { DeleteRoleDto } from './dto/delete-role.dto'
import { FindRoleDto } from './dto/find-role.dto'

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) {}

    async findAll(dto: FindRoleDto) {
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

    async removeBatch(dto: DeleteRoleDto) {
        return this.prisma.permissionGroup.deleteMany({
            where: {
                id: { in: dto.ids },
            },
        })
    }
}
