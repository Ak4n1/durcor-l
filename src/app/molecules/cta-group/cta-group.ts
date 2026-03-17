import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cta-group',
  standalone: true,
  template: `
    <div [class]="'ctas ' + (reveal ? 'reveal' : '')" [class]="'d' + delay">
      <ng-content></ng-content>
    </div>
  `,
  styles: []
})
export class CtaGroupComponent {
  @Input() reveal = false;
  @Input() delay = 1;
}
