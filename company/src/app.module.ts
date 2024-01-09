import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CompanyModule } from './company/company.module'
import { DepartmentModule } from './department/department.module'
import { PositionModule } from './position/position.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
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
        CompanyModule,
        DepartmentModule,
        PositionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
    constructor(@Inject('UNIT_SERVICE') private unit: ClientProxy) {}

    async onApplicationBootstrap() {
        await this.unit.connect()
    }
}
