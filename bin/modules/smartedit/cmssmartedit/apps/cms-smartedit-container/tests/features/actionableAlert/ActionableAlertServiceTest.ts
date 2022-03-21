/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { ACTIONABLE_ALERT_CONSTANTS } from 'cmscommons';
import {
    ActionableAlertService,
    AlertContent
} from 'cmssmarteditcontainer/services/actionableAlert';
import { IAlertConfig, IAlertService } from 'smarteditcommons';

describe('ActionableAlertService', () => {
    let actionableAlertService: ActionableAlertService;
    let alertService: jasmine.SpyObj<IAlertService>;

    const mockController = jasmine.createSpy();

    const MOCK_PAYLOAD_DEFAULT = ({
        controller: mockController,
        description: 'mocked_description_i18n',
        hyperlinkLabel: 'mocked_hyperlinkLabel_i18n'
    } as unknown) as AlertContent;

    class mockComponent {}

    const MOCK_NEW_PAYLOAD = {
        component: mockComponent,
        data: { message: 'mocked message' }
    } as IAlertConfig;

    beforeEach(() => {
        alertService = jasmine.createSpyObj<IAlertService>('alertService', [
            'showInfo',
            'showSuccess'
        ]);

        actionableAlertService = new ActionableAlertService(alertService);
    });

    describe('displayActionableAlertAngularJS', () => {
        it("get the custom content template displayed in an 'info' alert by default", () => {
            // Act
            actionableAlertService.displayActionableAlertAngularJS(MOCK_PAYLOAD_DEFAULT);

            // Assert
            expect(alertService.showInfo).toHaveBeenCalledWith({
                closeable: true,
                controller: mockController,
                template:
                    "<div><p>{{ $alertInjectedCtrl.description | translate: $alertInjectedCtrl.descriptionDetails }}</p><div><a data-ng-click='alert.hide(); $alertInjectedCtrl.onClick();'>{{ $alertInjectedCtrl.hyperlinkLabel | translate: $alertInjectedCtrl.hyperlinkDetails }}</a></div></div>",
                timeout: 20000
            });
        });

        it('WHEN displayActionableAlertAngularJS is called with an invalid alert type THEN the alert is displayed as info', () => {
            // Given
            const invalidAlertType = 'Something invalid';

            // Act
            actionableAlertService.displayActionableAlertAngularJS(
                MOCK_PAYLOAD_DEFAULT,
                // cast to any for test purpose
                invalidAlertType as any
            );

            // Assert
            expect(alertService.showInfo).toHaveBeenCalledWith({
                closeable: true,
                controller: mockController,
                template:
                    "<div><p>{{ $alertInjectedCtrl.description | translate: $alertInjectedCtrl.descriptionDetails }}</p><div><a data-ng-click='alert.hide(); $alertInjectedCtrl.onClick();'>{{ $alertInjectedCtrl.hyperlinkLabel | translate: $alertInjectedCtrl.hyperlinkDetails }}</a></div></div>",
                timeout: 20000
            });
        });

        it('WHEN displayActionableAlertAngularJS is called with a valid alert type (success) THEN the alert is displayed as success', () => {
            // Given
            const validAlertType = 'SUCCESS';

            // Act
            actionableAlertService.displayActionableAlertAngularJS(
                MOCK_PAYLOAD_DEFAULT,
                validAlertType
            );

            // Assert
            expect(alertService.showSuccess).toHaveBeenCalledWith({
                closeable: true,
                controller: mockController,
                template:
                    "<div><p>{{ $alertInjectedCtrl.description | translate: $alertInjectedCtrl.descriptionDetails }}</p><div><a data-ng-click='alert.hide(); $alertInjectedCtrl.onClick();'>{{ $alertInjectedCtrl.hyperlinkLabel | translate: $alertInjectedCtrl.hyperlinkDetails }}</a></div></div>",
                timeout: 20000
            });
        });
    });

    describe('displayActionableAlert', () => {
        it("use given component in an 'info' alert by default", () => {
            // Act
            actionableAlertService.displayActionableAlert(MOCK_NEW_PAYLOAD);

            // Assert
            expect(alertService.showInfo).toHaveBeenCalledWith({
                component: mockComponent,
                data: { message: 'mocked message' }
            });
        });

        it('WHEN displayActionableAlert is called with an invalid alert type THEN the alert is displayed as info', () => {
            // Given
            const invalidAlertType = 'Something invalid';

            // Act
            actionableAlertService.displayActionableAlert(
                MOCK_NEW_PAYLOAD,
                // cast to any for test purpose
                invalidAlertType as any
            );

            // Assert
            expect(alertService.showInfo).toHaveBeenCalledWith({
                component: mockComponent,
                data: { message: 'mocked message' }
            });
        });

        it('WHEN displayActionableAlert is called with a valid alert type (success) THEN the alert is displayed as Success', () => {
            // Act
            actionableAlertService.displayActionableAlert(
                MOCK_NEW_PAYLOAD,
                ACTIONABLE_ALERT_CONSTANTS.ALERT_TYPES.SUCCESS
            );

            // Assert
            expect(alertService.showSuccess).toHaveBeenCalledWith({
                component: mockComponent,
                data: { message: 'mocked message' }
            });
        });
    });
});
