/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { CMSItem } from 'cmscommons';
import { TypedMap } from 'smarteditcommons';

export interface CMSLinkItem extends CMSItem {
    currentSelectedOptionValue: string;
    external: boolean;
    linkName: TypedMap<string>;
    linkTo: string;
    position: number;
    product?: string;
    productCatalog: string;
    restrictions: string[];
    slotId: string;
    styleClasses?: string;
    target: boolean;
    visible: boolean;
}
