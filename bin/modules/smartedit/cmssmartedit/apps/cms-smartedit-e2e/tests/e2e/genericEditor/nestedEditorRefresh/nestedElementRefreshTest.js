/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
describe('Generic Editor - Nested Element Refresh', function () {
    var contextualMenu = e2e.componentObjects.componentContextualMenu;
    var storefront = e2e.componentObjects.storefront;
    var perspective = e2e.componentObjects.modeSelector;
    var genericEditor = e2e.componentObjects.genericEditor;
    var backendClient = e2e.mockBackendClient;
    var select = e2e.componentObjects.Select;
    var COMPONENT = 'component1';

    function modifyComponent() {
        return perspective.selectPreviewPerspective().then(function () {
            return browser.switchToIFrame().then(function () {
                return browser.click(element(by.id('addToCart'))).then(function () {
                    return perspective.selectAdvancedPerspective();
                });
            });
        });
    }

    function assertComponentModified() {
        return browser.waitUntil(function () {
            return browser.switchToIFrame().then(function () {
                return element(by.id('feedback'))
                    .getText()
                    .then(function (text) {
                        return !!text;
                    });
            });
        });
    }

    function assertComponentNotModified() {
        return browser.waitUntil(function () {
            return browser.switchToIFrame().then(function () {
                return element(by.id('feedback'))
                    .getText()
                    .then(function (text) {
                        return !text;
                    });
            });
        });
    }

    function openGenericEditor() {
        return storefront.actions.moveToComponent(COMPONENT).then(function () {
            return contextualMenu.actions.clickEditButton(COMPONENT).then(function () {
                return browser.switchToParent();
            });
        });
    }

    function selectFirstDropdownElement() {
        return browser.click(element(by.css('se-dropdown input'))).then(function () {
            browser.click(element(by.css('li[role=option]')));
        });
    }

    function selectNestedDropdownElement(selectorId) {
        return select.actions.toggleSelector(selectorId).then(function () {
            return select.actions.selectOptionByIndex(selectorId, 0);
        });
    }

    function openNestedEditor() {
        return browser.click(element(by.css('.cms-nested-component')));
    }

    let fixtureID0;
    let fixtureID1;

    beforeAll(async function () {
        fixtureID0 = await backendClient.replaceFixture(
            [
                'cmswebservices\\/v1\\/catalogs\\/apparel-ukContentCatalog\\/versions\\/Staged\\/workflows'
            ],
            {
                pagination: {
                    count: 1,
                    page: 0,
                    totalCount: 0,
                    totalPages: 0
                },
                workflows: [
                    {
                        createVersion: false,
                        description: '',
                        isAvailableForCurrentPrincipal: true,
                        status: 'RUNNING',
                        workflowCode: '000001J' + 0
                    }
                ]
            }
        );

        fixtureID1 = await backendClient.modifyFixture(
            [
                'cmssmarteditwebservices\\/v1\\/catalogs\\/apparel-ukContentCatalog\\/versions\\/Staged\\/workfloweditableitems'
            ],
            {
                'editableItems.0.editableByUser': true
            }
        );
    });

    beforeEach(function (done) {
        browser.bootstrap(__dirname);
        browser.waitForWholeAppToBeReady().then(function () {
            return perspective.selectAdvancedPerspective().then(function () {
                done();
            });
        });
    });

    it('Component inner content is modified after clicking the add to cart button', function () {
        modifyComponent().then(function () {
            assertComponentModified();
        });
    });

    it('Component is refreshed after 1st level modification', function () {
        modifyComponent().then(function () {
            return assertComponentModified().then(function () {
                return openGenericEditor().then(function () {
                    return element(by.id('name-shortstring'))
                        .sendKeys('name')
                        .then(function () {
                            return genericEditor.actions.save().then(function () {
                                return assertComponentNotModified();
                            });
                        });
                });
            });
        });
    });

    it('Component is refreshed after 2nd level modification', function () {
        modifyComponent().then(function () {
            return assertComponentModified().then(function () {
                return openGenericEditor().then(function () {
                    return selectFirstDropdownElement().then(function () {
                        return genericEditor.actions.save().then(function () {
                            return modifyComponent().then(function () {
                                return openGenericEditor().then(function () {
                                    return openNestedEditor().then(function () {
                                        return selectNestedDropdownElement('linkTo').then(
                                            function () {
                                                return selectNestedDropdownElement(
                                                    'contentPage'
                                                ).then(function () {
                                                    return genericEditor.actions
                                                        .save()
                                                        .then(function () {
                                                            return genericEditor.actions
                                                                .cancel()
                                                                .then(function () {
                                                                    return assertComponentNotModified();
                                                                });
                                                        });
                                                });
                                            }
                                        );
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    afterAll(function () {
        backendClient.removeFixture(fixtureID0);
        backendClient.removeFixture(fixtureID1);
    });
});
