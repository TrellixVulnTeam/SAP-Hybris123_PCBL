import { IComponentTypeAttribute } from './componentTypeAttribute.entity';
import { IcmsLinkToComponentAttribute } from './cmslinkToComponentAttribute.entity';
export interface IComponentType {
    attributes: (IcmsLinkToComponentAttribute | IComponentTypeAttribute)[];
    category: string;
    code: string;
    i18nKey?: string;
    name: string;
    type?: string;
}
