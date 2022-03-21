/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
/* eslint-disable max-classes-per-file */
import { SeDowngradeService } from 'smarteditcommons';

export class ModeManager {
    constructor(private modes: string[]) {}

    public validateMode(mode: string): boolean {
        if (!this.modes.includes(mode)) {
            throw new Error(
                `ModeManager.validateMode() - mode [${mode}] not in list of supported modes: ${this.modes}`
            );
        }
        return true;
    }
}

@SeDowngradeService()
export class StructureModeManagerFactory {
    public createModeManager(modes: string[]): ModeManager {
        return new ModeManager(modes);
    }
}
