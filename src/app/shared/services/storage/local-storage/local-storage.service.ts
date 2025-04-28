import { Injectable } from '@angular/core';
import { StorageBase } from '../storage-base';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService extends StorageBase {
	override ourStorage = localStorage;
}
