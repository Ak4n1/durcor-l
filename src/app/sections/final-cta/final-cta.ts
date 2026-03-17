import { Component } from '@angular/core';

@Component({
  selector: 'app-final-cta',
  standalone: true,
  template: `
    <section class="section" style="text-align:center; padding-top: 48px">
      <div class="wrap">
        <h2 class="section-title reveal" style="max-width:600px;margin:0 auto 20px">¿Tu vehículo necesita atención técnica?</h2>
        <p class="section-sub reveal d1" style="margin:0 auto 48px;text-align:center">Contactanos hoy. Diagnóstico honesto, soluciones reales.</p>
        <div class="ctas reveal d2">
          <a href="https://wa.me/[numero]" class="btn btn-primary" target="_blank">Contactar por WhatsApp</a>
          <a href="#servicios" class="btn btn-ghost">Ver servicios</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wrap { max-width: 700px; margin: 0 auto; }
    .ctas { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
  `]
})
export class FinalCtaComponent {}
