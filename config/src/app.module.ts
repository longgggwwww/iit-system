import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggingInterceptor } from './logging/logging.interceptor'
import { PrismaService } from './prisma/prisma.service'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    name: 'USER_SERVICE',
                    useFactory: (config: ConfigService) => {
                        return {
                            transport: Transport.RMQ,
                            options: {
                                urls: [`${config.get('USER_RB_URL')}`],
                                queue: `${config.get('USER_QUEUE')}`,
                                queueOptions: {
                                    durable: true,
                                },
                            },
                        }
                    },
                    inject: [ConfigService],
                },
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
            ],
        }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        PrismaService,
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor,
        },
    ],
})
export class AppModule implements OnApplicationBootstrap {
    constructor(
        @Inject('USER_SERVICE') private user: ClientProxy,
        @Inject('LOG_SERVICE') private log: ClientProxy,
    ) {}

    async onApplicationBootstrap() {
        await Promise.allSettled([this.user.connect(), this.log.connect()])
    }
}
