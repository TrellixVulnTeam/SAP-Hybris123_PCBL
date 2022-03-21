import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
export declare class FixtureAdjustmentInterceptor implements NestInterceptor {
    private readonly storageService;
    constructor(storageService: StorageService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
