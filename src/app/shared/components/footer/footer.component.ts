import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

/**
 * Componente FooterComponent é responsável por exibir o rodapé da aplicação.
 * @example
 * <app-footer></app-footer>
 * @public
 * {@link https://www.gov.br/ds/components/footer?tab=desenvolvedor|Documentação oficial}
 */
@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [NgOptimizedImage],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss',
})
export class FooterComponent {
	currentYear = new Date().getFullYear();
	
	museumInfo = {
		name: 'Museu Universitário de Arte - MUnA',
		description: 'O Museu Universitário de Arte da UFU é um espaço dedicado à preservação, pesquisa e difusão da arte contemporânea.',
		address: 'Praça Cícero Macedo, 309 - Fundinho',
		city: 'Uberlândia - MG',
		phone: '(34) 3231-5762',
		email: 'muna@ufu.br'
	};

	usefulLinks = [
		{ text: 'Acervo Digital', url: '/acervo' },
		{ text: 'Exposições', url: '/exposicoes' },
		{ text: 'Jogos Educativos', url: '/jogos' },
		{ text: 'Sobre o Museu', url: '/sobre' }
	];

	socialMedia = [
		{ icon: 'fab fa-facebook-f', url: 'https://facebook.com/museumuna', label: 'Facebook' },
		{ icon: 'fab fa-twitter', url: 'https://twitter.com/museumuna', label: 'Twitter' },
		{ icon: 'fab fa-instagram', url: 'https://instagram.com/museumuna', label: 'Instagram' },
		{ icon: 'fab fa-youtube', url: 'https://youtube.com/museumuna', label: 'YouTube' }
	];

	license = {
		text: 'Todo o conteúdo deste site está publicado sob a licença Creative Commons Atribuição-SemDerivações 3.0',
		url: 'http://creativecommons.org/licenses/by-nd/3.0/deed.pt_BR'
	};
}
