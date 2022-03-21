/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeComponent } from '../../di';

/**
 * # Module
 *
 * **Deprecated since 2005, use {@link DataTableModule}.**
 *
 * The yDataTableModule is used to print the input data in the form of a table and also allowing to sort by column.
 *
 * # Component
 *
 * **Deprecated since 2005, use {@link DataTableComponent}.**
 *
 * Component used to print the provided data in the form of table and also enable sorting by column.
 *
 * ### Parameters
 *
 * `columns` - see [columns]{@link DataTableComponent#columns}.
 *
 * `config` - see [config]{@link DataTableComponent#config}.
 *
 * `items` - see [items]{@link DataTableComponent#items}.
 *
 * `onSortColumn` - see [onSortColumn]{@link DataTableComponent#onSortColumn}.
 *
 * @deprecated
 */
@SeComponent({
    selector: 'y-data-table',
    templateUrl: 'yDataTableTemplate.html',
    inputs: ['columns', 'config', 'items', 'onSortColumn:&']
})
export class YDataTableComponent {}
