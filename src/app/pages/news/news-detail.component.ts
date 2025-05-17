import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-detail.component.html',
  styleUrl: './news-detail.component.scss'
})
export class NewsDetailComponent {
  news: any;
  modalImage: string | null = null;

  constructor(private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    const newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
    this.news = newsList.find((n: any) => n.id === id);
    console.log('ID da rota:', id);
    console.log('Lista de notícias:', newsList);
    console.log('Notícia encontrada:', this.news);
  }

  openImage(img: string) {
    this.modalImage = img;
  }

  closeImage() {
    this.modalImage = null;
  }
}
