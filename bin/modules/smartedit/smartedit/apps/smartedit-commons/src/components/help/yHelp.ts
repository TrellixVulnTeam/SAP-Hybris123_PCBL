/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 */
import { SeComponent } from '../../di';

/**
 * **Deprecated since 2005, use {@link HelpComponent}.**
 */
@SeComponent({
    selector: 'y-help',
    templateUrl: 'yHelpTemplate.html',
    inputs: ['title', 'template', 'templateUrl']
})
export class YHelpComponent {
    public template: string;
    public templateUrl: string;
    public title: string;

    $onChanges(changes: { template: string }): void {
        if (this.template && changes.template) {
            this.template = '<div>' + this.template + '</div>';
        }
    }
}
