import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <lucide-icon [img]="icon" [size]="size" [strokeWidth]="strokeWidth"></lucide-icon>
  `,
  styles: []
})
export class IconComponent {
  @Input() icon: any;
  @Input() size = 24;
  @Input() strokeWidth = 1.5;
}
