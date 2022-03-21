/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/**
 * Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
 * @module smartutils
 */
import 'jasmine';
import { Alert } from './alert';
import { AlertFactory } from './alert-factory';
import { AlertService } from './alert.service';

describe('alertService', () => {
    let alertService: AlertService;
    let alertFactory: jasmine.SpyObj<AlertFactory>;
    beforeEach(() => {
        alertFactory = jasmine.createSpyObj<AlertFactory>('alertFactory', [
            'createInfo',
            'createAlert',
            'createWarning',
            'createSuccess',
            'createDanger'
        ]);

        alertService = new AlertService(alertFactory);
    });

    describe('all alertService.showXZY() functions', () => {
        // spies
        const message = 'Alert Test';
        let mockAlert: jasmine.SpyObj<Alert>;

        function testShowXYZFunction(
            alertServiceFn: keyof AlertService,
            alertFactoryFn: keyof jasmine.SpyObj<AlertFactory>
        ) {
            // given
            mockAlert = jasmine.createSpyObj('mockAlert', ['show']);
            alertFactory[alertFactoryFn].and.returnValue(mockAlert);

            // when
            alertService[alertServiceFn](message);

            // then
            expect(alertFactory[alertFactoryFn]).toHaveBeenCalledWith(message);
            expect(mockAlert.show).toHaveBeenCalled();
        }

        it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
            testShowXYZFunction('showAlert', 'createAlert');
        });

        it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
            testShowXYZFunction('showInfo', 'createInfo');
        });

        it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
            testShowXYZFunction('showWarning', 'createWarning');
        });

        it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
            testShowXYZFunction('showSuccess', 'createSuccess');
        });

        it('showAlert creates an alert and calls alert.show() before returning the alert', () => {
            testShowXYZFunction('showDanger', 'createDanger');
        });
    });
});
