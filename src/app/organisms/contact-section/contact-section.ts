import { Component } from '@angular/core';
import { LucideAngularModule, MapPin, Phone, Clock } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <section class="section" id="contacto" style="padding-top: 60px; padding-bottom: 60px">
      <div class="wrap">
        <div class="row">
          <div class="left">
            <div class="eyebrow reveal">Estamos cerca</div>
            <h2 class="section-title reveal d1">Contacto y ubicación</h2>
            <p class="section-sub reveal d2">Acercate al taller o escribinos. Te respondemos con información técnica real.</p>
            <div class="details reveal d3">
              <div class="detail">
                <lucide-icon [img]="MapPin" [size]="15" [strokeWidth]="1.5" class="detail__ico"></lucide-icon>
                <div>
                  <span class="detail__label">Dirección</span>
                  <span class="detail__val">[Dirección del taller]</span>
                </div>
              </div>
              <div class="detail">
                <lucide-icon [img]="Phone" [size]="15" [strokeWidth]="1.5" class="detail__ico"></lucide-icon>
                <div>
                  <span class="detail__label">Teléfono / WhatsApp</span>
                  <span class="detail__val">+54 2983 512738</span>
                </div>
              </div>
              <div class="detail">
                <lucide-icon [img]="Clock" [size]="15" [strokeWidth]="1.5" class="detail__ico"></lucide-icon>
                <div>
                  <span class="detail__label">Horario</span>
                  <span class="detail__val">Lunes a Viernes 8:00 – 18:00 · Sábados 8:00 – 13:00</span>
                </div>
              </div>
            </div>
            <div class="ctas reveal d4">
              <a href="https://wa.me/5492983512738" class="btn btn-primary" target="_blank">WhatsApp</a>
              <a href="tel:+542983512738" class="btn btn-ghost">Llamar</a>
            </div>
          </div>
          <div class="map-wrap glass reveal d2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1327.8569600698906!2d-60.41320947213692!3d-37.965715710335246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9593ad3e02ad22eb%3A0x1e9844a5cdee5720!2sGuillermo%20Durquet!5e1!3m2!1ses!2sar!4v1773719560004!5m2!1ses!2sar"
              width="100%" height="100%"
              style="border:0; display:block;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .wrap { max-width: 1200px; margin: 0 auto; }
    .row { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
    .section-sub { margin-bottom: 36px; }
    .details { display: flex; flex-direction: column; gap: 0; margin-bottom: 36px; }
    .detail { display: flex; gap: 14px; align-items: flex-start; padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
    .detail:last-child { border-bottom: none; }
    .detail__ico { color: var(--accent); flex-shrink: 0; margin-top: 2px; }
    .detail__label { font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-3); display: block; margin-bottom: 3px; }
    .detail__val { font-size: 0.92rem; color: var(--text); line-height: 1.6; display: block; }
    .ctas { display: flex; gap: 14px; flex-wrap: wrap; }
    .map-wrap {
      height: 450px;
      border-radius: 4px;
      overflow: hidden;
    }
    .map-wrap iframe {
      width: 100%;
      height: 100%;
      display: block;
      border: 0;
    }
    @media (max-width: 900px) { .row { grid-template-columns: 1fr; gap: 48px; } }
  `]
})
export class ContactComponent {
  readonly MapPin = MapPin;
  readonly Phone = Phone;
  readonly Clock = Clock;
}
