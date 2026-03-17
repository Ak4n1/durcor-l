import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { LucideAngularModule, Zap, Wind, Radio, Wheat, ScanSearch } from 'lucide-angular';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [NgFor, LucideAngularModule],
  template: `
    <section class="section" id="servicios">
      <div class="wrap">
        <div class="section__header">
          <div class="eyebrow reveal">Lo que hacemos</div>
          <h2 class="section-title reveal d1">Nuestros Servicios</h2>
          <p class="section-sub reveal d2">Atención técnica especializada para tu vehículo.</p>
        </div>
        <div class="grid">
          <div class="card glass reveal" *ngFor="let s of services; let i = index" [class]="'d' + (i+1)">
            <div class="card__accent"></div>
            <div class="card__icon">
              <lucide-icon [img]="s.icon" [size]="28" [strokeWidth]="1.5"></lucide-icon>
            </div>
            <h3 class="card__title">{{ s.title }}</h3>
            <p class="card__desc">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wrap { max-width: 1200px; margin: 0 auto; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2px; }
    .card { padding: 36px 28px; position: relative; overflow: hidden; transition: background 0.3s; }
    .card:hover { background: rgba(20,20,24,0.92); }
    .card__accent { position: absolute; top: 0; left: 0; width: 100%; height: 2px; background: var(--accent); opacity: 0; transition: opacity 0.3s; }
    .card:hover .card__accent { opacity: 1; }
    .card__icon { color: var(--accent); margin-bottom: 18px; }
    .card__title { font-size: 1.2rem; font-weight: 700; color: var(--text); margin-bottom: 10px; }
    .card__desc { font-size: 0.875rem; color: var(--text-2); line-height: 1.7; }
  `]
})
export class ServicesComponent {
  readonly Zap = Zap;
  readonly Wind = Wind;
  readonly Radio = Radio;
  readonly Wheat = Wheat;
  readonly ScanSearch = ScanSearch;

  services = [
    { icon: Zap,        title: 'Electromecánica Automotor', desc: 'Diagnóstico, reparación y mantenimiento del sistema eléctrico y mecánico.' },
    { icon: Wind,       title: 'Aire Acondicionado',        desc: 'Diagnóstico, reparación y recarga del sistema de climatización automotor.' },
    { icon: Radio,      title: 'Soluciones Colven',         desc: 'Instalación y servicio técnico de sistemas VIGIA motor y VIGIA neumáticos.' },
    { icon: Wheat,      title: 'Servicio al Agro',          desc: 'Atención electromecánica para equipos y vehículos del sector agropecuario.' },
    { icon: ScanSearch, title: 'Diagnóstico Preventivo',    desc: 'Control técnico preventivo para detectar fallas antes de que escalen.' },
  ];
}
