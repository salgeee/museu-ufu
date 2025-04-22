import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'initial', pathMatch: 'full' },
  {path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  {path: 'initial', loadChildren: () => import('./pages/initial/initial.module').then(m => m.InitialModule) },
  {path: 'thematic', loadChildren: () => import('./pages/thematic/thematic.module').then(m => m.ThematicModule) },
  {path: 'news', loadChildren: () => import('./pages/news/news.module').then(m => m.NewsModule) },
  {path: 'games', loadChildren: () => import('./pages/games/games.module').then(m => m.GamesModule) },
  {path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) },
];
