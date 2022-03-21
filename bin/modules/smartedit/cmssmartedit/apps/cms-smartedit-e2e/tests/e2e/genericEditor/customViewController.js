/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* jshint unused:false, undef:false */
angular
    .module('customViewModule', [
        'templateCacheDecoratorModule',
        'cmssmarteditContainerTemplates',
        'ySelectModule',
        'genericEditorModule',
        'smarteditServicesModule'
    ])
    .controller('customViewController', function (CONTEXT_SITE_ID, genericEditorModalService) {
        this.thesmarteditComponentType = 'TypeWithMedia';
        this.thesmarteditComponentId = 'componentWithMedia';

        this.typeWithMediaContainer = 'TypeWithMediaContainer';
        this.componentWithMediaContainer = 'componentWithMediaContainer';

        this.componentToValidateId = 'componentToValidateId';
        this.componentToValidateType = 'componentToValidateType';

        this.navigationComponent = 'navigationComponent';
        this.navigationComponentType = 'NavigationComponentType';

        this.structureApi = 'cmswebservices/v1/types/:smarteditComponentType';
        this.displaySubmit = true;
        this.displayCancel = true;

        this.structureForBasic = [
            {
                cmsStructureType: 'ShortString',
                qualifier: 'name',
                i18nKey: 'type.Item.name.name'
            },
            {
                cmsStructureType: 'Date',
                qualifier: 'creationtime',
                i18nKey: 'type.AbstractItem.creationtime.name',
                editable: false
            },
            {
                cmsStructureType: 'Date',
                qualifier: 'modifiedtime',
                i18nKey: 'type.AbstractItem.modifiedtime.name',
                editable: false
            }
        ];

        this.structureForVisibility = [
            {
                cmsStructureType: 'Boolean',
                qualifier: 'visible',
                i18nKey: 'type.AbstractCMSComponent.visible.name'
            }
        ];

        this.structureForAdmin = [
            {
                cmsStructureType: 'ShortString',
                qualifier: 'uid',
                i18nKey: 'type.Item.uid.name'
            },
            {
                cmsStructureType: 'ShortString',
                qualifier: 'pk',
                i18nKey: 'type.AbstractItem.pk.name',
                editable: false
            }
        ];

        this.contentApi = '/cmswebservices/v1/sites/' + CONTEXT_SITE_ID + '/cmsitems';

        this.content = {
            cloneComponent: false
        };

        this.openCMSLinkComponentEditor = function () {
            var payload = {
                componentId: 'cmsLinkComponentId',
                componentUuid: 'cmsLinkComponentId',
                componentType: 'CMSLinkComponent',
                title: 'type.CMSLinkComponent.name'
            };
            return genericEditorModalService.open(payload);
        };
    });
angular.module('smarteditcontainer').requires.push('customViewModule');
