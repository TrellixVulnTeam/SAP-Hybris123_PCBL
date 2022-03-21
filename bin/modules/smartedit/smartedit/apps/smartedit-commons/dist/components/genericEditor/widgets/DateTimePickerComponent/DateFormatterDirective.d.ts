import { DatePipe } from '@angular/common';
import { ElementRef, Renderer2 } from '@angular/core';
import { NgModel } from '@angular/forms';
/**
 * The date formatter is for displaying the date in the desired format.
 * You can pass the desired format in the attributes of this directive and it will be shown.
 * It is  used with the <input> tag as we cant use date filter with it.
 * for eg- <input type='text' dateFormatter formatType="short">
 * format-type can be short, medium etc.
 * If the format-type is not given in the directive template, by default it uses the short type
 */
export declare class DateFormatterDirective {
    private ngModel;
    private element;
    private renderer;
    private datePipe;
    formatType?: string;
    constructor(ngModel: NgModel, element: ElementRef, renderer: Renderer2, datePipe: DatePipe);
    ngOnInit(): void;
}
