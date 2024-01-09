import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { PositionController } from './position.controller'
import { PositionService } from './position.service'

@Module({
    controllers: [PositionController],
    providers: [PositionService, PrismaService],
})
export class PositionModule {}
