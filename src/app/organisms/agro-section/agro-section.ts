import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { LucideAngularModule, Tractor, ShieldCheck, Clock, MapPin, ChevronRight } from 'lucide-angular';

@Component({
  selector: 'app-agro',
  standalone: true,
  imports: [NgFor, LucideAngularModule],
  template: `
    <section class="section" id="agro">
      <div class="wrap">
        <div class="row">
          <div class="left">
            <div class="eyebrow reveal">Campo y trabajo real</div>
            <h2 class="section-title reveal d1">Servicio Técnico al Agro</h2>
            <p class="section-sub reveal d2">Atención electromecánica para equipos y vehículos del sector agropecuario. Diagnóstico preciso y respuesta técnica para trabajo de campo.</p>
            <div class="features reveal d3">
              <div class="feature" *ngFor="let f of features">
                <lucide-icon [img]="ChevronRight" [size]="14" [strokeWidth]="2" class="feat-icon"></lucide-icon>
                <span>{{ f }}</span>
              </div>
            </div>
            <a href="#contacto" class="btn btn-ghost reveal d4">Consultar servicio</a>
          </div>
          <div class="right">
            <div class="stat glass reveal" *ngFor="let s of stats; let i = index" [class]="'d' + (i+1)">
              <lucide-icon [img]="s.icon" [size]="24" [strokeWidth]="1.5" class="stat__icon"></lucide-icon>
              <div class="stat__val">{{ s.value }}</div>
              <div class="stat__label">{{ s.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wrap { max-width: 1200px; margin: 0 auto; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .section-sub { margin-bottom: 28px; }
    .features { display: flex; flex-direction: column; gap: 10px; margin-bottom: 32px; }
    .feature { display: flex; gap: 10px; align-items: center; font-size: 0.88rem; color: var(--text-2); }
    .feat-icon { color: var(--accent); flex-shrink: 0; }
    .right { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
    .stat { padding: 32px 20px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; }
    .stat__icon { color: var(--accent); opacity: 0.7; }
    .stat__val { font-family: 'Barlow Condensed', sans-serif; font-size: 2.4rem; font-weight: 900; color: var(--accent); line-height: 1; }
    .stat__label { font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-3); }
    @media (max-width: 900px) { .row { grid-template-columns: 1fr; gap: 48px; } }
  `]
})
export class AgroComponent {
  readonly ChevronRight = ChevronRight;

  features = [
    'Diagnóstico electromecánico en campo',
    'Reparación de sistemas eléctricos',
    'Mantenimiento preventivo y correctivo',
    'Atención a maquinaria agrícola',
  ];
  stats = [
    { icon: ShieldCheck, value: '100%',  label: 'Compromiso técnico' },
    { icon: Tractor,     value: 'Real',  label: 'Experiencia de campo' },
    { icon: Clock,       value: 'Rápido', label: 'Tiempo de respuesta' },
    { icon: MapPin,      value: 'Local', label: 'Servicio cercano' },
  ];
}
