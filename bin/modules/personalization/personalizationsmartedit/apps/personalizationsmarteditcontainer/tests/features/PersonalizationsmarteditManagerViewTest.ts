import 'jasmine';
import {promiseHelper} from "testhelpers";
import {PersonalizationsmarteditManagerView} from 'personalizationsmarteditcontainer/management/managerView/PersonalizationsmarteditManagerViewService';


describe('PersonalizationsmarteditManagerView', () => {

	const $q = promiseHelper.$q();
	let modalService: jasmine.SpyObj<any>;
	let personalizationsmarteditManagerView: PersonalizationsmarteditManagerView;

	// === SETUP ===
	beforeEach(() => {
		modalService = jasmine.createSpyObj('modalService', ['open']);
		modalService.open.and.callFake(() => {
			const deferred = $q.defer();
			deferred.resolve();
			return deferred.promise;
		});

		personalizationsmarteditManagerView = new PersonalizationsmarteditManagerView(
			modalService
		);

	});

	describe('openManagerAction', () => {

		it('should be defined', () => {
			expect(personalizationsmarteditManagerView.openManagerAction).toBeDefined();
		});

		it('after called it is calling proper services', () => {
			personalizationsmarteditManagerView.openManagerAction(undefined,undefined);
			//TODO: private modalService, use any to fix temporarily
			expect((personalizationsmarteditManagerView as any).modalService.open).toHaveBeenCalled();
		});

	});

});
