/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { TypePermissionsRestService } from 'cmscommons';
import { MediaContainerComponent } from 'cmssmarteditcontainer/components/genericEditor';
import {
    MediaContainer,
    MediaFormatType
} from 'cmssmarteditcontainer/components/genericEditor/media/components';
import {
    ErrorContext,
    TypedMap,
    FileValidationService,
    GenericEditorWidgetData,
    IGenericEditor,
    LogService
} from 'smarteditcommons';
import { LoadConfigManagerService } from 'smarteditcontainer';

describe('MediaContainerComponent', () => {
    let logService: jasmine.SpyObj<LogService>;
    let typePermissionsRestService: jasmine.SpyObj<TypePermissionsRestService>;
    let loadConfigManagerService: jasmine.SpyObj<LoadConfigManagerService>;
    let fileValidationService: jasmine.SpyObj<FileValidationService>;
    let widgetData: GenericEditorWidgetData<TypedMap<MediaContainer>>;

    let component: MediaContainerComponent;
    beforeEach(() => {
        logService = jasmine.createSpyObj<LogService>('logService', ['warn']);
        typePermissionsRestService = jasmine.createSpyObj<TypePermissionsRestService>(
            'typePermissionsRestService',
            ['hasAllPermissionsForTypes']
        );
        loadConfigManagerService = jasmine.createSpyObj<LoadConfigManagerService>(
            'loadConfigManagerService',
            ['loadAsObject']
        );
        fileValidationService = jasmine.createSpyObj<FileValidationService>(
            'fileValidationService',
            ['validate']
        );
        widgetData = {
            field: {
                qualifier: 'media',
                cmsStructureType: ''
            },
            model: {
                en: {
                    qualifier: '',
                    catalogVersion: undefined,
                    medias: {},
                    mediaContainerUuid: undefined
                }
            },
            editor: ({
                initialContent: false
            } as unknown) as IGenericEditor,
            qualifier: 'en',
            id: undefined,
            isFieldDisabled: () => false
        };

        component = new MediaContainerComponent(
            logService,
            typePermissionsRestService,
            loadConfigManagerService,
            fileValidationService,
            widgetData
        );
    });

    describe('initialization', () => {
        beforeEach(() => {
            loadConfigManagerService.loadAsObject.and.returnValue(
                Promise.resolve({
                    advancedMediaContainerManagement: true
                })
            );
        });

        it('GIVEN component is cloned in advanced media management mode THEN media container name is prefixed', async () => {
            (component as any).editor.initialContent = {
                cloneComponent: true
            };

            component.model.en.qualifier = 'existing_qualifier';
            const onMediaContainerNameChangeSpy = spyOn(component, 'onMediaContainerNameChange');

            await component.ngOnInit();

            expect(onMediaContainerNameChangeSpy).toHaveBeenCalledWith('clone_existing_qualifier');
        });

        it('GIVEN user no read permission on any of the media types WHEN initialized THEN hasReadPermissionOnMediaRelatedTypes will be set to false', async () => {
            typePermissionsRestService.hasAllPermissionsForTypes.and.returnValue(
                Promise.resolve({
                    MediaContainer: {
                        read: false,
                        create: true,
                        change: true,
                        remove: true
                    },
                    MediaFormat: {
                        read: true,
                        create: false,
                        change: true,
                        remove: true
                    }
                })
            );

            await component.ngOnInit();

            expect(component.hasReadPermissionOnMediaRelatedTypes).toBe(false);
        });
    });

    describe('onFileSelect', () => {
        const mockFile = {
            name: 'someName'
        } as File;
        it('GIVEN file is selected AND file is valid THEN it sets the image', async () => {
            const files = ([mockFile] as unknown) as FileList;

            fileValidationService.validate.and.returnValue(Promise.resolve());

            await component.onFileSelect(files);

            expect(component.fileValidationErrors).toEqual([]);
            expect(component.image).toEqual({
                file: mockFile,
                format: undefined
            });
        });

        it('GIVEN file is selected AND file is invalid THEN it clears image AND sets validation errors', async () => {
            const files = ([mockFile] as unknown) as FileList;
            const mockError: ErrorContext = {
                message: '',
                subject: 'code'
            };

            fileValidationService.validate.and.callFake((_file, errorsContext) => {
                errorsContext.push(mockError);
                return Promise.reject(errorsContext);
            });

            await component.onFileSelect(files);

            expect(component.image).toBeNull();
            expect(component.fileValidationErrors).toEqual([mockError]);
        });
    });

    it('onImageUploadSuccess WHEN called THEN it sets uploaded file uuid for given media format AND resets the image AND file validation errors', () => {
        component.onFileUploadSuccess('123', MediaFormatType.widescreen);

        expect(component.model[component.lang].medias[MediaFormatType.widescreen]);

        expect(component.fileValidationErrors).toEqual([]);
        expect(component.image).toBeNull();
    });

    it('onMediaContainerCreate WHEN called THEN model of given language is cleared AND container name is set AND medias are reset', () => {
        const name = 'new media container';
        component.onMediaContainerCreate(name);

        expect(component.model[component.lang].qualifier).toBe(name);
        expect(component.model[component.lang].medias).toEqual({});
    });

    it('onMediaContainerRemove WHEN called THEN model is cleared', () => {
        const mediaContainer = component.model[component.lang];

        component.onMediaContainerRemove();

        // properties are removed, object should be the same
        expect(component.model[component.lang]).toBe(mediaContainer);

        expect(component.model[component.lang].catalogVersion).toBeUndefined();
        expect(component.model[component.lang].medias).toBeUndefined();
        expect(component.model[component.lang].qualifier).toBeUndefined();
        expect(component.model[component.lang].mediaContainerUuid).toBeUndefined();
    });
});
