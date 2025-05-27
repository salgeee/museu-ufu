import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  newsList: NewsLocal[] = [];

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
  }

  createNews(): void {
    this.router.navigate(['/news/create']);
  }

  editNews(news: NewsLocal): void {
    // Edição não implementada para localStorage
    alert('Edição não implementada no modo local!');
  }

  deleteNews(news: NewsLocal): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialog, {
      width: '400px',
      data: { title: news.summary.title }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        const filtered = this.newsList.filter(n => n.id !== news.id);
        localStorage.setItem('newsList', JSON.stringify(filtered));
        this.loadNews();
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
