import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { NewsFormComponent } from './news-form/news-form.component';
import { NewsDetailComponent } from './news-detail.component';

const routes: Routes = [
  {
    path: '',
    component: NewsComponent
  },
  {
    path: 'create',
    component: NewsFormComponent
  },
  {
    path: 'edit/:id',
    component: NewsFormComponent
  },
  {
    path: 'detail/:id',
    component: NewsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
