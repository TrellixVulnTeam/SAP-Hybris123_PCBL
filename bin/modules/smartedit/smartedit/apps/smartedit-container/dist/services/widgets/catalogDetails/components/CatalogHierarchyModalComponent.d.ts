import { FundamentalModalManagerService, IBaseCatalog } from 'smarteditcommons';
import './CatalogHierarchyModalComponent.scss';
export declare class CatalogHierarchyModalComponent {
    modalService: FundamentalModalManagerService;
    catalogs$: Promise<IBaseCatalog[]>;
    siteId: string;
    constructor(modalService: FundamentalModalManagerService);
    ngOnInit(): void;
    onSiteSelected(): void;
}
