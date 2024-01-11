import { Body, Controller, Post } from '@nestjs/common'
import { CreatePlaceDto } from './dto/create-place.dto'
import { PlaceService } from './place.service'

@Controller('places')
export class PlaceController {
    constructor(private place: PlaceService) {}

    @Post()
    create(@Body() dto: CreatePlaceDto) {
        return this.place.create(dto)
    }

    // @Get()
    // findAll() {
    //     return this.place.findAll()
    // }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.place.findOne(+id)
    // }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updatePlaceDto: UpdatePlaceDto) {
    //     return this.place.update(+id, updatePlaceDto)
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.place.remove(+id)
    // }
}
