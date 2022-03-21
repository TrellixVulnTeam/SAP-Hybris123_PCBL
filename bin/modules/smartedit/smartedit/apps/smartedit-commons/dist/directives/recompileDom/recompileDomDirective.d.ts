/**
 *
 * The recompile dom directive accepts a function param, and can be applied to any part of the dom.
 * Upon execution of the function, the inner contents of this dom is recompiled by Angular.
 *
 * ### Parameters
 *
 * `recompileDom` - Function invoked from the outer scope to trigger the recompiling of the transcluded content.
 */
export declare class RecompileDomDirective {
    showContent: boolean;
    recompileDom: () => void;
    $postLink(): void;
}
