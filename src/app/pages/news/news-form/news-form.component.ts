import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { NewsService, News, NewsCreate }  from 'app/core/services/news.service'


@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // FormsModule foi removido pois não é mais necessário com a simplificação
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    // DragDropModule foi removido
  ]
})
export class NewsFormComponent implements OnInit {
  newsForm: FormGroup;
  isEditMode = false;
  newsId: string | null = null;
  mainImageFileName: string | null = null;

  categories = [
    'Eventos',
    'Exposições',
    'Notícias',
    'Educação',
    'Pesquisa'
  ];

  // 2. Injetar o novo NewsService
  private newsService = inject(NewsService);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    // 3. Simplificar o formulário para corresponder à API
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      summary: ['', [Validators.required, Validators.minLength(10)]],
      content: ['', [Validators.required, Validators.minLength(20)]], // Campo para o conteúdo principal
      category: ['', Validators.required],
      image_url: [''], // Campo para a imagem
    });
  }

  ngOnInit(): void {
    this.newsId = this.route.snapshot.paramMap.get('id');
    if (this.newsId) {
      this.isEditMode = true;
      // 4. Usar o newsService para buscar os dados da notícia
      this.newsService.getNewsById(this.newsId).subscribe(newsData => {
        if (newsData) {
          // 5. Preencher o formulário com a estrutura da API
          this.newsForm.patchValue({
            title: newsData.title,
            summary: newsData.summary,
            content: newsData.content,
            category: newsData.category,
            image_url: newsData.image_url
          });
          this.mainImageFileName = newsData.image_url ? 'Imagem Carregada' : null;
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

      // 6. Montar o objeto de dados para enviar para a API
      const newsData: NewsCreate = {
        title: formValue.title,
        summary: formValue.summary,
        content: formValue.content,
        category: formValue.category,
        image_url: formValue.image_url,
      };

      if (this.isEditMode && this.newsId) {
        // 7. Chamar updateNews e usar .subscribe()
        this.newsService.updateNews(this.newsId, newsData)
          .subscribe({
            next: () => {
              console.log('Notícia atualizada com sucesso!');
              this.router.navigate(['/news']);
            },
            error: err => console.error('Erro ao atualizar notícia:', err)
          });
      } else {
        // 8. Chamar addNews e usar .subscribe()
        this.newsService.addNews(newsData)
          .subscribe({
            next: () => {
              console.log('Notícia criada com sucesso!');
              this.router.navigate(['/news']);
            },
            error: err => console.error('Erro ao criar notícia:', err)
          });
      }
    }
  }

  onMainImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Validações podem ser mantidas como estão
        // ...

        this.newsForm.patchValue({ image_url: base64String });
        this.mainImageFileName = file.name;
      };
      reader.readAsDataURL(file);
    }
  }

  cancel(): void {
    this.router.navigate(['/news']);
  }
}
