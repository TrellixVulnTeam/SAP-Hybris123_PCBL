import { Injector, SimpleChanges } from '@angular/core';
import { CompileHtmlNgController } from '../../directives';
import { TreeComponent } from './TreeComponent';
import { TreeService } from './TreeService';
import { ITreeNodeItem } from './types';
export declare class TreeNodeRendererComponent<T, D> {
    private tree;
    private treeService;
    private injector;
    node: ITreeNodeItem<T>;
    nodeComponentInjector: Injector;
    legacyController: CompileHtmlNgController;
    constructor(tree: TreeComponent<T, D>, treeService: TreeService<T, D>, injector: Injector);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    toggle($event: Event): void;
    onMouseOver(): void;
    onMouseOut(): void;
    getPaddingLeft(level: number): string;
    get showAsList(): boolean;
    get isDisabled(): boolean;
    get collapsed(): boolean;
    get displayDefaultTemplate(): boolean;
    get isRootNodeDescendant(): boolean;
    private createNodeLegacyController;
    private createNodeComponentInjector;
}
