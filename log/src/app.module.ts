import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'
import { WardModule } from './ward/ward.module'
import { ProvinceModule } from './province/province.module';
import { DistrictModule } from './district/district.module';
import { PermGroupModule } from './perm-group/perm-group.module';

@Module({
    imports: [ConfigModule.forRoot(), WardModule, ProvinceModule, DistrictModule, PermGroupModule],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
