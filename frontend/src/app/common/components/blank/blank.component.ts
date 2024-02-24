import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blank',
  standalone: true,
  imports: [CommonModule, RouterModule],
  // Generic olduğu için burada da çağırırsak belki de loopa girer ve sıkıntı olabilir
  templateUrl: './blank.component.html',
  styleUrl: './blank.component.css',
})
export class BlankComponent {
  @Input() title: string = '';
  @Input() sectionTitle: string = '';
}
