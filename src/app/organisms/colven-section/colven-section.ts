import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { LucideAngularModule, Gauge, CircleDot, Wrench, Thermometer } from 'lucide-angular';

@Component({
  selector: 'app-colven',
  standalone: true,
  imports: [NgFor, LucideAngularModule],
  template: `
    <section class="section" id="colven">
      <div class="wrap">
        <div class="row">
          <div class="left">
            <div class="eyebrow reveal">Tecnología aplicada</div>
            <h2 class="section-title reveal d1">Soluciones Colven</h2>
            <p class="section-sub reveal d2">Trabajamos con soluciones Colven para instalación, configuración y servicio técnico de sistemas de monitoreo vehicular.</p>
            <a href="#contacto" class="btn btn-primary reveal d3">Consultar</a>
          </div>
          <div class="right">
            <div class="card glass reveal" *ngFor="let item of items; let i = index" [class]="'d' + (i+1)">
              <div class="card__icon">
                <lucide-icon [img]="item.icon" [size]="20" [strokeWidth]="1.5"></lucide-icon>
              </div>
              <div>
                <div class="card__title">{{ item.title }}</div>
                <div class="card__desc">{{ item.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wrap { max-width: 1200px; margin: 0 auto; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
    .left { display: flex; flex-direction: column; }
    .section-sub { margin-bottom: 32px; }
    .right { display: flex; flex-direction: column; gap: 12px; padding-top: 8px; }
    .card { display: flex; gap: 16px; align-items: flex-start; padding: 22px 20px; transition: border-color 0.3s; }
    .card:hover { border-color: rgba(224,90,0,0.3); }
    .card__icon { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
    .card__title { font-size: 0.95rem; font-weight: 700; color: var(--text); margin-bottom: 5px; }
    .card__desc { font-size: 0.85rem; color: var(--text-2); line-height: 1.65; }
    @media (max-width: 900px) { .row { grid-template-columns: 1fr; gap: 48px; } }
  `]
})
export class ColvenComponent {
  items = [
    { icon: Gauge,     title: 'VIGIA Motor',          desc: 'Instalación y configuración de sistemas de monitoreo de motor. Control de temperatura, presión y parámetros críticos.' },
    { icon: CircleDot, title: 'VIGIA Neumáticos',     desc: 'Sistemas de control de presión y temperatura de neumáticos. Monitoreo continuo para mayor seguridad.' },
    { icon: Thermometer, title: 'Viesa',                  desc: 'Servicio técnico de sistemas de climatización Viesa para transporte pesado, buses y camiones.' },
    { icon: Wrench,      title: 'Instalación y Servicio', desc: 'Instalación profesional, puesta en marcha y mantenimiento de soluciones Colven.' },
  ];
}
