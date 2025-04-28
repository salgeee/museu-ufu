import { Component } from '@angular/core';
import {RouterLinkActive, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLinkActive
  ],
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {}
