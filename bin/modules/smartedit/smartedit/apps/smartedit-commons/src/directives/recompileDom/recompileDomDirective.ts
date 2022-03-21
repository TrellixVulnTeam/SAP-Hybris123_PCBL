/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeDirective } from '../../di';

/**
 *
 * The recompile dom directive accepts a function param, and can be applied to any part of the dom.
 * Upon execution of the function, the inner contents of this dom is recompiled by Angular.
 *
 * ### Parameters
 *
 * `recompileDom` - Function invoked from the outer scope to trigger the recompiling of the transcluded content.
 */
@SeDirective({
    selector: '[recompile-dom]',
    replace: false,
    transclude: true,
    controllerAs: 'ctrl',
    template: `<div data-ng-if='ctrl.showContent' data-ng-transclude></div>`,
    inputs: ['recompileDom:=']
})
export class RecompileDomDirective {
    public showContent = true;
    public recompileDom: () => void;

    $postLink(): void {
        this.recompileDom = (): void => {
            this.showContent = false;
            setTimeout(() => {
                this.showContent = true;
            }, 0);
        };
    }
}
