import { Component } from '@angular/core';
import {InputComponent, SelectComponent} from 'govbr-ds-angular';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-initial',
  imports: [
    FormsModule,
    SelectComponent
  ],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent {
  inputValue: string = '';
  selectedOption: number | null = null;

}
