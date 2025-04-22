import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  CheckboxComponent,
  InputComponent,
  MagicButtonComponent,
  RadioComponent,
  SelectComponent,
  TextareaComponent,
  TabsComponent,
  AlertComponent,
  DateTimePickerComponent,
  SwitchComponent,
  MultiSelectComponent,
  PaginatorComponent,
  LoadingComponent,
  CollapseItemComponent,
  ButtonDirective,
} from 'govbr-ds-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
  SelectComponent,
  InputComponent,
  CheckboxComponent,
  RadioComponent,
  MagicButtonComponent,
  TextareaComponent,
  TabsComponent,
  AlertComponent,
  DateTimePickerComponent,
  SwitchComponent,
  MultiSelectComponent,
  PaginatorComponent,
  LoadingComponent,
  CollapseItemComponent,
  ButtonDirective
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'museu-ufu';
  inputValue: string = '';
}
