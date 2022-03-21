import { Payload } from '@smart/utils';
export interface IConfiguration extends Payload {
    defaultToolingLanguage: string;
    domain: string;
    previewTicketURI: string;
    smarteditroot: string;
    storefrontPreviewRoute: string;
    heartBeatTimeoutThreshold?: number;
    typeAheadMiniSearchTermLength?: number;
    typeAheadDebounce?: number;
}
