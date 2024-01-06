import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { DeleteDistrictDto } from './dto/delete-district.dto';
import { FindDistrictDto } from './dto/find-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateDistrictDto) {
        const { name, code, provinceId, userId } = dto;
        return this.prisma.district.create({
            data: {
                name,
                code,
                province: {
                    connect: {
                        id: provinceId,
                    },
                },
                userId,
            },
            include: {
                province: {
                    include: {
                        _count: true,
                    },
                },
            },
        });
    }

    async findAll(dto: FindDistrictDto) {
        const { skip, take, cursor } = dto;
        return this.prisma.district.findMany({
            skip,
            take,
            cursor: cursor
                ? {
                      id: cursor,
                  }
                : undefined,
            include: {
                _count: true,
                province: {
                    include: {
                        _count: true,
                    },
                },
            },
        });
    }

    async findOne(id: number) {
        return this.prisma.district.findUniqueOrThrow({
            where: {
                id,
            },
            include: {
                _count: true,
                province: {
                    include: {
                        _count: true,
                    },
                },
                wards: true,
            },
        });
    }

    async update(id: number, dto: UpdateDistrictDto) {
        const { name, code, provinceId, wardIds } = dto;
        return this.prisma.district.update({
            where: {
                id,
            },
            data: {
                name,
                code,
                province: provinceId
                    ? {
                          connect: {
                              id: provinceId,
                          },
                      }
                    : undefined,
                wards:
                    wardIds && wardIds.length > 0
                        ? {
                              set: wardIds.map((id) => ({ id })),
                          }
                        : undefined,
            },
            include: {
                _count: true,
                province: {
                    include: {
                        _count: true,
                    },
                },
                wards: true,
            },
        });
    }

    async remove(id: number) {
        return this.prisma.district.delete({
            where: {
                id,
            },
            include: {
                _count: true,
                province: {
                    include: {
                        _count: true,
                    },
                },
                wards: true,
            },
        });
    }

    async removeBatch(dto: DeleteDistrictDto) {
        return this.prisma.district.deleteMany({
            where: {
                id: {
                    in: dto.ids,
                },
            },
        });
    }
}
