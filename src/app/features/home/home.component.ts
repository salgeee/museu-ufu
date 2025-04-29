import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '@app/core/auth/services/auth.service';
import {Router} from '@angular/router';


@Component({
	selector: 'app-home',
	standalone: true,
	imports: [],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  content(): string {
    return `Bem-vindo ao Museu FACOM-UFU! Aqui você vai descobrir o legado da computação na nossa universidade, explorar exposições interativas
e se inspirar com projetos de pesquisa que moldam o futuro da tecnologia.`;
  }
}
