/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as angular from 'angular';
import { moduleUtils, SMARTEDIT_COMPONENT_NAME, DOMAIN_TOKEN } from 'smarteditcommons';

class BootstrapService {
    bootstrap(): void {
        const smarteditNamespace = (window as any).smartedit;

        // for legacy requires.push
        const modules = (smarteditNamespace.applications || [])
            .map((application: string) => {
                moduleUtils.addModuleToAngularJSApp('legacySmartedit', application);
                return {
                    application,
                    module: moduleUtils.getNgModule(application)
                };
            })
            .filter((data: { application: string; module: NgModule }) => {
                if (!data.module) {
                    console.log(
                        `WARNING: Unable to find @NgModule for application ${data.application}`
                    );
                    console.log('Here is the list of registered @NgModule:');
                    console.log(window.__smartedit__.modules);
                }
                return !!data.module;
            })
            .map((data: { application: string; module: NgModule }) => data.module);

        /* forbiddenNameSpaces angular.module:false */
        angular
            .module('legacySmartedit')
            .constant(DOMAIN_TOKEN, smarteditNamespace.domain)
            .constant('smarteditroot', smarteditNamespace.smarteditroot);

        const constants = {
            [DOMAIN_TOKEN]: smarteditNamespace.domain,
            smarteditroot: smarteditNamespace.smarteditroot
        };

        /*
         * Bootstrap needs a reference ot the module hence cannot be achieved
         * in smarteditbootstrap.js that would then pull dependencies since it is an entry point.
         * We would then duplicate code AND kill overriding capabilities of "plugins"
         */
        document.body.appendChild(document.createElement(SMARTEDIT_COMPONENT_NAME));

        /* forbiddenNameSpaces window._:false */
        platformBrowserDynamic()
            .bootstrapModule((window.__smartedit__ as any).SmarteditFactory({ modules, constants }))
            .then(() => {
                delete (window.__smartedit__ as any).SmarteditFactory;
            })
            .catch((err) => console.log(err));
    }
}
/** @internal */
export const bootstrapService = new BootstrapService();
