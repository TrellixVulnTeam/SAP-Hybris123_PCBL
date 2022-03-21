/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import { Cloneable } from '../dtos';

export type CloneableEventHandler<T extends Cloneable> = (
    eventId: string,
    eventData?: T
) => angular.IPromise<any> | any;

export interface IEventService {
    publish(eventId: string, data?: Cloneable): Promise<any[]>;

    subscribe<T extends Cloneable>(eventId: string, handler: CloneableEventHandler<T>): () => void;
}
