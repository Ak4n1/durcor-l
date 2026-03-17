import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-why',
  standalone: true,
  imports: [NgFor],
  template: `
    <section class="section" id="nosotros">
      <div class="wrap">
        <div class="section__header">
          <div class="eyebrow reveal">Por qué elegirnos</div>
          <h2 class="section-title reveal d1">Atención técnica que se nota</h2>
        </div>
        <div class="grid">
          <div class="item reveal" *ngFor="let item of items; let i = index" [class]="'d' + (i+1)">
            <div class="item__num">{{ (i+1).toString().padStart(2,'0') }}</div>
            <h3 class="item__title">{{ item.title }}</h3>
            <p class="item__desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wrap { max-width: 1200px; margin: 0 auto; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 40px; }
    .item__num {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 3rem; font-weight: 900;
      color: rgba(224,90,0,0.2);
      line-height: 1; margin-bottom: 14px;
      border-bottom: 1px solid rgba(224,90,0,0.2);
      padding-bottom: 14px;
    }
    .item__title { font-size: 1.05rem; font-weight: 700; color: var(--text); margin-bottom: 8px; }
    .item__desc { font-size: 0.875rem; color: var(--text-2); line-height: 1.7; }
  `]
})
export class WhyComponent {
  items = [
    { title: 'Diagnóstico real', desc: 'Herramientas técnicas para identificar el problema con precisión antes de intervenir.' },
    { title: 'Atención personalizada', desc: 'Cada vehículo recibe atención directa, sin intermediarios ni respuestas genéricas.' },
    { title: 'Soluciones concretas', desc: 'No vendemos servicios innecesarios. Resolvemos lo que hay que resolver.' },
    { title: 'Experiencia comprobada', desc: 'Años de trabajo en electromecánica, aire acondicionado y soluciones técnicas.' },
  ];
}
