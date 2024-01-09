import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { AppController } from './app.controller'
import { AppService } from './app.service'
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
            ],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, PrismaService],
})
export class AppModule {}
