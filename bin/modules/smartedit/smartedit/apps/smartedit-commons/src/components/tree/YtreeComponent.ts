/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';

import { SeComponent } from 'smarteditcommons/di';
import { ITreeDndOptions, ITreeService, TreeDragOptions, TreeNgModel, TreeNode } from './types';
import './Ytree.scss';

/**
 * **Deprecated since 2005, use {@link TreeComponent}.**
 *
 * This directive renders a tree of nodes and manages CRUD operations around the nodes.
 * <br/>It relies on {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} third party library
 * <br/>Its behaviour is defined by {@link YtreeComponent}.
 *
 * ### Parameters
 *
 *
 * `nodeTemplateUrl` - an HTML node template to be included besides each node to enhance rendering and behaviour of the tree. This template may use the nodeActions defined hereunder.
 *
 * `nodeUri` - the REST entry point to be used to manage the nodes (GET, POST, PUT and DELETE).
 *
 * `dragOptions` - a map of callback functions to customize the drag and drop behaviour of the tree by exposing the {@link YTreeDndEvent}.
 *
 * `nodeActions` - a map of methods to be closure-bound to the {@link YtreeComponent} instance in order to manage the tree from the parent scope or from the optional node template.
 * <br/> All nodeActions methods must take {@link TreeService} instance as first parameter.
 * <br/> {@link TreeService} instance will then prebound in the closure made available in the node template or in the parent scope.
 * <br/>
 * Example in a parent controller:
 *
 *      this.actions = {
 * 		    myMethod: function(treeService, arg1, arg2) {
 * 			    //some action expecting 'this'
 * 			    //to be the YTreeController
 * 			    this.newChild(this.root.nodes[0]);
 * 		    }
 * 	    };
 *
 * passed to the directive through:
 *
 *      <ytree data-node-uri='ctrl.nodeURI' data-node-template-url='ctrl.nodeTemplateUrl' data-node-actions='ctrl.actions'/>
 *
 * And in the HTML node template you may invoke it this way:
 *
 *      <button data-ng-click="$ctrl.myMethod('arg1', 'arg2')">my action</button>
 *
 * or from the parent controller:
 *
 *      <button data-ng-click="$ctrl.actions.myMethod('arg1', 'arg2')">my action</button>
 *
 * @deprecated
 */
@SeComponent({
    templateUrl: 'yTreeComponentTemplate.html',
    inputs: [
        'nodeTemplateUrl:=',
        'nodeUri:=',
        'nodeActions:=',
        'rootNodeUid:=',
        'dragOptions:=',
        'removeDefaultTemplate:=?',
        'showAsList:=?'
    ]
})
export class YtreeComponent {
    public nodeTemplateUrl: string;
    public nodeUri: string;
    public nodeActions: any;
    public rootNodeUid: string;
    public dragOptions: TreeDragOptions;
    public removeDefaultTemplate: string;
    public showAsList: boolean;
    public isDisabled: boolean;
    public treeOptions: ITreeDndOptions;

    private treeService: ITreeService;
    private root: TreeNode;

    constructor(
        private $scope: angular.IScope,
        private $q: angular.IQService,
        private TreeService: new (uri: string) => ITreeService,
        private _TreeDndOptions: new (options: TreeDragOptions) => ITreeDndOptions
    ) {}

    $onInit(): void {
        this.root = {
            uid: this.rootNodeUid,
            hasChildren: true,
            name: 'root',
            parent: null,
            parentUid: null,
            position: 0,
            itemType: null,
            uuid: null
        };

        this.treeOptions = new this._TreeDndOptions(this.dragOptions);
        this.treeService = new this.TreeService(this.nodeUri);

        Object.keys(this.nodeActions).forEach((functionName: Extract<keyof this, string>) => {
            this[functionName] = this.nodeActions[functionName].bind(this, this.treeService);
            this.nodeActions[functionName] = this.nodeActions[functionName].bind(
                this,
                this.treeService
            );
        });

        this.fetchData(this.root);
    }

    /**
     * Causes all the nodes of the tree to collapse.
     * It does not affect their "initiated" status though.
     */
    collapseAll(): void {
        this.$scope.$broadcast('angular-ui-tree:collapse-all');
    }

    expandAll(): void {
        this.$scope.$broadcast('angular-ui-tree:expand-all');
    }

