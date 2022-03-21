/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { GatewayProxied, INotificationService, SeDowngradeService } from 'smarteditcommons';

/**
 * The notification service is used to display visual cues to inform the user of the state of the application.
 */
/** @internal */
@SeDowngradeService(INotificationService)
@GatewayProxied('pushNotification', 'removeNotification', 'removeAllNotifications')
export class NotificationService extends INotificationService {}
