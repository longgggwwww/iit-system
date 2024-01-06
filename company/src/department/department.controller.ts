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
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DeleteDepartmentDto } from './dto/delete-department.dto';
import { FindDepartmentDto } from './dto/find-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentController {
    constructor(private department: DepartmentService) {}

    @Post()
    create(@Body() dto: CreateDepartmentDto, @Request() req) {
        return this.department.create({
            ...dto,
            userId: req.user?.id,
        });
    }

    @Get()
    findAll(@Query() dto: FindDepartmentDto) {
        return this.department.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.department.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateDepartmentDto,
    ) {
        return this.department.update(id, dto);
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteDepartmentDto) {
        return this.department.removeBatch(dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.department.remove(id);
    }
}
