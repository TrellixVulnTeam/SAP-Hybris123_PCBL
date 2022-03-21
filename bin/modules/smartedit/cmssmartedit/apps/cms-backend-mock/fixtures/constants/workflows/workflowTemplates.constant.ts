/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { IWorkflowTemplate } from '../../entities/workflows';

export const workflowTemplates: IWorkflowTemplate[] = [
    {
        code: 'PageApproval',
        name: { en: 'Page Approval' }
    },
    {
        code: 'PageTranslation',
        name: { en: 'Page Translation and Approval' }
    }
];
