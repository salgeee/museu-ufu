import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityService } from '../../services/accessibility.service';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accessibility.component.html',
  styleUrl: './accessibility.component.scss'
})
export class AccessibilityComponent {
  constructor(private accessibilityService: AccessibilityService) {}

  toggleContrast() {
    this.accessibilityService.toggleContrast();
  }

  increaseZoom() {
    this.accessibilityService.increaseZoom();
  }

  decreaseZoom() {
    this.accessibilityService.decreaseZoom();
  }

  resetZoom() {
    this.accessibilityService.resetZoom();
  }
}
