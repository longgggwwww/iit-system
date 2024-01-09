import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { UpsertDto } from './dto/upsert.dto'
import { PrismaService } from './prisma/prisma.service'

@Injectable()
export class AppService {
    constructor(
        private prisma: PrismaService,
        @Inject('USER_SERVICE') private unit: ClientProxy,
    ) {}

    ping() {
        return 'Gretting from CONFIG SERVICE'
    }

    async upsert(dto: UpsertDto) {
        const config = await this.prisma.config.upsert({
            where: {
                id: 1,
            },
            create: dto,
            update: dto,
        })

        if (config.roleId) {
            let role
            return {
                ...config,
                role,
            }
        }
        return config
    }
}
