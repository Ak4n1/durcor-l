import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div [class]="'card glass ' + (reveal ? 'reveal' : '')" [class]="'d' + delay">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CardComponent {
  @Input() reveal = false;
  @Input() delay = 1;
}
