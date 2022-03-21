/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { LogService, ModalService, SeDowngradeService, TypedMap } from 'smarteditcommons';
import {
    SelectComponentTypeModalComponent,
    SelectComponentTypeModalComponentData
} from '../components/SelectComponentTypeModalComponent';

@SeDowngradeService()
export class SelectComponentTypeModalService {
    constructor(private logService: LogService, private modalService: ModalService) {}

    public async open(subTypes: TypedMap<string>): Promise<string | void> {
        return this.modalService
            .open<SelectComponentTypeModalComponentData>({
                component: SelectComponentTypeModalComponent,
                data: {
                    subTypes
                },
                config: {
                    modalPanelClass: 'modal-lg'
                },
                templateConfig: {
                    title: 'se.cms.nestedcomponenteditor.select.type'
                }
            })
            .afterClosed.toPromise<string>()
            .catch((error) => {
                this.logService.debug('Select Component Type Modal dismissed', error);
            });
    }
}
