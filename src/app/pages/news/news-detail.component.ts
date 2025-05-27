import {Component, inject} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FirestoreNewsService, NewsPost} from '../../../core/services/firestore-news.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent {
  news$: Observable<NewsPost | undefined>; // Alterado para Observable
  private firestoreNewsService = inject(FirestoreNewsService);
  modalImage: string | null = null;

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.news$ = this.firestoreNewsService.getNewsById(id);
    } else {
      // Tratar caso de ID não encontrado, talvez redirecionar
      console.error('ID da notícia não encontrado na rota');
    }
  }

  openImage(img: string) {
    this.modalImage = img;
  }

  closeImage() {
    this.modalImage = null;
  }
}
