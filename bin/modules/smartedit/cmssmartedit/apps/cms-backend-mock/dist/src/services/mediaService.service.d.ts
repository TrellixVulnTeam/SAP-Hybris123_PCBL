import { IMedia } from '../../fixtures/entities/media';
export declare class MediaService {
    private currentMedia;
    constructor();
    getMedia(): IMedia[];
    getMediaByCode(code: string): IMedia | undefined;
    getFirstMedia(): IMedia;
    filterMediaByInput(input: string | undefined): IMedia[];
    addMedia(m: IMedia): void;
    getMediaCount(): number;
}
