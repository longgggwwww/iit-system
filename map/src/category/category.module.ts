import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'

@Module({
    imports: [
        // ClientsModule.register([
        //     {
        //         name: 'COMPANY_SERVICE',
        //         transport: Transport.RMQ,
        //         options: {
        //             urls: [`amqp://root:rmq@localhost:5672`],
        //             queue: `company`,
        //             queueOptions: {
        //                 durable: true,
        //             },
        //         },
        //     },
        // ]),
    ],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule {}
