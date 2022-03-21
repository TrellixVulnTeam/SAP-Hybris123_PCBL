import './ConfigurationModalComponent.scss';
import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FundamentalModalManagerService, IConfirmationModalService } from 'smarteditcommons';
import { ConfigurationItem } from '../../services/bootstrap/Configuration';
import { ConfigurationService } from '../../services/ConfigurationService';
export declare class ConfigurationModalComponent implements OnInit {
    editor: ConfigurationService;
    modalManager: FundamentalModalManagerService;
    private confirmationModalService;
    form: NgForm;
    constructor(editor: ConfigurationService, modalManager: FundamentalModalManagerService, confirmationModalService: IConfirmationModalService);
    ngOnInit(): void;
    trackByFn(_: number, item: ConfigurationItem): string;
    private onCancel;
    private onSave;
}
