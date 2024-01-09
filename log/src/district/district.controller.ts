import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Query,
} from '@nestjs/common'
import { DeleteWardDto } from 'src/ward/dto/delete-ward.dto'
import { DistrictService } from './district.service'
import { FindDistrictDto } from './dto/find-district.dto'

@Controller('district')
export class DistrictController {
    constructor(private district: DistrictService) {}

    @Get()
    findAll(@Query() dto: FindDistrictDto) {
        return this.district.findAll(dto)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.district.findOne(id)
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteWardDto) {
        return this.district.removeBatch(dto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.district.remove(id)
    }
}