    /**
     * Return a boolean to determine if the node is expandable or not by checking if a given node has children
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    hasChildren(handle: TreeNgModel): boolean {
        const nodeData = handle.$modelValue;
        return nodeData.hasChildren;
    }

    fetchData(nodeData: TreeNode): angular.IPromise<TreeNode[]> {
        return this.treeService.fetchChildren(nodeData);
    }

    /**
     * Will toggle a node, causing a fetch from server if expanding for the first time.
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    toggleAndfetch(handle: TreeNgModel): angular.IPromise<void> {
        this.isDisabled = true;
        const nodeData = handle.$modelValue;
        if (handle.collapsed) {
            return this.fetchData(nodeData).then(() => {
                handle.toggle();
                this.isDisabled = false;
            });
        }
        handle.toggle();
        this.isDisabled = false;
        return this.$q.when();
    }

    /**
     * Will refresh a node, causing it to expand after fetch if it was expanded before.
     */
    refresh(handle: TreeNgModel): angular.IPromise<void> {
        const nodeData = handle.$modelValue;
        nodeData.initiated = false;
        const previousCollapsed = handle.collapsed;
        return this.fetchData(nodeData).then(() => {
            if (!previousCollapsed && handle.collapsed) {
                handle.toggle();
            }
        });
    }

    /**
     * Will refresh the parent of a node, causing it to expand after fetch if it was expanded before.
     */
    refreshParent(handle: TreeNgModel): void {
        if (handle.$modelValue.parent.uid === this.root.uid) {
            this.fetchData(this.root);
        } else {
            this.refresh(handle.$parentNodeScope);
        }
    }
    /**
     * Will add a new child to the node referenced by this handle.
     * <br/>The child is added only if [saveNode]{@link TreeService#saveNode} is successful.
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    newChild(handle: TreeNgModel): void {
        const nodeData = handle.$modelValue ? handle.$modelValue : this.root;
        nodeData.nodes = nodeData.nodes || [];

        this.treeService.saveNode(nodeData).then((response: TreeNode) => {
            (handle.collapsed ? this.toggleAndfetch(handle) : this.$q.when()).then(() => {
                const elm = nodeData.nodes.find((node: TreeNode) => node.uid === response.uid);
                if (!elm) {
                    // if children list already initiated, one needs to push to the list on the ui side
                    nodeData.nodes.push(response);
                }
            });
        });
    }

    /**
     * Will add a new sibling to the node referenced by this handle.
     * <br/>The sibling is added only if [saveNode]{@link TreeService#saveNode} is successful.
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    newSibling(handle: TreeNgModel): void {
        const nodeData = handle.$modelValue;
        const parent = nodeData.parent;

        this.treeService.saveNode(parent).then((response: TreeNode) => {
            parent.nodes.push(response);
        });
    }

    /**
     * Will remove the node referenced by this handle.
     * <br/>The node is removed only if [removeNode]{@link TreeService#removeNode} is successful.
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    remove(handle: TreeNgModel): void {
        const nodeData = handle.$modelValue;
        this.treeService.removeNode(nodeData).then(() => {
            const parent = nodeData.parent;
            parent.nodes.splice(parent.nodes.indexOf(nodeData), 1);
            parent.initiated = false;
            delete parent.nodes;
            this.fetchData(parent);
        });
    }

    isRoot(handle: TreeNgModel): boolean {
        const nodeData = handle.$modelValue;
        return nodeData.parent.uid === undefined;
    }

    displayDefaultTemplate(): boolean {
        return !this.removeDefaultTemplate;
    }

    onNodeMouseEnter(node: TreeNode): void {
        node.mouseHovered = true;
    }

    onNodeMouseLeave(node: TreeNode): void {
        node.mouseHovered = false;
    }

    /**
     * Will fetch from the existing tree the node whose identifier is the given nodeUid
     * @param nodeUid the identifier of the node to fetched
     */
    getNodeById(nodeUid: string, nodeArray: TreeNode[]): TreeNode {
        if (!nodeArray) {
            nodeArray = this.root.nodes;
        }
        if (nodeUid === this.rootNodeUid) {
            return this.root;
        }

        // eslint-disable-next-line @typescript-eslint/no-for-in-array
        for (const i in nodeArray) {
            if (nodeArray.hasOwnProperty(i)) {
                if (nodeArray[i].uid === nodeUid) {
                    return nodeArray[i];
                }
                if (nodeArray[i].hasChildren) {
                    nodeArray[i].nodes = nodeArray[i].nodes || [];
                    const result = this.getNodeById(nodeUid, nodeArray[i].nodes);
                    if (result) {
                        return result;
                    }
                }
            }
        }

        return null;
    }
}
