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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { DeleteCompanyDto } from './dto/delete-company.dto';
import { FindCompanyDto } from './dto/find-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompanyController {
    constructor(private company: CompanyService) {}

    @Post()
    create(@Body() dto: CreateCompanyDto, @Request() req) {
        return this.company.create({
            ...dto,
            userId: req.user?.id,
        });
    }

    @Get()
    findAll(@Query() dto: FindCompanyDto) {
        return this.company.findAll(dto);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.company.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateCompanyDto,
    ) {
        return this.company.update(id, dto);
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteCompanyDto) {
        return this.company.removeBatch(dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.company.remove(id);
    }

    // ----------- Microservice ---------------

    @MessagePattern({
        prefix: 'company',
        cmd: 'findAll',
    })
    _findAll(@Payload() dto: FindCompanyDto) {
        return this.company.findAll(dto);
    }

    @MessagePattern({
        prefix: 'company',
        cmd: 'findOne',
    })
    _findOne(@Payload() id: number) {
        return this.company.findOne(id);
    }
}
