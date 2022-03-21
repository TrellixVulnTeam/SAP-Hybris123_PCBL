/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { ICMSPage } from 'cmscommons';
import { DataTableComponentData, DATA_TABLE_COMPONENT_DATA } from 'smarteditcommons';

@Component({
    template: ''
})
export class BaseWrapperComponent implements OnInit {
    protected item: ICMSPage;

    constructor(@Inject(DATA_TABLE_COMPONENT_DATA) public data: DataTableComponentData) {}

    ngOnInit(): void {
        this.item = this.data.item as ICMSPage;
    }
}
