import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// 1. Interface alinhada com a API (schemas/news.py)
// Note como a estrutura agora é "plana" e corresponde aos campos do seu backend
export interface News {
  id: number;
  title: string;
  content: string;
  summary?: string;
  category?: string;
  image_url?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at?: string;
  author_id: number;
}

// Interface para criar uma nova notícia (sem id, created_at, etc.)
export interface NewsCreate {
  title: string;
  content: string;
  summary?: string;
  category?: string;
  image_url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewsService { // O nome foi alterado para refletir a nova fonte de dados
  private http = inject(HttpClient);

  // 2. URL base da sua API de notícias
  private apiUrl = 'http://localhost:8000/api/v1/news';

  constructor() { }

  // 3. Obter todas as notícias (GET /news)
  // Substitui o `getAllNews` do Firestore
  getAllNews(): Observable<News[]> {
    // Adicionamos o parâmetro para buscar todas, não apenas as publicadas
    return this.http.get<News[]>(`${this.apiUrl}?published_only=false`);
  }

  // 4. Obter uma notícia específica pelo ID (GET /news/{id})
  // Substitui o `getNewsById`
  getNewsById(id: string): Observable<News> {
    return this.http.get<News>(`${this.apiUrl}/${id}`);
  }

  // 5. Adicionar uma nova notícia (POST /news)
  // Substitui o `addNews`. Note que agora retorna um Observable.
  // As operações de escrita (POST, PUT, DELETE) vão precisar do token de autenticação.
  addNews(news: NewsCreate): Observable<News> {
    return this.http.post<News>(this.apiUrl, news);
  }

  // 6. Atualizar uma notícia (PUT /news/{id})
  // Substitui o `updateNews`
  updateNews(id: string, news: Partial<News>): Observable<News> {
    return this.http.put<News>(`${this.apiUrl}/${id}`, news);
  }

  // 7. Deletar uma notícia (DELETE /news/{id})
  // Substitui o `deleteNews`
  deleteNews(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
