/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownMenuModule } from '../dropdown/dropdownMenu';
import { NgTreeModule } from '../treeModule/TreeModule';
import { EditableListComponent, EditableListDefaultItem } from './EditableListComponent';

@NgModule({
    imports: [CommonModule, NgTreeModule, DropdownMenuModule],
    declarations: [EditableListComponent, EditableListDefaultItem],
    entryComponents: [EditableListComponent, EditableListDefaultItem],
    exports: [EditableListComponent, EditableListDefaultItem]
})
export class EditableListModule {}
