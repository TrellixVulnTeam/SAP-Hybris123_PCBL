/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IContextAwareEditableItemService } from 'cmscommons';
import { ISeComponent, SeComponent } from 'smarteditcommons';

@SeComponent({
    templateUrl: 'sharedComponentButtonTemplate.html',
    inputs: ['smarteditComponentId']
})
export class SharedComponentButton implements ISeComponent {
    public smarteditComponentId: string;
    public isReady = false;
    public message: string;

    constructor(private contextAwareEditableItemService: IContextAwareEditableItemService) {}

    $onInit(): void {
        this.contextAwareEditableItemService
            .isItemEditable(this.smarteditComponentId)
            .then((isEditable) => {
                this.isReady = true;
                this.message = `se.cms.contextmenu.shared.component.info.msg${
                    isEditable ? '.editable' : ''
                }`;
            });
    }
}
