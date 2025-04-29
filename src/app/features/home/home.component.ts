import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarraBrasilComponent } from '@app/shared/components/barra-brasil/barra-brasil.component';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [CommonModule, RouterLink, BarraBrasilComponent],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {
	content = signal('Explore nossa coleção digital, exposições virtuais e jogos educativos. Descubra a história e a cultura através do acervo do Museu UFU.');
}
