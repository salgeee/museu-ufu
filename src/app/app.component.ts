import {Component, inject, OnInit, signal} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {
  AlertComponent,
  LoadingComponent,
} from 'govbr-ds-angular';
import {HeaderComponent} from './shared/components/header/header.component';
import {MenuComponent} from './shared/components/menu/menu.component';
import {FooterComponent} from './shared/components/footer/footer.component';
import {BreadcrumbComponent} from './shared/components/breadcrump/breadcrumb.component';
import {NgClass} from '@angular/common';
import {AuthService } from './core/auth/services/auth.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {CheckUpdateService} from './core/update/check-update.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    BreadcrumbComponent,
    AlertComponent,
    LoadingComponent,
    NgClass,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  isMobile = signal<boolean>(false);
  hideNavbar = signal<boolean>(true);

  authService = inject(AuthService);
  breakpointObserver = inject(BreakpointObserver);
  router = inject(Router);
  checkUpdateService = inject(CheckUpdateService);

  isPublic = this.authService.isPublic;

  constructor() {
    this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Web, Breakpoints.Tablet]).subscribe(() => {
      this.isMobile.set(this.breakpointObserver.isMatched(Breakpoints.Handset));
    });

    this.router.events.subscribe(data => {
      if (data instanceof NavigationEnd) {
        this.validateUrl(data.url);
      }
    });
  }

  ngOnInit(): void {
    this.checkUpdateService.init();
  }

  private validateUrl(url: string) {
    if (url.startsWith('/login')) {
      this.hideNavbar.set(true);
    } else {
      this.hideNavbar.set(false);
    }
  }
}
