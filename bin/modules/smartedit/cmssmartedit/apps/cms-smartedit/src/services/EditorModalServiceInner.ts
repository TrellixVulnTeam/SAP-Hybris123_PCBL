/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IEditorModalService } from 'cmscommons';
import { GatewayProxied, SeDowngradeService } from 'smarteditcommons';

@SeDowngradeService(IEditorModalService)
@GatewayProxied('open', 'openAndRerenderSlot', 'openGenericEditor')
export class EditorModalService extends IEditorModalService {}
