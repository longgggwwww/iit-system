import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { DeleteGroupDto } from './dto/delete-group.dto';
import { FindGroupDto } from './dto/find-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
   constructor(private prisma: PrismaService) {}

    async create(dto: CreateGroupDto) {
        const {name, userId} = dto;
        return this.prisma.group.create({
            data: {
              name,
              userId
            },
            include: {
              user: true,
            }
        });
    }

    async findAll(dto: FindGroupDto) {
        const { skip, take, cursor } = dto;
        return this.prisma.group.findMany({
            skip,
            take,
            cursor: cursor
                ? {
                      id: cursor,
                  }
                : undefined,
            include: {
                _count: true,
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.group.findUniqueOrThrow({
            where: {
                id,
            },
            include: {
                _count: true,
                districts: {
                    include: {
                        _count: true,
                    },
                },
            },
        });
    }

    async update(id: number, dto: UpdateGroupDto) {
        const { name, code, districtIds } = dto;
        return this.prisma.group.update({
            where: {
                id,
            },
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
        });
    }

    async remove(id: number) {
        return this.prisma.group.delete({
            where: {
                id,
            },
            include: {
                _count: true,
                districts: {
                    include: {
                        _count: true,
                    },
                },
            },
        });
    }

    async removeBatch(dto: DeleteGroupDto) {
        return this.prisma.group.deleteMany({
            where: {
                id: {
                    in: dto.ids,
                },
            },
        });
    }
}
}
