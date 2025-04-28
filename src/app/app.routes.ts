import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
    data: {
      breadCrumb: false,
    }
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página Não Encontrada',
    data: {
      breadCrumb: 'Página Não Encontrada',
    }
  },
  {
    path: 'perfil',
    data: {
      breadCrumb: 'Perfil',
    },
    title: 'Perfil',
    children: [
      {
        path: '',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
      },
      {
        path: 'editar',
        loadComponent: () =>
          import('./features/profile/pages/profile-edit/profile-edit.component').then(m => m.ProfileEditComponent),
        title: 'Editar Perfil',
        data: {
          breadCrumb: 'Editar Perfil',
        },
      },
    ]
  }
  ]
