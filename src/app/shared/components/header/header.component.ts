import { ChangeDetectionStrategy, Component, inject, input, HostListener } from '@angular/core';
import { AuthService, User } from '@app/core/auth/services/auth.service'; // Importe a interface User
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuService } from '@app/core/services/menu.service';
import { BarraBrasilComponent } from '../barra-brasil/barra-brasil.component';
import { RouterLink } from '@angular/router';
import { AccessibilityService } from '@app/services/accessibility.service';
import { NgIf, AsyncPipe, NgOptimizedImage } from '@angular/common'; // Importe NgIf e AsyncPipe
import { Observable } from 'rxjs'; // Importe Observable

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CdkMenuModule, BarraBrasilComponent, RouterLink, NgOptimizedImage, NgIf, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  hideNavbar = input<boolean>(false);
  authService = inject(AuthService);

  // CORREÇÃO: A propriedade 'user' agora é um Observable
  user$: Observable<User | null>;

  private _menuService = inject(MenuService);
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 40;
  }

  constructor(private accessibilityService: AccessibilityService) {
    // Atribua o observable do serviço à propriedade do componente
    this.user$ = this.authService.currentUser$;
  }

  toggleMenu(): void {
    this._menuService.toggle();
  }

  logout() {
    this.authService.logout();
  }

  // ... outros métodos de acessibilidade
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
