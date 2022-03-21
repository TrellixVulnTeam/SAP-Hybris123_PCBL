import { IMedia } from '../../fixtures/entities/media';
import { MediaService } from '../services';
export declare class MediaController {
    private readonly mediaService;
    constructor(mediaService: MediaService);
    createMediaItem(): IMedia;
    getMediaItemByUUID(uuid: string): IMedia;
    getMediaItemByNamedQuery(query: any): {
        media: IMedia[];
    };
}
