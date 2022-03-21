/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule } from '../../di';
import { YPopupOverlayModule } from '../../directives/yPopupOverlay/yPopupOverlayModule';
import { SeConstantsModule } from '../../services/SeConstantsModule';
import { FunctionsModule } from '../../utils';
import { YPopoverDirective } from './yPopoverDirective';
import { YPopoverPopupComponent } from './yPopoverPopupComponent';

@SeModule({
    imports: ['coretemplates', YPopupOverlayModule, FunctionsModule, SeConstantsModule],
    declarations: [YPopoverDirective, YPopoverPopupComponent]
})
export class YPopoverModule {}
