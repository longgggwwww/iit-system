import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DistrictModule } from './district/district.module'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { ProvinceModule } from './province/province.module'
import { WardModule } from './ward/ward.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
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
            ],
        }),
        ProvinceModule,
        DistrictModule,
        WardModule,
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
    constructor(@Inject('LOG_SERVICE') private log: ClientProxy) {}

    async onApplicationBootstrap() {
        await this.log.connect()
    }
}
