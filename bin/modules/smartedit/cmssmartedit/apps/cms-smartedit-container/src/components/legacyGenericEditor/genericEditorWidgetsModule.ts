/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */

// TODO this file should be removed together with genericEditorWidgetsModule.scss
// AFTER all corresponding components have their own css files and this file will be not used anymore
import './genericEditorWidgetStyles.scss';

import { SeModule, YEditableListModule } from 'smarteditcommons';

/**
 * @ngdoc overview
 * @name genericEditorWidgetsModule
 *
 * @description
 * Module containing all the generic editor widgets.
 */
@SeModule({
    imports: [YEditableListModule]
})
export class GenericEditorWidgetsModule {}
