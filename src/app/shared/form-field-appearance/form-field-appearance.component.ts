import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form-field-appearance',
  templateUrl: './form-field-appearance.component.html',
  styleUrls: ['./form-field-appearance.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
})
export class FormFieldAppearanceComponent {}
