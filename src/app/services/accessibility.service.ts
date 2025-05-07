import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  private contrastMode = new BehaviorSubject<boolean>(false);
  private currentZoom = new BehaviorSubject<number>(100);

  contrastMode$ = this.contrastMode.asObservable();
  currentZoom$ = this.currentZoom.asObservable();

  constructor() {
    // Initialize keyboard shortcuts
    this.initializeKeyboardShortcuts();
  }

  private initializeKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
      if (event.altKey) {
        switch (event.key) {
          case '1':
            this.scrollToElement('main-menu');
            break;
          case '2':
            this.scrollToElement('search');
            break;
          case '3':
            this.scrollToElement('main-content');
            break;
          case '4':
            this.scrollToElement('footer');
            break;
        }
      }
    });
  }

  private scrollToElement(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      element.focus();
    }
  }

  toggleContrast() {
    this.contrastMode.next(!this.contrastMode.value);
    document.body.classList.toggle('high-contrast');
  }

  increaseZoom() {
    const newZoom = this.currentZoom.value + 10;
    this.setZoom(newZoom);
  }

  decreaseZoom() {
    const newZoom = this.currentZoom.value - 10;
    this.setZoom(newZoom);
  }

  resetZoom() {
    this.setZoom(100);
  }

  private setZoom(zoom: number) {
    // Limit zoom between 50% and 200%
    const limitedZoom = Math.min(Math.max(zoom, 50), 200);
    this.currentZoom.next(limitedZoom);
    document.body.style.zoom = `${limitedZoom}%`;
  }
} 