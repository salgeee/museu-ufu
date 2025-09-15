import { AfterViewInit, Component, ElementRef, inject, signal, Input, OnInit } from '@angular/core';
import { LIST_MENU_BY_ROLE } from './const/list-menu';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Role } from '@app/features/login/models/credentials.model';
import { AuthService } from '@app/core/auth/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IMenu } from './types/menu.type';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import BRMenu from "@govbr-ds/core/dist/components/menu/menu";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuService } from '@app/core/services/menu.service';

/**
 * Componente MenuComponent é responsável por exibir o menu da aplicação.
 * @example
 * <app-menu></app-menu>
 * @public
 * {@link https://www.gov.br/ds/components/menu?tab=desenvolvedor|Documentação oficial}
 */
interface MenuItemState extends IMenu {
	expanded?: boolean;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  host: { class: 'br-menu push px-0' },
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit, OnInit {
  @Input() list: MenuItemState[] = [];
  instance: BRMenu | null = null;
  isMobile = signal<boolean>(false);
  isOpen = false;

  private _brMenu = inject(ElementRef);
  private _authService = inject(AuthService);
  private _breakpointObserver = inject(BreakpointObserver);
  private _menuService = inject(MenuService);

  constructor() {
    this.isOpen = false;
    this._breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Web, Breakpoints.Tablet])
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.isMobile.set(this._breakpointObserver.isMatched(Breakpoints.Handset));
      });

    // --- CORREÇÃO AQUI ---
    // 1. Usar 'currentUser$' em vez de 'credentials$'
    this._authService.currentUser$.pipe(takeUntilDestroyed()).subscribe(user => {
      // 2. Lógica ajustada para usar o objeto 'user' e a propriedade 'is_admin'
      if (!user) {
        // Se não há usuário, mostra o menu público
        this.list = LIST_MENU_BY_ROLE.get(Role.PUBLIC) || [];
      } else {
        // Se há usuário, verifica se é admin para mostrar o menu de admin
        // (Assumindo que você tenha um Role.ADMIN no seu 'list-menu.ts')
        const userRole = user.is_admin ? ('ADMIN' as Role) : Role.PUBLIC;
        this.list = LIST_MENU_BY_ROLE.get(userRole) || [];
      }
    });
    // --- FIM DA CORREÇÃO ---

    this._menuService.isOpen$.subscribe(isOpen => {
      this.isOpen = isOpen;
      if (this.instance) {
        if (isOpen) {
          this.instance.open();
        } else {
          this.instance.close();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.instance = new BRMenu('br-menu', this._brMenu.nativeElement);
      this.instance.init();
      this.instance.close();
    });
  }

  // A lógica do ngOnInit foi removida pois o construtor já define a lista de menu dinamicamente.
  ngOnInit() { }

  closeMenu() {
    this._menuService.close();
  }

  closeMenuIfMobile() {
    if (this.isMobile()) {
      this.closeMenu();
    }
  }

  toggleMenu() {
    this._menuService.toggle();
  }

  toggleSubmenu(item: MenuItemState) {
    item.expanded = !item.expanded;
  }
}
