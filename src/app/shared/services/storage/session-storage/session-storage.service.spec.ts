import { SessionStorageService } from '@shared/services/storage';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

describe('SessionStorageService', () => {
	let spectator: SpectatorService<SessionStorageService>;
	const createService = createServiceFactory(SessionStorageService);
	let store: {
		[key: string]: string | null;
	} = {};

	beforeEach(() => {
		// Service Mock
		spectator = createService();

		// LocalStorage Mock
		Storage.prototype['getItem'] = jest.fn((key: string) => store[key]);
		Storage.prototype['setItem'] = jest.fn((key: string, value: string) => {
			store[key] = value;
		});
		Storage.prototype['clear'] = jest.fn(() => {
			store = {};
		});
		Storage.prototype['removeItem'] = jest.fn((key: string) => {
			delete store[key];
		});
		Storage.prototype['hasOwnProperty'] = jest.fn((key: string) => store.hasOwnProperty(key));
	});

	it('sessionStorage - fetch value with getItem method', () => {
		spectator.service.ourStorage.setItem('teste', 'getItem');
		expect(spectator.service.getItem('teste')).toEqual('getItem');
		expect(spectator.service.ourStorage.getItem).toHaveBeenCalled();
	});

	it('sessionStorage - should set on ourStorage with setItem method - object', () => {
		spectator.service.setItem('teste', { teste: '123' });
		const getItemValue = JSON.parse(spectator.service.getItem('teste') || '');
		expect(getItemValue).toEqual({ teste: '123' });
		expect(spectator.service.ourStorage.setItem).toHaveBeenCalled();
	});

	it('sessionStorage - should set on ourStorage with setItem method - string', () => {
		spectator.service.setItem('teste', 'string');
		expect(spectator.service.getItem('teste')).toEqual('string');
	});

	it('sessionStorage - fetch value with the getParseItem method', () => {
		spectator.service.setItem('teste', { teste: '123' });
		expect(spectator.service.getParseItem('teste')).toEqual({ teste: '123' });
		expect(spectator.service.ourStorage.getItem).toHaveBeenCalled();
	});

	it('sessionStorage - looking for key that there is no storage', () => {
		spectator.service.setItem('teste', { teste: '123' });
		expect(spectator.service.getParseItem('testeNull')).toEqual(null);
	});

	it('sessionStorage - remove an item from storage', () => {
		spectator.service.setItem('teste', { teste: '123' });
		expect(spectator.service.hasItem('teste')).toBeTruthy();

		spectator.service.removeItem('teste');
		expect(spectator.service.hasItem('teste')).toBeFalsy();
		expect(spectator.service.ourStorage.removeItem).toHaveBeenCalled();
	});

	it('sessionStorage - remove all item from storage', () => {
		spectator.service.setItem('teste', { teste: '123' });
		spectator.service.setItem('teste1', { teste: '1234' });
		expect(spectator.service.hasItem('teste')).toBeTruthy();
		expect(spectator.service.hasItem('teste1')).toBeTruthy();

		spectator.service.clear();
		expect(spectator.service.hasItem('teste')).toBeFalsy();
		expect(spectator.service.hasItem('teste1')).toBeFalsy();
		expect(spectator.service.ourStorage.clear).toHaveBeenCalled();
	});
});
