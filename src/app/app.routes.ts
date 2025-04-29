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
    path: 'games',
    data: {
      breadCrumb: 'Jogos',
    },
    title: 'Jogos',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/games/games.component').then(m => m.GamesComponent),
      },
      {
        path: 'quiz',
        title: 'Quiz',
        loadComponent: () =>
          import('./pages/games/quiz/quiz.component').then(m => m.QuizComponent),
      },
      {
        path: 'puzzles',
        loadComponent: () =>
          import('./pages/games/puzzles/puzzles.component').then(m => m.PuzzlesComponent),
      },
      {
        path: 'logic-challenge',
        loadComponent: () =>
          import('./pages/games/logic-challenge/logic-challenge.component').then(
            m => m.LogicChallengeComponent
          ),
      },
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
    loadComponent: () => import('./pages/news/news.component').then(m => m.NewsComponent),
    title: 'Noticias',
    data: {
      breadCrumb: 'News',
    },
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre nós',
    data: {
      breadCrumb: 'About',
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
