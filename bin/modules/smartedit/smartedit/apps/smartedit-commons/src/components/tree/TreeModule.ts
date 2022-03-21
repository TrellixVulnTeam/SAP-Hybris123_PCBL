/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeModule, SeValueProvider } from 'smarteditcommons/di';
import { TreeDndOptionFactory } from './TreeDndOptionsFactory';
import { TreeServiceFactory } from './TreeServiceFactory';
import { YtreeComponent } from './YtreeComponent';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const NgTreeModule = require('angular-ui-tree'); // Only supports CommonJS

const TREE_CONFIGURATION_PROVIDER: SeValueProvider = {
    provide: 'treeConfig',
    useValue: {
        treeClass: 'angular-ui-tree',
        hiddenClass: 'angular-ui-tree-hidden',
        nodesClass: 'angular-ui-tree-nodes',
        nodeClass: 'angular-ui-tree-node',
        handleClass: 'angular-ui-tree-handle',
        placeholderClass: 'angular-ui-tree-placeholder',
        dragClass: 'angular-ui-tree-drag',
        dragThreshold: 3,
        levelThreshold: 30,
        defaultCollapsed: true,
        dragDelay: 200
    }
};

/**
 * This module deals with rendering and management of node trees
 */
@SeModule({
    imports: [
        NgTreeModule,
        'includeReplaceModule',
        'functionsModule',
        'smarteditServicesModule',
        'translationServiceModule',
        'confirmationModalServiceModule',
        'yLoDashModule'
    ],
    declarations: [YtreeComponent],
    providers: [
        TREE_CONFIGURATION_PROVIDER,
        {
            provide: 'TreeService',
            useFactory: TreeServiceFactory
        },
        {
            provide: '_TreeDndOptions',
            useFactory: TreeDndOptionFactory
        },
        TreeServiceFactory
    ]
})
export class TreeModule {}
