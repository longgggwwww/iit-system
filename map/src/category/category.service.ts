import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoryService {
    constructor(
        private prisma: PrismaService,
        @Inject('COMPANY_SERVICE') private client: ClientProxy,
    ) {}

    create(dto: CreateCategoryDto) {
        const { name, icon, color, groupId } = dto
        return this.prisma.category.create({
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
            },
            include: {
                group: true,
            },
        })
    }

    findAll() {
        console.log('call here')
        return this.client.send('company_findAll', {
            msg: 'hello world',
        })

        // return `This action returns all category`;
    }

    findOne(id: number) {
        return `This action returns a #${id} category`
    }

    update(id: number, updateCategoryDto: UpdateCategoryDto) {
        return `This action updates a #${id} category`
    }

    remove(id: number) {
        return `This action removes a #${id} category`
    }
}
