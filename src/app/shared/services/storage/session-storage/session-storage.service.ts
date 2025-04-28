import { Injectable } from '@angular/core';
import { StorageBase } from '../storage-base';

@Injectable({
	providedIn: 'root',
})
export class SessionStorageService extends StorageBase {
	override ourStorage = sessionStorage;
}
