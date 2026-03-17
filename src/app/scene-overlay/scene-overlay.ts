import { Component, Input } from '@angular/core';

const SCENES: Record<string, { eyebrow: string; title: string; sub: string; side: 'left'|'right' }> = {
  electro: {
    eyebrow: 'Electromecánica',
    title: 'Diagnóstico y reparación\nelectromecánica',
    sub: 'Atención técnica precisa. Soluciones confiables para el sistema eléctrico y mecánico de tu vehículo.',
    side: 'left',
  },
  colven: {
    eyebrow: 'Soluciones Colven',
    title: 'Sistemas VIGIA\ny monitoreo técnico',
    sub: 'Instalación y servicio de sistemas de monitoreo motor y neumáticos.',
    side: 'right',
  },
  ac: {
    eyebrow: 'Aire Acondicionado',
    title: 'Diagnóstico,\nreparación y recarga',
    sub: 'Servicio completo del sistema de climatización automotor.',
    side: 'left',
  },
  agro: {
    eyebrow: 'Servicio al Agro',
    title: 'Soluciones técnicas\npara trabajo real',
    sub: 'Electromecánica para equipos y vehículos del sector agropecuario.',
    side: 'right',
  },
};

@Component({
  selector: 'app-scene-overlay',
  standalone: true,
  template: `
    <section class="so" [class.so--right]="data.side === 'right'">
      <div class="so__text">
        <div class="so__eyebrow">{{ data.eyebrow }}</div>
        <h2 class="so__title">{{ data.title }}</h2>
        <p class="so__sub glass">{{ data.sub }}</p>
      </div>
    </section>
  `,
  styles: [`
    .so {
      height: 100vh;
      display: flex;
      align-items: flex-end;
      padding: 0 6vw 10vh;
      position: relative;
      z-index: 1;
    }
    .so--right { justify-content: flex-end; }
    .so__text { max-width: 600px; }
    .so__eyebrow {
      font-size: 0.7rem;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 14px;
      display: inline-block;
      border-left: 2px solid var(--accent);
      padding-left: 10px;
    }
    .so__title {
      font-size: clamp(2.8rem, 6.5vw, 5.5rem);
      font-weight: 900;
      color: var(--text);
      white-space: pre-line;
      line-height: 1.0;
      margin-bottom: 20px;
      text-shadow: 0 2px 40px rgba(0,0,0,0.85), 0 0 80px rgba(0,0,0,0.5);
    }
    .so__sub {
      font-size: clamp(0.88rem, 1.3vw, 1rem);
      color: var(--text-2);
      line-height: 1.75;
      padding: 14px 18px;
      max-width: 460px;
    }
  `]
})
export class SceneOverlayComponent {
  @Input() set scene(val: string) { this.data = SCENES[val] ?? SCENES['electro']; }
  data = SCENES['electro'];
}
