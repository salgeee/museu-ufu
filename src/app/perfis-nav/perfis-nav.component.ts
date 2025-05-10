import {Component, isDevMode} from '@angular/core';

@Component({
  selector: 'app-perfis-nav',
  imports: [],
  templateUrl: './perfis-nav.component.html',
  styleUrl: './perfis-nav.component.scss'
})
export class PerfisNavComponent {
  basePath = isDevMode() ? '' : '/museu-ufu';
}
