import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer__inner">
        <div>
          <div class="logo">DURCOR</div>
          <p class="tagline">Taller Electromecánico</p>
        </div>
        <nav class="nav">
          <a href="#servicios">Servicios</a>
          <a href="#colven">Colven</a>
          <a href="#agro">Agro</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div class="info">
          <div>[Dirección del taller]</div>
          <div>+54 2983 512738</div>
          <div>Lun–Vie 8:00–18:00 · Sáb 8:00–13:00</div>
        </div>
      </div>
      <div class="bottom">© {{ year }} DurCor. Todos los derechos reservados.</div>
    </footer>
  `,
  styles: [`
    .footer {
      position: relative; z-index: 1;
      padding: 64px 6vw 32px;
      border-top: 1px solid rgba(255,255,255,0.07);
    }
    .footer__inner {
      max-width: 1200px; margin: 0 auto;
      display: grid; grid-template-columns: 1fr 1fr 1fr;
      gap: 48px; padding-bottom: 48px;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      margin-bottom: 28px;
    }
    .logo { font-family: 'Barlow Condensed', sans-serif; font-size: 1.8rem; font-weight: 900; letter-spacing: 0.2em; margin-bottom: 6px; }
    .tagline { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-3); }
    .nav { display: flex; flex-direction: column; gap: 10px; }
    .nav a { font-size: 0.83rem; color: var(--text-2); transition: color 0.2s; }
    .nav a:hover { color: var(--accent); }
    .info { display: flex; flex-direction: column; gap: 8px; font-size: 0.83rem; color: var(--text-2); line-height: 1.6; }
    .bottom { max-width: 1200px; margin: 0 auto; font-size: 0.72rem; color: var(--text-3); }
    @media (max-width: 768px) { .footer__inner { grid-template-columns: 1fr; gap: 28px; } }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
