import { Injectable, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private _isOpen = signal<boolean>(false);
  isOpen$ = toObservable(this._isOpen);

  get isOpen() {
    return this._isOpen();
  }

  constructor() {
    // Garante que o menu comece fechado
    this.close();
  }

  toggle() {
    this._isOpen.update(value => !value);
  }

  open() {
    this._isOpen.set(true);
  }

  close() {
    this._isOpen.set(false);
  }
} 