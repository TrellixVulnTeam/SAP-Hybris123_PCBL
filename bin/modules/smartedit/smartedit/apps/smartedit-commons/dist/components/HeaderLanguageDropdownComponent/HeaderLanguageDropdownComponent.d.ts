import { LanguageDropdown } from '@smart/utils';
import { CrossFrameEventService } from '../../services/crossFrame/CrossFrameEventService';
import { LanguageService } from '../../services/language/LanguageService';
import './HeaderLanguageDropdownComponent.scss';
export declare class HeaderLanguageDropdownComponent extends LanguageDropdown {
    languageService: LanguageService;
    crossFrameEventService: CrossFrameEventService;
    constructor(languageService: LanguageService, crossFrameEventService: CrossFrameEventService);
}
