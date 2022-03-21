/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IComponentSharedService, ICMSComponent } from 'cmscommons';
import { GatewayProxied, SeDowngradeService } from 'smarteditcommons';
import { ComponentInfoService } from './ComponentInfoService';

@SeDowngradeService(IComponentSharedService)
@GatewayProxied()
export class ComponentSharedService extends IComponentSharedService {
    constructor(private componentInfoService: ComponentInfoService) {
        super();
    }

    public async isComponentShared(componentParam: string | ICMSComponent): Promise<boolean> {
        const component = await this.determineComponent(componentParam);
        if (!component.slots) {
            throw new Error(
                'ComponentSharedService::isComponentShared - Component must have slots property.'
            );
        }
        return component.slots.length > 1;
    }

    private determineComponent(componentParam: string | ICMSComponent): Promise<ICMSComponent> {
        if (typeof componentParam === 'string') {
            return this.componentInfoService.getById(componentParam);
        }
        return Promise.resolve(componentParam);
    }
}
