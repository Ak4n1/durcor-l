import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-process',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="section" style="padding-top: 80px; padding-bottom: 40px">
      <div class="wrap">
        <div class="section__header">
          <div class="eyebrow reveal">Cómo trabajamos</div>
          <h2 class="section-title reveal d1">El proceso</h2>
        </div>
        <div class="steps">
          <div class="step reveal" *ngFor="let s of steps; let i = index" [class]="'d' + (i+1)">
            <div class="step__num">{{ (i+1).toString().padStart(2,'0') }}</div>
            <h3 class="step__title">{{ s.title }}</h3>
            <p class="step__desc">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wrap { max-width: 1200px; margin: 0 auto; }
    .steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
    .step { padding: 28px 24px 28px 0; border-top: 1px solid rgba(255,255,255,0.07); }
    .step:hover { border-top-color: var(--accent); }
    .step__num { font-family: 'Barlow Condensed', sans-serif; font-size: 2.2rem; font-weight: 900; color: var(--accent); margin: 14px 0 16px; }
    .step__title { font-size: 1rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
    .step__desc { font-size: 0.85rem; color: var(--text-2); line-height: 1.7; }
    @media (max-width: 900px) { .steps { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 600px) { .steps { grid-template-columns: 1fr; } }
  `]
})
export class ProcessComponent {
  steps = [
    { title: 'Consulta', desc: 'Nos contás el problema. Te escuchamos y orientamos sin compromiso.' },
    { title: 'Diagnóstico', desc: 'Revisamos con herramientas técnicas y te informamos qué encontramos.' },
    { title: 'Reparación', desc: 'Ejecutamos el trabajo con precisión y repuestos de calidad.' },
    { title: 'Entrega', desc: 'Te entregamos el vehículo en condiciones y quedamos disponibles.' },
  ];
}
