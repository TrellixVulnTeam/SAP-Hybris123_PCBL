/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { EventMessageData } from '../../message';

/**
 * **Deprecated since 2005, use {@link EventMessageData}**.
 *
 * IYEventMessageData represents the data that can optionaly be passed to the event service
 * when firing an event to show a {@link YEventMessageComponent}.
 *
 * @deprecated
 */
export interface IYEventMessageData extends EventMessageData {}
