import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-trust-strip',
  standalone: true,
  template: `
    <section class="trust">
      <div class="trust__inner">
        <div class="trust__item reveal" *ngFor="let item of items; let i = index"
             [class]="'reveal-delay-' + (i + 1)">
          <span class="trust__icon">{{ item.icon }}</span>
          <span class="trust__label">{{ item.label }}</span>
        </div>
      </div>
    </section>
  `,
  imports: [NgFor],
  styles: [`
    .trust {
      background: transparent;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 28px 6vw;
      position: relative;
      z-index: 2;
    }
    .trust__inner {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 40px 60px;
      max-width: 1100px;
      margin: 0 auto;
    }
    .trust__item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--text-secondary);
    }
    .trust__icon {
      font-size: 1.1rem;
    }
  `]
})
export class TrustStripComponent {
  items = [
    { icon: '⚙️', label: 'Atención profesional' },
    { icon: '🔍', label: 'Diagnóstico confiable' },
    { icon: '🛠️', label: 'Soluciones técnicas' },
    { icon: '📡', label: 'Colven' },
    { icon: '🌾', label: 'Servicio al agro' },
  ];
}
