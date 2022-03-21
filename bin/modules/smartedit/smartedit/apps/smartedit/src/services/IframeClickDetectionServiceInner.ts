/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { GatewayProxied, IIframeClickDetectionService, SeDowngradeService } from 'smarteditcommons';

@SeDowngradeService(IIframeClickDetectionService)
@GatewayProxied('onIframeClick')
@Injectable()
export class IframeClickDetectionService extends IIframeClickDetectionService {
    constructor(@Inject(DOCUMENT) document: Document) {
        super();
        document.addEventListener('mousedown', () => this.onIframeClick());
    }
}
