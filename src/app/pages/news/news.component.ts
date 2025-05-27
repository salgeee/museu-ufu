import {Component, OnInit, Inject, inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FirestoreNewsService, NewsPost } from '../../../core/services/firestore-news.service';
import { Observable } from 'rxjs';

interface NewsLocal {
  id: string;
  summary: {
    title: string;
    description: string;
    category: string;
    mainImage: string;
  };
  fullContent: any[];
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    MatDialogModule
  ]
})
export class NewsComponent implements OnInit {
  newsList$: Observable<NewsPost[]>;
  private firestoreNewsService = inject(FirestoreNewsService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.newsList$ = this.firestoreNewsService.getAllNews();
  }

  createNews(): void {
    this.router.navigate(['/news/create']);
  }

  editNews(news: NewsLocal): void {
    // Edição não implementada para localStorage
    alert('Edição não implementada no modo local!');
  }

  deleteNews(newsItem: NewsPost): void {
    if (!newsItem.id) {
      console.error('News item ID is undefined, cannot delete');
      return;
    }

    this.firestoreNewsService.deleteNews(newsItem.id)
      .then(() => {
        console.log('Notícia deletada com sucesso!');

      })
      .catch(error => console.error('Erro ao deletar notícia:', error));
  }
}

@Component({
  selector: 'delete-confirm-dialog',
  template: `
    <h2 mat-dialog-title>Confirmar exclusão</h2>
    <mat-dialog-content>
      <p>Tem certeza que deseja excluir a notícia "{{data.title}}"?</p>
      <p>Esta ação não poderá ser desfeita.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button mat-button color="warn" (click)="onYesClick()">Excluir</button>
    </mat-dialog-actions>
  `,
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class DeleteConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string}
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
