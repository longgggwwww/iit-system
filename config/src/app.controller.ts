import { Body, Controller, Get, Patch } from '@nestjs/common'
import { AppService } from './app.service'
import { UpsertDto } from './dto/upsert.dto'

@Controller()
export class AppController {
    constructor(private app: AppService) {}

    @Get()
    ping() {
        return this.app.ping()
    }

    @Get('config')
    find() {}

    @Patch()
    update(@Body() dto: UpsertDto) {}
}
