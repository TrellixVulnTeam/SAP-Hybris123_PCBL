import * as angular from 'angular';
import {SeModule} from 'smarteditcommons';
import {PersonalizationpromotionssmarteditPromotionsModule} from './management/commerceCustomizationView/PersonalizationpromotionssmarteditPromotionsModule';
import '../../styling/style.less';

@SeModule({
	imports: [
		'personalizationpromotionssmarteditContainerTemplates',
		'yjqueryModule',
		PersonalizationpromotionssmarteditPromotionsModule
	],
	config: ($logProvider: angular.ILogProvider) => {
		'ngInject';
		$logProvider.debugEnabled(false);
	},
	initialize: (
		yjQuery: any,
		domain: any
	) => {
		'ngInject';
		// const loadCSS = (href: string) => {
		// 	const cssLink = yjQuery("<link rel='stylesheet' type='text/css' href='" + href + "'>");
		// 	yjQuery("head").append(cssLink);
		// };
		// loadCSS(domain + "/personalizationpromotionssmartedit/css/style.css");
	}
})
export class PersonalizationpromotionssmarteditContainer {}
