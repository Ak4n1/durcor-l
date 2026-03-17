import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-heading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1 *ngIf="level === 1" [class]="'heading heading-' + level + ' ' + (reveal ? 'reveal' : '')">
      <ng-content></ng-content>
    </h1>
    <h2 *ngIf="level === 2" [class]="'heading heading-' + level + ' ' + (reveal ? 'reveal' : '')">
      <ng-content></ng-content>
    </h2>
    <h3 *ngIf="level === 3" [class]="'heading heading-' + level + ' ' + (reveal ? 'reveal' : '')">
      <ng-content></ng-content>
    </h3>
    <h4 *ngIf="level === 4" [class]="'heading heading-' + level + ' ' + (reveal ? 'reveal' : '')">
      <ng-content></ng-content>
    </h4>
  `,
  styles: []
})
export class HeadingComponent {
  @Input() level: 1 | 2 | 3 | 4 = 2;
  @Input() reveal = false;
}
