/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule } from '../../../di';
import { TreeModule } from '../../tree';
import { YEditableListComponent } from './yEditableList';

/**
 * The yEditableList module contains a component which allows displaying a list of elements. The items in
 * that list can be added, removed, and re-ordered.
 */
@SeModule({
    imports: [TreeModule],
    declarations: [YEditableListComponent]
})
export class YEditableListModule {}
