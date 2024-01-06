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
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateWardDto } from './dto/create-ward.dto';
import { DeleteWardDto } from './dto/delete-ward.dto';
import { FindWardDto } from './dto/find-ward.dto';
import { UpdateWardDto } from './dto/update-ward.dto';
import { WardService } from './ward.service';

@Controller('wards')
export class WardController {
    constructor(private ward: WardService) {}

    @Post()
    create(@Body() dto: CreateWardDto, @Request() req) {
        return this.ward.create({
            ...dto,
            userId: req.user?.id,
        });
    }

    @Get()
    findAll(@Query() dto: FindWardDto) {
        return this.ward.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ward.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateWardDto) {
        return this.ward.update(id, dto);
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteWardDto) {
        return this.ward.removeBatch(dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.ward.remove(id);
    }

    // ----------- Microservice ---------------

    @MessagePattern({ prefix: 'ward', cmd: 'findOne' })
    async _findOne(@Payload() id: number) {
        try {
            return await this.ward.findOne(id);
        } catch {
            return null;
        }
    }
}
