/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import * as angular from 'angular';

import { SeComponent } from '../../di';

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
@SeComponent({
    selector: 'y-pagination',
    templateUrl: 'yPaginationTemplate.html',
    require: {
        exposedModel: 'ngModel'
    },
    inputs: ['totalItems', 'itemsPerPage', 'boundaryLinks', 'onChange:&']
})
export class YPaginationComponent {
    public totalItems: number;
    public itemsPerPage: number;
    public onChange: (data: { $currentPage: number }) => void;
    public currentPage: number;
    public boundaryLinks: string;

    private exposedModel: angular.INgModelController;

    $onInit(): void {
        // in order to propagate down changes to ngModel from the parent controller
        this.exposedModel.$viewChangeListeners.push(() => this.onPageChange());
        this.exposedModel.$render = (): void => this.onPageChange();
    }

    public onPageChange(): void {
        this.currentPage = this.exposedModel.$modelValue;
    }

    public pageChanged(): void {
        this.exposedModel.$setViewValue(this.currentPage);
        this.onChange({
            $currentPage: this.currentPage
        });
    }
}
