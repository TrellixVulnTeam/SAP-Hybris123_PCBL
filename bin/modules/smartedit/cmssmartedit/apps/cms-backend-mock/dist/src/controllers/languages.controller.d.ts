export declare class LanguagesController {
    getLanguages(): {
        languages: ({
            nativeName: string;
            isocode: string;
            name: string;
            required: boolean;
        } | {
            nativeName: string;
            isocode: string;
            required: boolean;
            name?: undefined;
        } | {
            nativeName: string;
            isocode: string;
            name?: undefined;
            required?: undefined;
        })[];
    };
    getI18NLanguages(): {
        languages: {
            isoCode: string;
            name: string;
        }[];
    };
}
