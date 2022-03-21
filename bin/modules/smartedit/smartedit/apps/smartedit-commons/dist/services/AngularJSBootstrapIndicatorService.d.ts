import { Observable } from 'rxjs';
/**
 * A service that is responsible for indicating the bootstrap status of legacy AngularJS application to ensure the
 * legacy dependencies are available.
 */
export declare class AngularJSBootstrapIndicatorService {
    private _smarteditContainerReady;
    private _smarteditReady;
    setSmarteditContainerReady(): void;
    setSmarteditReady(): void;
    /**
     * Notifies about the availability of legacySmarteditContainer
     */
    onSmarteditContainerReady(): Observable<boolean>;
    /**
     * Notifies about the availability of legacySmartedit
     */
    onSmarteditReady(): Observable<boolean>;
}
