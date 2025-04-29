import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, RouterLink],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	content = signal('Explore nossa coleção digital, exposições virtuais e jogos educativos. Descubra a história e a cultura através do acervo do Museu UFU.');
}
