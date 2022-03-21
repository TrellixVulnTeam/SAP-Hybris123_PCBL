import { SeComponentConstructor } from './types';
export declare const SeDecorator: () => <T extends SeComponentConstructor>(componentConstructor: T) => T;
