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
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { DeleteDistrictDto } from './dto/delete-district.dto';
import { FindDistrictDto } from './dto/find-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Controller('districts')
export class DistrictController {
    constructor(private district: DistrictService) {}

    @Post()
    create(@Body() dto: CreateDistrictDto, @Request() req) {
        return this.district.create({
            ...dto,
            userId: req.user?.id,
        });
    }

    @Get()
    findAll(@Query() dto: FindDistrictDto) {
        return this.district.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.district.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateDistrictDto,
    ) {
        return this.district.update(id, dto);
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteDistrictDto) {
        return this.district.removeBatch(dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.district.remove(id);
    }
}
