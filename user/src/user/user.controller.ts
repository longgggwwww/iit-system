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
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { DeleteUserDto } from './dto/delete-user.dto'
import { FindUserDto } from './dto/find-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
    constructor(private user: UserService) {}

    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.user.create(dto)
    }

    @Get()
    findAll(@Query() dto: FindUserDto) {
        return this.user.findAll(dto)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.user.findOne(id)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
        return this.user.update(id, dto)
    }

    @Delete('batch')
    removeMany(@Body() dto: DeleteUserDto) {
        return this.user.removeBatch(dto)
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.user.remove(id)
    }
}
