import {GatewayProxied, SeInjectable} from 'smarteditcommons';
import {Personalization} from "personalizationcommons";
import {Customize} from "personalizationcommons";
import {CombinedView} from "personalizationcommons";
import {SeData} from "personalizationcommons";

@GatewayProxied('setPersonalization', 'setCustomize', 'setCombinedView', 'setSeData')
@SeInjectable()
export class PersonalizationsmarteditContextServiceProxy {

	setPersonalization(personalization: Personalization): void {
		'proxyFunction';
		return undefined;
	}

	setCustomize(customize: Customize): void {
		'proxyFunction';
		return undefined;
	}

	setCombinedView(combinedView: CombinedView): void {
		'proxyFunction';
		return undefined;
	}

	setSeData(seData: SeData): void {
		'proxyFunction';
		return undefined;
	}
}
