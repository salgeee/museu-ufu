import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class DonationsComponent {
  donationForm: FormGroup;
  isSubmitting = false;
  submittedSuccessfully: boolean | null = null;

  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private snackBar = inject(MatSnackBar);

  private googleFormActionUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeklocHRYm0SB6lcQ6nkOiVL1exF1jqxVWTW7jo4pFtTHi9Ug/formResponse';

  constructor() {
    this.donationForm = this.fb.group({
      // Mapeamento CORRETO dos entry.IDs:
      'emailAddress': ['', [Validators.required, Validators.email]], // E-mail
      'entry.200677914': ['', Validators.required], // Nome do Doador
      'entry.2124359309': ['', Validators.required], // Telefone para contato (opcional)
      'entry.513552808': ['', Validators.required]  // Descrição do Objeto
    });
  }

  onSubmit() {
    if (this.donationForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;
    this.submittedSuccessfully = null;

    const formData = this.donationForm.value;
    let body = new HttpParams();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        body = body.set(key, formData[key]);
      }
    }
    body = body.set('emailReceipt', 'true');

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.http.post(this.googleFormActionUrl, body.toString(), { headers, responseType: 'text' })
      .subscribe({
        next: (response) => {

          console.log('Submissão enviada (resposta do Google pode ser bloqueada por CORS):', response);
          this.submittedSuccessfully = true;
          this.snackBar.open('Proposta de doação enviada com sucesso! Entraremos em contato em breve.', 'OK', { duration: 5000 });
          this.donationForm.reset();
        },
        error: (error) => {

          if (error.status === 0 || error.status === 200) { // 200 pode ser a página de sucesso do Google, mas bloqueada por CORS
            console.warn('Submissão enviada, mas resposta bloqueada por CORS (esperado). Verifique o Google Forms.');
            this.submittedSuccessfully = true;
            this.snackBar.open('Proposta de doação enviada com sucesso! Entraremos em contato em breve.', 'OK', { duration: 5000 });
            this.donationForm.reset();
          } else {
            console.error('Erro ao enviar formulário para o Google Forms:', error);
            this.submittedSuccessfully = false;
            this.snackBar.open('Erro ao enviar proposta. Tente novamente mais tarde.', 'Fechar', { duration: 3000 });
          }
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
