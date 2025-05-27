import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { FirestoreNewsService, NewsPost } from '../../../../core/services/firestore-news.service';

interface ContentItem {
  id: string;
  type: 'title' | 'text' | 'image';
  content: string;
}


@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    DragDropModule
  ]
})
export class NewsFormComponent implements OnInit {
  newsForm: FormGroup;
  isEditMode = false;
  newsId: string | null = null;
  fullContent: ContentItem[] = [];
  mainImageFileName: string | null = null;

  categories = [
    'Eventos',
    'Exposições',
    'Notícias',
    'Educação',
    'Pesquisa'
  ];

  private firestoreNewsService = inject(FirestoreNewsService);
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.newsForm = this.fb.group({
      // Campos para a versão resumida (box)
      summaryTitle: ['', [Validators.required, Validators.minLength(3)]],
      summaryDescription: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      mainImage: ['', Validators.required],
    });
  }


  ngOnInit(): void {
    // A atribuição aqui está correta, desde que a propriedade esteja declarada
    this.newsId = this.route.snapshot.paramMap.get('id');
    if (this.newsId) {
      this.isEditMode = true;
      this.firestoreNewsService.getNewsById(this.newsId).subscribe(newsData => {
        if (newsData) {
          this.newsForm.patchValue({
            summaryTitle: newsData.summary.title,
            summaryDescription: newsData.summary.description,
            category: newsData.summary.category,
            mainImage: newsData.summary.mainImage
          });
          // Verifique se fullContent existe e é um array antes de mapear
          this.fullContent = (newsData.fullContent && Array.isArray(newsData.fullContent))
            ? newsData.fullContent.map((item, index) => ({
              id: `item-${Date.now()}-${index}`, // Geração de um ID simples para o cliente
              type: item.type,
              content: item.content
            }))
            : [];
          this.mainImageFileName = newsData.summary.mainImage ? 'Imagem Carregada' : null;
        } else {
          console.error('Notícia para edição não encontrada');
          this.router.navigate(['/news']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.newsForm.valid) {
      const formValue = this.newsForm.value;
      const newsData: NewsPost = { // Tipar com a interface NewsPost
        summary: {
          title: formValue.summaryTitle,
          description: formValue.summaryDescription,
          category: formValue.category,
          mainImage: formValue.mainImage, // Idealmente, aqui seria o URL da imagem após upload
        },
        fullContent: this.fullContent.map(item => ({
          type: item.type,
          content: item.content,
        }))
      };

      if (this.isEditMode && this.newsId) { // this.newsId precisa ser populado no ngOnInit se for edição
        this.firestoreNewsService.updateNews(this.newsId, newsData)
          .then(() => {
            console.log('Notícia atualizada com sucesso!');
            this.router.navigate(['/news']);
          })
          .catch(error => console.error('Erro ao atualizar notícia:', error));
      } else {
        this.firestoreNewsService.addNews(newsData)
          .then(() => {
            console.log('Notícia criada com sucesso!');
            this.router.navigate(['/news']);
          })
          .catch(error => console.error('Erro ao criar notícia:', error));
      }
    }
  }

  onMainImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newsForm.patchValue({ mainImage: reader.result as string });
        this.mainImageFileName = file.name;
      };
      reader.readAsDataURL(file);
    }
  }

  addContent(type: 'title' | 'text' | 'image'): void {
    const newItem: ContentItem = {
      id: `new-item-${Date.now()}-${this.fullContent.length}`, // Geração de ID para novo item
      type,
      content: ''
    };
    this.fullContent.push(newItem);
  }

  removeContent(index: number): void {
    this.fullContent.splice(index, 1);
  }

  onContentDrop(event: CdkDragDrop<ContentItem[]>): void {
    moveItemInArray(this.fullContent, event.previousIndex, event.currentIndex);
  }

  onContentChange(item: ContentItem, event: Event): void {
    const input = event.target as HTMLInputElement;
    item.content = input.value;
  }

  onImageUpload(item: ContentItem, event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        item.content = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  cancel(): void {
    this.router.navigate(['/news']);
  }
}
