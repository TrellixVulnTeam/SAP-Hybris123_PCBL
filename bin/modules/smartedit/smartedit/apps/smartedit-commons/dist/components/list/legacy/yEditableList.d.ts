import { NavigationNode, TreeActions, TreeDragOptions } from '../../tree';
/**
 * **Deprecated since 2005, use {@link EditableListComponent}.**
 *
 * The yEditableList component allows displaying a list of items. The list can be managed dynamically, by
 * adding, removing, and re-ordering it.
 *
 * ### Parameters
 *
 * `id` - A string used to track and identify the component.
 *
 * `items` - The collection of items to display in the component.
 *
 * `refresh` - A function that can be called to update the content of the list.
 *
 * `onChange` - A function that will be called whenever the content of the list changes.
 *
 * `itemTemplateUrl` - The path to the template to display each of the items in the list.
 *
 * `editable` - The property specifies whether the content of the list can be modified.
 *
 * @deprecated
 */
export declare class YEditableListComponent {
    dragOptions: TreeDragOptions;
    actions: TreeActions;
    onChange: () => void;
    itemTemplateUrl: string;
    editable: boolean;
    refresh: () => void;
    items: NavigationNode[];
    rootId: string;
    id: string;
    private _enableDragAndDrop;
    $onInit(): void;
    private getTreeActions;
    private getDropdownItems;
}
