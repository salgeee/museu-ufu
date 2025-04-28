export abstract class StorageBase {
	protected ourStorage!: Storage;

	constructor() {}

	/**
	 * It takes a key and a value, and then it sets the value in the storage
	 * @param {string} key - The key to store the value under.
	 * @param {unknown} value - The value to store.
	 */
	setItem(key: string, value: unknown): void {
		if (typeof value == 'string') {
			this.ourStorage.setItem(key, value);
		} else {
			this.ourStorage.setItem(key, JSON.stringify(value));
		}
	}

	/**
	 * The function getItem() takes a string as an argument and returns a string or null
	 * @param {string} key - The key of the item you want to get.
	 * @returns The value of the key in the storage.
	 */
	getItem(key: string): string | null {
		return this.ourStorage.getItem(key);
	}

	/**
	 * It gets an item from localStorage, parses it, and returns it
	 * @param {string} key - The key of the item to get.
	 * @returns The value of the key in the localStorage.
	 */
	getParseItem<T = unknown>(key: string): T | null {
		const data = this.getItem(key);

		if (data) {
			return JSON.parse(data) as T;
		}
		return null;
	}

	/**
	 * It removes an item from the local storage
	 * @param {string} key - The key of the item you want to remove.
	 */
	removeItem(key: string): void {
		this.ourStorage.removeItem(key);
	}

	/**
	 * It returns true if the key exists in ourStorage, and false if it doesn't
	 * @param {string} key - The key of the item you want to check for.
	 * @returns A boolean value.
	 */
	hasItem(key: string): boolean {
		return this.ourStorage.hasOwnProperty(key);
	}

	/**
	 * It clears the local storage.
	 */
	clear(): void {
		this.ourStorage.clear();
	}
}
