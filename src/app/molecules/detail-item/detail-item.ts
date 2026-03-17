import { Component, Input } from '@angular/core';
import { IconComponent } from '../../atoms/icon/icon';

@Component({
  selector: 'app-detail-item',
  standalone: true,
  imports: [IconComponent],
  template: `
    <div class="detail">
      <app-icon [icon]="icon" [size]="15" [strokeWidth]="1.5" class="detail__ico"></app-icon>
      <div>
        <span class="detail__label">{{ label }}</span>
        <span class="detail__val">{{ value }}</span>
      </div>
    </div>
  `,
  styles: []
})
export class DetailItemComponent {
  @Input() icon: any;
  @Input() label = '';
  @Input() value = '';
}
