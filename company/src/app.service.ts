import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    ping(): string {
        return 'Gretting from COMPANY SERVICE';
    }
}
