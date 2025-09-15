import { Component, inject, OnInit } from '@angular/core'; // 1. OnInit precisa ser importado
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatIconButton } from '@angular/material/button';

import { NewsService, News } from 'app/core/services/news.service'

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    MatIconButton
  ],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent implements OnInit { // A promessa de implementar OnInit
  news$: Observable<News | undefined>;

  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute); // Injetar a rota é mais comum aqui

  showImageModal = false;
  modalImageUrl: string | null = null;

  constructor() { } // O construtor agora pode ficar vazio

  // 2. AQUI ESTÁ A FUNÇÃO QUE FALTAVA
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.news$ = this.newsService.getNewsById(id);
    } else {
      console.error('ID da notícia não encontrado na rota');
    }
  }

  // Métodos do modal permanecem os mesmos
  openImageModal(imageUrl: string): void {
    this.modalImageUrl = imageUrl;
    this.showImageModal = true;
  }

  closeImageModal(): void {
    this.showImageModal = false;
    this.modalImageUrl = null;
  }

  onModalBackgroundClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('image-modal-overlay')) {
      this.closeImageModal();
    }
  }


}
