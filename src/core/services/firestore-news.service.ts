import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface NewsPost {
  id?: string; // O ID será gerado pelo Firestore
  summary: {
    title: string;
    description: string;
    category: string;
    mainImage: string; // Considere armazenar a imagem no Firebase Storage e aqui o URL
  };
  fullContent: Array<{ type: 'title' | 'text' | 'image'; content: string }>;
  createdAt?: Date; // Adicionar um timestamp
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreNewsService {
  private firestore: Firestore = inject(Firestore);
  private newsCollection = collection(this.firestore, 'news'); // 'news' é o nome da sua coleção no Firestore

  constructor() { }

  // Obter todas as notícias
  getAllNews(): Observable<NewsPost[]> {
    return collectionData(this.newsCollection, { idField: 'id' }) as Observable<NewsPost[]>;
  }

  // Obter uma notícia específica pelo ID
  getNewsById(id: string): Observable<NewsPost | undefined> {
    const newsDocRef = doc(this.firestore, `news/${id}`);
    return docData(newsDocRef, { idField: 'id' }) as Observable<NewsPost | undefined>;
  }

  // Adicionar uma nova notícia
  addNews(news: NewsPost): Promise<any> {
    const newsWithTimestamp = { ...news, createdAt: new Date() };
    return addDoc(this.newsCollection, newsWithTimestamp);
  }

  // Atualizar uma notícia existente
  updateNews(id: string, news: Partial<NewsPost>): Promise<void> {
    const newsDocRef = doc(this.firestore, `news/${id}`);
    return updateDoc(newsDocRef, news);
  }

  // Deletar uma notícia
  deleteNews(id: string): Promise<void> {
    const newsDocRef = doc(this.firestore, `news/${id}`);
    return deleteDoc(newsDocRef);
  }
}
