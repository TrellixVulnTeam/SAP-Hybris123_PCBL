/**
 * **Deprecated since 2005, use {@link PaginationComponent}.**
 *
 * The SmartEdit component that provides pagination by providing a visual pagination bar and buttons/numbers to navigate between pages.
 *
 * You need to bind the current page value to the ng-model property of the component.
 *
 * ### Parameters
 *
 *
 * `totalItems` - The total number of items.
 *
 * `itemsPerPage` - The total number of items per page.
 *
 * `boundaryLinks` - Whether to display First / Last buttons. Defaults to false.
 *
 * `ngModel` - The current page number.
 *
 * `onChange` - The function that is called with the current page number when either a button or page number is clicked.
 * The invoker can bind this to a custom function to act and fetch results based on new page number.
 *
 * @deprecated
 */
export declare class YPaginationComponent {
    totalItems: number;
    itemsPerPage: number;
    onChange: (data: {
        $currentPage: number;
    }) => void;
    currentPage: number;
    boundaryLinks: string;
    private exposedModel;
    $onInit(): void;
    onPageChange(): void;
    pageChanged(): void;
}
