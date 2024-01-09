import {
    CallHandler,
    ExecutionContext,
    Inject,
    Injectable,
    NestInterceptor,
} from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Response } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { LogEvent } from 'src/event/log.event'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(@Inject('LOG_SERVICE') private log: ClientProxy) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const now = Date.now()
        return next.handle().pipe(
            map(async (data) => {
                const { user, ip, method, path, headers, body } = context
                    .switchToHttp()
                    .getRequest()
                const { statusCode } = context
                    .switchToHttp()
                    .getResponse<Response>()
                if (method !== 'GET') {
                    this.log.emit(
                        'log',
                        new LogEvent({
                            entity: headers.entity,
                            userId: user?.id,
                            ip,
                            method,
                            statusCode,
                            endPoint: path,
                            body: JSON.stringify(body),
                            time: `${Date.now() - now}ms`,
                        }),
                    )
                }
                return data
            }),
        )
    }
}
