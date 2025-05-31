import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

interface ContentItem {
  id: string;
  type: 'title' | 'text' | 'image';
  content: string;
}

interface NewsLocal {
  id: string;
  summary: {
    title: string;
    description: string;
    category: string;
    mainImage: string;
  };
  fullContent: ContentItem[];
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
  fullContent: ContentItem[] = [];
  mainImageFileName: string | null = null;

  categories = [
    'Eventos',
    'Exposições',
    'Notícias',
    'Educação',
    'Pesquisa'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
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
    // Editar notícia não implementado para localStorage
  }

  onSubmit(): void {
    if (this.newsForm.valid) {
      const news: NewsLocal = {
        id: Date.now().toString(),
        summary: {
          title: this.newsForm.get('summaryTitle')?.value,
          description: this.newsForm.get('summaryDescription')?.value,
          category: this.newsForm.get('category')?.value,
          mainImage: this.newsForm.get('mainImage')?.value,
        },
        fullContent: this.fullContent
      };
      // Salvar no localStorage
      const newsList = JSON.parse(localStorage.getItem('newsList') || '[]');
      newsList.push(news);
      localStorage.setItem('newsList', JSON.stringify(newsList));
      this.router.navigate(['/news']);
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
      id: Date.now().toString(),
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
        (item as any).fileName = file.name; // Salva o nome do arquivo
      };
      reader.readAsDataURL(file);
    }
  }

  cancel(): void {
    this.router.navigate(['/news']);
  }
} 