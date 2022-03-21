/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
    SeDowngradeComponent,
    SeEntryModule,
    SharedComponentsModule,
    ISelectItem
} from 'smarteditcommons';

@SeDowngradeComponent()
@Component({
    selector: 'app-root',
    template: `
        <div class="smartedit-testing-overlay">
            <select-one></select-one>
            <select-two></select-two>
            <select-three></select-three>
        </div>
    `
})
export class AppRootComponent {}

@Component({
    selector: 'select-one',
    template: `
        <su-select
            id="select-one"
            [items]="items"
            [placeholder]="'My placeholder'"
            (onItemSelected)="handleItemSelected($event)"
        >
        </su-select>
        <div id="select-one-output" [innerText]="selectedValue"></div>
    `
})
export class SelectOneComponent {
    public items: ISelectItem<string>[] = [
        { id: 0, label: 'label_0', value: 'value_0' },
        { id: 1, label: 'label_1', value: 'value_1' }
    ];
    public selectedValue: string;

    public handleItemSelected(item: ISelectItem<string>) {
        this.selectedValue = item.value;
    }
}

@Component({
    selector: 'select-two',
    template: `
        <form>
            <su-select
                id="select-two"
                [items]="items"
                [initialValue]="items[0]"
                [placeholder]="'My placeholder'"
            >
            </su-select>
        </form>
    `
})
export class SelectTwoComponent {
    public items: ISelectItem<string>[] = [
        { id: 0, label: 'label_0', value: 'value_0' },
        { id: 1, label: 'label_1', value: 'value_1' }
    ];
}

@Component({
    selector: 'select-three',
    template: `
        <form [formGroup]="form">
            <su-select
                id="select-three"
                [items]="items"
                formControlName="select"
                [placeholder]="'My placeholder'"
            >
            </su-select>
        </form>

        <div id="select-three-output" [innerHTML]="selectedValue"></div>
    `
})
export class SelectThreeComponent {
    public items: ISelectItem<string>[] = [
        { id: 0, label: 'label_0', value: 'value_0' },
        { id: 1, label: 'label_1', value: 'value_1' }
    ];

    public form: FormGroup = new FormGroup({
        select: new FormControl(this.items[0])
    });

    public selectedValue: string;

    ngOnInit() {
        this.form
            .get('select')
            .valueChanges.subscribe((value) => (this.selectedValue = value.value));
    }
}

@SeEntryModule('SelectApp')
@NgModule({
    imports: [SharedComponentsModule, CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [AppRootComponent, SelectOneComponent, SelectTwoComponent, SelectThreeComponent],
    entryComponents: [
        AppRootComponent,
        SelectOneComponent,
        SelectTwoComponent,
        SelectThreeComponent
    ]
})
export class SelectApp {}
