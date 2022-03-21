import { OnInit } from '@angular/core';
import { FundamentalModalManagerService, SelectOnChange, SystemEventService } from 'smarteditcommons';
import { SelectAdaptedCatalog } from '../types';
import './MultiProductCatalogVersionConfigurationComponent.scss';
export declare class MultiProductCatalogVersionConfigurationComponent implements OnInit {
    private modalManager;
    private systemEventService;
    productCatalogs: SelectAdaptedCatalog[];
    selectedCatalogVersions: string[];
    updatedCatalogVersions: string[];
    private readonly doneButtonId;
    constructor(modalManager: FundamentalModalManagerService, systemEventService: SystemEventService);
    ngOnInit(): void;
    updateModel(): SelectOnChange;
    private updateSelection;
    private onCancel;
    private onSave;
}
