import { OnInit } from '@angular/core';
import { FundamentalModalManagerService, IdWithLabel, TypedMap } from 'smarteditcommons';
export interface SelectComponentTypeModalComponentData {
    subTypes: TypedMap<string>;
}
export declare class SelectComponentTypeModalComponent implements OnInit {
    private modalManager;
    subTypes: IdWithLabel[];
    constructor(modalManager: FundamentalModalManagerService<SelectComponentTypeModalComponentData>);
    ngOnInit(): void;
    closeWithSelectedId(subTypeId: string): void;
    private mapSubTypesToIdWithLabel;
}
