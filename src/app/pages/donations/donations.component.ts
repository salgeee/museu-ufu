import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // HttpParams não é mais necessário para Formspree com JSON
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


  private formspreeActionUrl = 'https://formspree.io/f/mzzrnayz';

  constructor() {
    this.donationForm = this.fb.group({
      nomeDoador: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      descricaoDoacao: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.donationForm.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', { duration: 3000 });

      Object.keys(this.donationForm.controls).forEach(key => {
        const controlErrors = this.donationForm.get(key)?.errors;
        if (controlErrors != null) {
          console.log('Campo com erro:', key, controlErrors);
        }
      });
      return;
    }

    this.isSubmitting = true;
    this.submittedSuccessfully = null;

    const formData = this.donationForm.value;
    console.log('Dados do formulário Angular a serem enviados para Formspree:', formData);

    // Formspree geralmente espera um payload JSON
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json' // Formspree recomenda isso para evitar redirecionamentos HTML
    });

    this.http.post(this.formspreeActionUrl, formData, { headers }) // Envia o objeto formData diretamente
      .subscribe({
        next: (response) => {
          console.log('Resposta do Formspree:', response);
          this.submittedSuccessfully = true;
          this.snackBar.open('Proposta de doação enviada com sucesso! Entraremos em contato em breve.', 'OK', { duration: 5000 });
          this.donationForm.reset();
        },
        error: (error) => {
          console.error('Erro ao enviar formulário para o Formspree:', error);
          let errorMessage = 'Erro ao enviar proposta. Tente novamente mais tarde.';
          if (error.error && typeof error.error.error === 'string') {
            errorMessage = error.error.error; // Formspree pode retornar mensagens de erro úteis
          } else if (error.message) {
            errorMessage = error.message;
          }
          this.submittedSuccessfully = false;
          this.snackBar.open(errorMessage, 'Fechar', { duration: 7000 });
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
  }
}
