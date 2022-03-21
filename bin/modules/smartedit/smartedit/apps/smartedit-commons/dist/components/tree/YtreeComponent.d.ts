import * as angular from 'angular';
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
export declare class YtreeComponent {
    private $scope;
    private $q;
    private TreeService;
    private _TreeDndOptions;
    nodeTemplateUrl: string;
    nodeUri: string;
    nodeActions: any;
    rootNodeUid: string;
    dragOptions: TreeDragOptions;
    removeDefaultTemplate: string;
    showAsList: boolean;
    isDisabled: boolean;
    treeOptions: ITreeDndOptions;
    private treeService;
    private root;
    constructor($scope: angular.IScope, $q: angular.IQService, TreeService: new (uri: string) => ITreeService, _TreeDndOptions: new (options: TreeDragOptions) => ITreeDndOptions);
    $onInit(): void;
    /**
     * Causes all the nodes of the tree to collapse.
     * It does not affect their "initiated" status though.
     */
    collapseAll(): void;
    expandAll(): void;
    /**
     * Return a boolean to determine if the node is expandable or not by checking if a given node has children
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    hasChildren(handle: TreeNgModel): boolean;
    fetchData(nodeData: TreeNode): angular.IPromise<TreeNode[]>;
    /**
     * Will toggle a node, causing a fetch from server if expanding for the first time.
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    toggleAndfetch(handle: TreeNgModel): angular.IPromise<void>;
    /**
     * Will refresh a node, causing it to expand after fetch if it was expanded before.
     */
    refresh(handle: TreeNgModel): angular.IPromise<void>;
    /**
     * Will refresh the parent of a node, causing it to expand after fetch if it was expanded before.
     */
    refreshParent(handle: TreeNgModel): void;
    /**
     * Will add a new child to the node referenced by this handle.
     * <br/>The child is added only if [saveNode]{@link TreeService#saveNode} is successful.
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    newChild(handle: TreeNgModel): void;
    /**
     * Will add a new sibling to the node referenced by this handle.
     * <br/>The sibling is added only if [saveNode]{@link TreeService#saveNode} is successful.
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    newSibling(handle: TreeNgModel): void;
    /**
     * Will remove the node referenced by this handle.
     * <br/>The node is removed only if [removeNode]{@link TreeService#removeNode} is successful.
     * @param handle the native {@link https://github.com/angular-ui-tree/angular-ui-tree angular-ui-tree} handle on a given node.
     */
    remove(handle: TreeNgModel): void;
    isRoot(handle: TreeNgModel): boolean;
    displayDefaultTemplate(): boolean;
    onNodeMouseEnter(node: TreeNode): void;
    onNodeMouseLeave(node: TreeNode): void;
    /**
     * Will fetch from the existing tree the node whose identifier is the given nodeUid
     * @param nodeUid the identifier of the node to fetched
     */
    getNodeById(nodeUid: string, nodeArray: TreeNode[]): TreeNode;
}
