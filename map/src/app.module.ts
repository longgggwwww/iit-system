import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CategoryModule } from './category/category.module'
import { GroupModule } from './group/group.module'
import { LoggingInterceptor } from './interceptors/logging.interceptor'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    name: 'LOG_SERVICE',
                    useFactory: (config: ConfigService) => {
                        return {
                            transport: Transport.RMQ,
                            options: {
                                urls: [`${config.get('LOG_RB_URL')}`],
                                queue: `${config.get('LOG_QUEUE')}`,
                                queueOptions: {
                                    durable: true,
                                },
                            },
                        }
                    },
                    inject: [ConfigService],
                },
                {
                    name: 'UNIT_SERVICE',
                    useFactory: (config: ConfigService) => {
                        return {
                            transport: Transport.RMQ,
                            options: {
                                urls: [`${config.get('UNIT_RB_URL')}`],
                                queue: `${config.get('UNIT_QUEUE')}`,
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
    providers: [
        AppService,
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule implements OnApplicationBootstrap {
    constructor(
        @Inject('LOG_SERVICE') private log: ClientProxy,
        @Inject('UNIT_SERVICE') private unit: ClientProxy,
    ) {}

    async onApplicationBootstrap() {
        await Promise.allSettled([this.log.connect(), this.unit.connect()])
    }
}
