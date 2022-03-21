import * as angular from 'angular';
export declare abstract class ITemplateCacheService implements angular.ITemplateCacheService {
    info(): any;
    put<T>(key: string, value?: T): T;
    get<T>(key: string): T | undefined;
    remove(key: string): void;
    removeAll(): void;
    destroy(): void;
}
