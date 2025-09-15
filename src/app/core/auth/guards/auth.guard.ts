import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se o usuário estiver autenticado (tiver token), permite o acesso
  if (authService.hasToken()) {
    return true;
  }

  // Se não estiver autenticado, redireciona para a página de login
  router.navigate(['/login']);
  return false;
};
