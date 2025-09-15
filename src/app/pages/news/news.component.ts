import {Component, OnInit, Inject, inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewsService, News } from 'app/core/services/news.service'
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
  newsList$: Observable<News[]>; // Use a nova interface
  private newsService = inject(NewsService); // Injete o novo serviço
  private router = inject(Router);
  private dialog = inject(MatDialog);

  constructor() {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.newsList$ = this.newsService.getAllNews();
  }

  createNews(): void {
    this.router.navigate(['/news/create']);
  }

  deleteNews(newsItem: News): void {
    if (!newsItem.id) {
      console.error('ID da notícia é indefinido, não é possível deletar');
      return;
    }
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      width: '350px',
      data: { title: newsItem.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // A lógica de deleção agora chama o novo serviço
        this.newsService.deleteNews(newsItem.id.toString()).subscribe({
          next: () => {
            console.log('Notícia deletada com sucesso!');
            this.loadNews(); // Recarrega a lista de notícias
          },
          error: err => console.error('Erro ao deletar notícia:', err)
        });
      }
    });
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
