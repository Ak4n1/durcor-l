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
          <div class="svc-card glass reveal" *ngFor="let s of services; let i = index" [class]="'d' + (i+1)">
            <div class="svc-card__icon">
              <lucide-icon [img]="s.icon" [size]="36" [strokeWidth]="1.2"></lucide-icon>
            </div>
            <h3 class="svc-card__title">{{ s.title }}</h3>
            <p class="svc-card__desc">{{ s.desc }}</p>
            <div class="svc-card__line"></div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wrap { max-width: 1300px; margin: 0 auto; }
    .grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 1px;
    }
    .svc-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 40px 24px 36px;
      position: relative;
      overflow: hidden;
      transition: background 0.3s;
      cursor: default;
    }
    .svc-card:hover { background: rgba(22,22,26,0.95); }
    .svc-card__icon {
      color: var(--accent);
      margin-bottom: 20px;
      width: 64px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: rgba(224,90,0,0.08);
      border: 1px solid rgba(224,90,0,0.15);
      transition: background 0.3s, border-color 0.3s;
    }
    .svc-card:hover .svc-card__icon {
      background: rgba(224,90,0,0.15);
      border-color: rgba(224,90,0,0.35);
    }
    .svc-card__title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 10px;
      line-height: 1.3;
    }
    .svc-card__desc {
      font-size: 0.82rem;
      color: var(--text-2);
      line-height: 1.7;
      flex: 1;
    }
    .svc-card__line {
      position: absolute;
      bottom: 0; left: 0;
      width: 0; height: 2px;
      background: var(--accent);
      transition: width 0.4s ease;
    }
    .svc-card:hover .svc-card__line { width: 100%; }
    @media (max-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
    @media (max-width: 640px)  { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 400px)  { .grid { grid-template-columns: 1fr; } }
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
