/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CMSItem, IComponent, IEditorModalService } from 'cmscommons';
import { defaultsDeep } from 'lodash';
import { SeDowngradeService } from 'smarteditcommons';

interface NestedComponentInfo {
    componentType: string;
    componentUuid: string;
    content: {
        visible?: boolean;
        catalogVersion: string;
    };
}

@SeDowngradeService()
export class NestedComponentManagementService {
    constructor(private editorModalService: IEditorModalService) {}

    public openNestedComponentEditor(
        componentInfo: NestedComponentInfo,
        editorStackId: string
    ): Promise<CMSItem> {
        const componentAttributes = this.prepareComponentAttributes(componentInfo);
        return this.editorModalService.open<CMSItem>(
            componentAttributes,
            null,
            null,
            null,
            null,
            editorStackId
        );
    }

    private prepareComponentAttributes({
        componentUuid,
        componentType,
        content
    }: NestedComponentInfo): IComponent {
        return {
            smarteditComponentUuid: componentUuid,
            smarteditComponentType: componentType,
            content: defaultsDeep({}, content, {
                typeCode: componentType,
                itemtype: componentType,
                visible: true
            })
        };
    }
}
