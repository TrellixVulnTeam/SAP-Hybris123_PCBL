/// <reference types="jquery" />
/// <reference types="eonasdan-bootstrap-datetimepicker" />
/// <reference types="angular-animate" />
/// <reference types="angular-mocks" />
import * as angular from 'angular';
export declare abstract class IAnimateService implements angular.animate.IAnimateService {
    addClass(element: JQuery<HTMLElement>, className: string, options?: angular.animate.IAnimationOptions): angular.animate.IAnimationPromise;
    animate(element: JQuery<HTMLElement>, from: any, to: any, className?: string, options?: angular.animate.IAnimationOptions): angular.animate.IAnimationPromise;
    cancel(animationPromise: angular.animate.IAnimationPromise): void;
    closeAndFlush(): void;
    enabled(element: JQuery<HTMLElement>, value?: boolean): boolean;
    enabled(value?: boolean): boolean;
    enter(element: JQuery<HTMLElement>, parentElement: JQuery<HTMLElement>, afterElement?: JQuery<HTMLElement>, options?: angular.animate.IAnimationOptions): angular.animate.IAnimationPromise;
    flush(): void;
    leave(element: JQuery<HTMLElement>, options?: angular.animate.IAnimationOptions): angular.animate.IAnimationPromise;
    move(element: JQuery<HTMLElement>, parentElement: JQuery<HTMLElement>, afterElement?: JQuery<HTMLElement>): angular.animate.IAnimationPromise;
    off(event: string, container?: JQuery<HTMLElement>, callback?: (element?: JQuery, phase?: string) => any): void;
    on(event: string, container: JQuery<HTMLElement>, callback: (element?: JQuery, phase?: string) => any): void;
    pin(element: JQuery<HTMLElement>, parentElement: JQuery<HTMLElement>): void;
    removeClass(element: JQuery<HTMLElement>, className: string, options?: angular.animate.IAnimationOptions): angular.animate.IAnimationPromise;
    setClass(element: JQuery<HTMLElement>, add: string, remove: string, options?: angular.animate.IAnimationOptions): angular.animate.IAnimationPromise;
}
