import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProvinceModule } from './province/province.module';
import { DistrictModule } from './district/district.module';
import { WardModule } from './ward/ward.module';

@Module({
    imports: [ConfigModule.forRoot(), ProvinceModule, DistrictModule, WardModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
