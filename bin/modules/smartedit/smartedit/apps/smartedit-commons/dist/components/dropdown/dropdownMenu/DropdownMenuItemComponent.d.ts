import { Injector, OnInit } from '@angular/core';
import { CompileHtmlNgController } from 'smarteditcommons/directives';
import { IDropdownMenuItem } from './IDropdownMenuItem';
export declare class DropdownMenuItemComponent implements OnInit {
    private injector;
    dropdownItem: IDropdownMenuItem;
    selectedItem: any;
    compileHtmlNgController: CompileHtmlNgController;
    dropdownItemInjector: Injector;
    constructor(injector: Injector);
    ngOnInit(): void;
    private createCompileHtmlNgController;
    private createDropdownItemInjector;
}
