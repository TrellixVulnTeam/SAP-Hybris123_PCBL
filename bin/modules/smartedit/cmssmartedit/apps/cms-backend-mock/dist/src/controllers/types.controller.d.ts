import { IcmsLinkToComponentAttribute, IComponentType, IComponentTypeAttribute } from '../../fixtures/entities/components';
export declare class TypesController {
    getComponentTypeByCode(code: string): IComponentType;
    getComponentType(code: string, mode: string, category: string): IComponentType | {
        attributes: (IComponentTypeAttribute | IcmsLinkToComponentAttribute)[];
        componentTypes?: undefined;
    } | {
        componentTypes: (IComponentType | undefined)[];
        attributes?: undefined;
    };
    getPageTypes(): {
        pageTypes: {
            code: string;
            name: {
                en: string;
                fr: string;
            };
            description: {
                en: string;
                fr: string;
            };
        }[];
    };
}
