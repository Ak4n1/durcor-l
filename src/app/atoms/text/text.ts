import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  standalone: true,
  template: `
    <p [class]="'text text-' + variant + ' ' + (reveal ? 'reveal' : '')">
      <ng-content></ng-content>
    </p>
  `,
  styles: []
})
export class TextComponent {
  @Input() variant: 'body' | 'sub' | 'small' = 'body';
  @Input() reveal = false;
}
