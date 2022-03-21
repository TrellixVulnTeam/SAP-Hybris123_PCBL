/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { TypedMap } from '../typedMap.entity';
export interface IWorkflowTemplate {
    code: string;
    name: TypedMap<string>;
}
