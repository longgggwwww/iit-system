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
import { CreatePositionDto } from './dto/create-position.dto';
import { DeletePositionDto } from './dto/delete-position.dto';
import { FindPositionDto } from './dto/find-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionService } from './position.service';

@Controller('positions')
export class PositionController {
    constructor(private position: PositionService) {}

    @Post()
    create(@Body() dto: CreatePositionDto, @Request() req) {
        return this.position.create({
            ...dto,
            userId: req.user?.id,
        });
    }

    @Get()
    findAll(@Query() dto: FindPositionDto) {
        return this.position.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.position.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdatePositionDto,
    ) {
        return this.position.update(id, dto);
    }

    @Delete('batch')
    removeMany(@Body() dto: DeletePositionDto) {
        return this.position.removeBatch(dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.position.remove(id);
    }
}
