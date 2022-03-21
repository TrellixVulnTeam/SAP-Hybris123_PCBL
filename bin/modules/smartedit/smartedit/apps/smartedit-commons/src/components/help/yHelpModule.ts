/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule } from '../../di';
import { YPopoverModule } from '../popover';
import { YHelpComponent } from './yHelp';

@SeModule({
    imports: [YPopoverModule],
    declarations: [YHelpComponent]
})
export class YHelpModule {}
