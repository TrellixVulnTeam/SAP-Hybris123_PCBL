import { OnChanges, OnInit } from '@angular/core';
export declare class PersonalizationsmarteditInfiniteScrollingComponent implements OnInit, OnChanges {
    dropDownContainerClass: string;
    dropDownClass: string;
    distance: number;
    context: {};
    fetchPage: () => Promise<any>;
    initiated: boolean;
    ngOnInit(): void;
    ngOnChanges(): void;
    nextPage(): void;
    private init;
}
