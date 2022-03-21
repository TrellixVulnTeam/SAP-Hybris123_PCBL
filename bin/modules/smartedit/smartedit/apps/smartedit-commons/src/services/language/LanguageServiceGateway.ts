/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Injectable } from '@angular/core';
import { SeDowngradeService } from '../../di';
import { MessageGateway } from '../gateway';
import { GatewayFactory } from '../gateway/GatewayFactory';

/**
 * @internal
 * @ignore
 */
@SeDowngradeService()
@Injectable()
export class LanguageServiceGateway {
    static instance: MessageGateway;

    constructor(gatewayFactory: GatewayFactory) {
        LanguageServiceGateway.instance =
            LanguageServiceGateway.instance || gatewayFactory.createGateway('languageSwitch');
    }

    public getInstance(): MessageGateway {
        return LanguageServiceGateway.instance;
    }
}
