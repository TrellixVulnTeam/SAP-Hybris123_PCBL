import * as angular from 'angular';
import { SeConstructor } from '../../di';
import { IModalConfig } from './IModalConfig';
import { ModalManager } from './ModalManager';
export interface ModalControllerScope extends angular.IScope {
    modalController: IModalController;
    [name: string]: any;
}
export interface IModalController extends angular.IController {
    _modalManager: ModalManager;
    templateUrl: string;
    templateInline: string;
    init(): void;
    close(data?: any): void;
    dismiss(data?: any): void;
    _getModalType(): string;
}
export declare function modalControllerClassFactory(conf: IModalConfig): SeConstructor<IModalController>;
