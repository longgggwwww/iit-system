import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoryModule } from './category/category.module'
import { GroupModule } from './group/group.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    name: 'COMPANY_SERVICE',
                    useFactory: (config: ConfigService) => {
                        console.log(
                            config.get('COMPANY_RB_URL'),
                            config.get('COMPANY_QUEUE'),
                        )
                        return {
                            transport: Transport.RMQ,
                            options: {
                                urls: [`${config.get('COMPANY_RB_URL')}`],
                                queue: `${config.get('COMPANY_QUEUE')}`,
                                queueOptions: {
                                    durable: true,
                                },
                            },
                        }
                    },
                    inject: [ConfigService],
                },
            ],
        }),
        CategoryModule,
        GroupModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
    constructor(@Inject('COMPANY_SERVICE') private company: ClientProxy) {}

    async onApplicationBootstrap() {
        await this.company.connect()
    }
}
