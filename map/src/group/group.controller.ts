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
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { DeleteGroupDto } from './dto/delete-group.dto';
import { FindGroupDto } from './dto/find-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
    constructor(private group: GroupService) {}

    @Post()
    create(@Body() dto: CreateGroupDto) {
        return this.group.create(dto);
    }

    @Get()
    findAll(@Query() dto: FindGroupDto) {
        return this.group.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.group.findOne(id);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateGroupDto) {
        return this.group.update(id, dto);
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteGroupDto) {
        return this.group.removeBatch(dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.group.remove(id);
    }
}
