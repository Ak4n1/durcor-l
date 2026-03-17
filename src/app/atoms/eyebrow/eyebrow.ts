import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eyebrow',
  standalone: true,
  template: `
    <div [class]="'eyebrow ' + (reveal ? 'reveal' : '')">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class EyebrowComponent {
  @Input() reveal = false;
}
