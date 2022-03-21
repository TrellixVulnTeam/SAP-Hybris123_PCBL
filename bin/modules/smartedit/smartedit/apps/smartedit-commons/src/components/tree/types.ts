/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';
import { IDropdownMenuItem } from '../dropdown/dropdownMenu/IDropdownMenuItem';

/**
 * **Deprecated since 2005, use {@link TreeDragAndDropEvent}.**
 *
 * A plain JSON object, representing the event triggered when dragging and dropping nodes in the {@link YtreeComponent}.
 *
 * @deprecated
 */
export class YTreeDndEvent {
    constructor(
        /**
         * The node being dragged
         */
        public sourceNode: TreeNode,
        /**
         * Array of siblings nodes to the location drop location
         */
        public destinationNodes: TreeNode,
        /**
         * The index at which node was dropped amongst its siblings
         */
        public position: number,
        /**
         * The  UI handle of the parent node of the source element
         */
        public sourceParentHandle?: any,
        /**
         * The UI handle of the targeted parent element
         */
        public targetParentHandle?: any
    ) {}
}

/**
 * **Deprecated since 2005, use {@link TreeDragAndDropOptions}.**
 *
 * A JSON object holding callbacks related to nodes drag and drop functionality in the {@link YtreeComponent}.
 * Each callback exposes the {@link YTreeDndEvent}.
 *
 * @deprecated
 */
export interface TreeDragOptions {
    /**
     * Callback function executed after the node is dropped.
     */
    onDropCallback: (event: YTreeDndEvent) => void;
    /**
     * Callback function executed before drop. Return true allows drop, false rejects, and an object {confirmDropI18nKey: 'key'} opens a confirmation modal.
     */
    beforeDropCallback: (event: YTreeDndEvent) => void;
    /**
     * Callback function executed when hovering over droppable slots, return true to allow, return false to block.
     */
    acceptDropCallback: (event: YTreeDndEvent) => void;
    allowDropCallback: (event: YTreeDndEvent) => void;
}

export interface ITreeService {
    fetchChildren(parent: TreeNode): angular.IPromise<TreeNode[]>;
    saveNode(parent: TreeNode): angular.IPromise<TreeNode>;
    removeNode(node: TreeNode): angular.IPromise<void>;
}

/**
 * A plain JSON object, representing the node of a tree managed by the {@link YtreeComponent}.
 */
export interface TreeNode {
    /**
     * Boolean specifying whether the retrieved node has children. This is read only and ignored upon saving.
     */
    hasChildren: boolean;
    /**
     * The non localized node name. Required upon posting.
     */
    name: string;
    parent: TreeNode;
    /**
     * The unique identifier of the parent node for the given catalog. Required upon posting.
     */
    parentUid: string;
    position: number;
    itemType: string;
    /**
     * The unique identifier of a node for the given catalog. Optional upon posting.
     */
    uid: string;
    uuid: string;
    nodes?: TreeNode[];
    initiated?: boolean;
    mouseHovered?: boolean;
    isExpanded?: boolean;
}

export interface TreeNgModel extends angular.INgModelController {
    collapsed: boolean;
    toggle: () => void;
    $parentNodeScope: any;
}

/* @internal */
export interface ITreeDndOptions {
    dragEnabled: boolean;
    dragDelay: number;
}

/* @internal */
export interface TreeDndOptionsCallbacks {
    dropped?: (event: any) => void;
    beforeDrop?: (event: any) => void;
    accept?: (sourceNodeScope: any, destNodesScope: any, destIndex: any) => void;
}

/* @internal */
export interface TreeConfiguration {
    treeClass: string;
    hiddenClass: string;
    nodesClass: string;
    nodeClass: string;
    handleClass: string;
    placeholderClass: string;
    dragClass: string;
    dragThreshold: number;
    levelThreshold: number;
    defaultCollapsed: boolean;
    dragDelay: number;
}

export interface TreeActions {
    getDropdownItems(): IDropdownMenuItem[];
    fetchData(nodeData: TreeNode): Promise<TreeNode>;
    fetchData(treeService: ITreeService, nodeData: TreeNode): Promise<TreeNode>;
    removeItem(handle: TreeNgModel): void;
    removeItem(treeService: ITreeService, handle: TreeNgModel): void;
    moveUp(handle: TreeNgModel): void;
    moveUp(treeService: ITreeService, handle: TreeNgModel): void;
    moveDown(treeService: ITreeService, handle: TreeNgModel): void;
    moveDown(handle: TreeNgModel): void;
    isMoveUpAllowed(treeService: ITreeService, handle: TreeNgModel): boolean;
    isMoveUpAllowed(handle: TreeNgModel): boolean;
    isMoveDownAllowed(treeService: ITreeService, handle: TreeNgModel): boolean;
    isMoveDownAllowed(handle: TreeNgModel): boolean;
    performUpdate(): void;
    refreshList(): void;
}

export interface NavigationNodeEntry {
    id: string;
    name: string;
    itemType: string;
}

export interface NavigationNode extends TreeNode {
    id: string;
    nodes: NavigationNode[];
    entries?: NavigationNodeEntry[];
    parent: NavigationNode;
}

export interface TreeNodeWithLevel extends TreeNode {
    level: number;
    formattedLevel: string;
}
