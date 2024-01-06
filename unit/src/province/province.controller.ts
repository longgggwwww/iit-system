import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Request,
} from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { DeleteProvinceDto } from './dto/delete-province.dto';
import { FindProvinceDto } from './dto/find-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ProvinceService } from './province.service';

@Controller('provinces')
export class ProvinceController {
    constructor(private province: ProvinceService) {}

    @Post()
    create(@Body() dto: CreateProvinceDto, @Request() req) {
        return this.province.create({
            ...dto,
            userId: req.user?.id,
        });
    }

    @Get()
    findAll(@Query() dto: FindProvinceDto) {
        return this.province.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.province.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateProvinceDto,
    ) {
        return this.province.update(id, dto);
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteProvinceDto) {
        return this.province.removeBatch(dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.province.remove(id);
    }
}
