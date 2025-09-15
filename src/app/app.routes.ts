import { Routes } from '@angular/router';
import {authGuard} from '@core/auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    title: 'Login',
    data: {
      breadCrumb: false,
    }
  },
  {
    path: 'games',
    data: {
      breadCrumb: 'Jogos',
    },
    title: 'Jogos',
    children: [
      {
        data: { breadCrumb: 'Jogos' },
        path: '',
        loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent),
      },
      {
        data: { breadCrumb: 'Quiz' },
        path: 'quiz',
        title: 'Quiz',
        loadComponent: () =>
          import('./pages/games/quiz/quiz.component').then(m => m.QuizComponent),
      },
      {
        data: { breadCrumb: 'Jogo da Memória' },
        path: 'puzzles',
        loadComponent: () =>
          import('./pages/games/puzzles/puzzles.component').then(m => m.PuzzlesComponent),
      },
      {
        data: { breadCrumb: 'Desafio Lógico' },
        path: 'logic-challenge',
        loadComponent: () =>
          import('./pages/games/logic-challenge/logic-challenge.component').then(
            m => m.LogicChallengeComponent
          ),
      },
      {
        data: { breadCrumb: 'Caça Palavras' },
        path: 'word-search',
        loadComponent: () =>
          import('./pages/games/word-search/word-search.component').then(
            m => m.WordSearchComponent
          ),
      }
    ]
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    title: 'Home',
    data: {
      breadCrumb: 'Home',
    },
  },
  {
    path: 'news',
    title: 'Noticias',
    data: {
      breadCrumb: 'Notícias',
    },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent),
      },
      {
        path: 'create',
        loadComponent: () => import('./pages/news/news-form/news-form.component').then(m => m.NewsFormComponent),
        canActivate: [authGuard],
        data: {
          breadCrumb: 'Criar Notícia',
        },
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./pages/news/news-form/news-form.component').then(m => m.NewsFormComponent),
        canActivate: [authGuard],
        data: {
          breadCrumb: 'Editar Notícia',
        },
      },
      {
        path: 'detail/:id',
        loadComponent: () => import('./pages/news/news-detail.component').then(m => m.NewsDetailComponent),
        canActivate: [authGuard],
        data: {
          breadCrumb: 'Detalhe da Notícia',
        },
      },
    ]
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre nós',
    data: {
      breadCrumb: 'Sobre',
    },
  },
  {
    path: 'donations',
    loadComponent: () => import('./pages/donations/donations.component').then(m => m.DonationsComponent),
    title: 'Doações',
    data: {
      breadCrumb: 'Donations',
    },
  },
  {
    path: 'accessibility',
    loadComponent: () => import('./pages/accessibility/accessibility.component').then(m => m.AccessibilityComponent),
    title: 'accessibility',
    data: {
      breadCrumb: 'Acessibilidade',
    },
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'Página Não Encontrada',
    data: {
      breadCrumb: 'Página Não Encontrada',
    }
  },
]
