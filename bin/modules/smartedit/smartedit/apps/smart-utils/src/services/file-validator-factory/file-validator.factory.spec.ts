/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { FileValidator, FileValidatorFactory } from './file-validator.factory';

describe('FileValidatorFactory', () => {
    const VALIDATORS = [
        {
            subject: 'someSubject',
            message: 'someMessage',
            validate(val) {
                return !!val;
            }
        }
    ];

    let validator: FileValidator;
    beforeEach(() => {
        validator = new FileValidatorFactory().build(VALIDATORS);
    });

    describe('build', () => {
        it('should return a validator with a validate function', () => {
            expect(validator).toEqual({
                validate: jasmine.any(Function)
            });
        });
    });

    describe('a build validator', () => {
        it('should return true if all validators pass', () => {
            expect(
                validator.validate({
                    someSubject: 'valid'
                })
            ).toBe(true);
        });

        it('should leave the errors context unaltered if it is provided and all validators pass', () => {
            const errorsContext = [];
            expect(
                validator.validate(
                    {
                        someSubject: 'valid'
                    },
                    errorsContext
                )
            ).toBe(true);
            expect(errorsContext).toEqual([]);
        });

        it('should return false if any validator fails', () => {
            expect(validator.validate({})).toBe(false);
        });

        it('should append to the errors context a message and subject if one is provided and any validator fails', () => {
            const errorsContext = [];
            expect(validator.validate({}, errorsContext)).toBe(false);
            expect(errorsContext).toEqual([
                {
                    subject: 'someSubject',
                    message: 'someMessage'
                }
            ]);
        });
    });
});
