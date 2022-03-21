/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule } from 'smarteditcommons/di';
import { SeDropdownComponent } from './SeDropdownComponent';

/**
 * **Deprecated since 2105, use {@link GenericEditorDropdownModule}.**
 *
 * @deprecated
 */
@SeModule({
    imports: ['smarteditServicesModule', 'functionsModule', 'seConstantsModule'],
    declarations: [SeDropdownComponent]
})
export class SeDropdownModule {}
