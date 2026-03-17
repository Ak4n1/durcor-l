import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section class="hero" id="inicio">
      <div class="hero__content">
        <div class="eyebrow reveal">Taller Electromecánico</div>
        <h1 class="hero__title reveal d1">DURCOR</h1>
        <p class="hero__sub reveal d2">
          Electromecánica, aire acondicionado,<br>soluciones Colven y servicio técnico al agro.
        </p>
        <div class="hero__ctas reveal d3">
          <a href="#contacto" class="btn btn-primary">Solicitar consulta</a>
          <a href="#servicios" class="btn btn-ghost">Ver servicios</a>
        </div>
      </div>
      <div class="hero__scroll reveal d4">
        <span>Scroll</span>
        <div class="hero__scroll-line"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      height: 100vh;
      display: flex;
      align-items: flex-end;
      padding: 0 6vw 22vh;
      position: relative;
      z-index: 1;
      overflow: hidden;
    }
    .hero__content { 
      max-width: 640px; 
      position: relative;
      z-index: 20;
    }
    .eyebrow {
      font-size: 0.7rem;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--accent);
      margin-bottom: 14px;
    }
    .hero__title {
      font-size: clamp(5rem, 14vw, 11rem);
      font-weight: 900;
      letter-spacing: 0.1em;
      color: var(--text);
      line-height: 0.9;
      margin-bottom: 24px;
      text-shadow: 0 4px 60px rgba(0,0,0,0.7);
    }
    .hero__sub {
      font-size: clamp(0.95rem, 1.5vw, 1.1rem);
      color: var(--text-2);
      line-height: 1.7;
      margin-bottom: 40px;
      text-shadow: 0 2px 20px rgba(0,0,0,0.9);
    }
    .hero__ctas { display: flex; gap: 14px; flex-wrap: wrap; }
    .hero__scroll {
      position: absolute;
      bottom: 40px;
      right: 6vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 0.62rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--text-3);
      z-index: 20;
    }
    .hero__scroll-line {
      width: 1px;
      height: 48px;
      background: linear-gradient(to bottom, var(--accent), transparent);
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%,100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    
    /* Mobile optimizations */
    @media (max-width: 768px) {
      .hero {
        padding: 0 4vw 15vh;
        align-items: center;
        text-align: center;
      }
      .hero__title {
        font-size: clamp(3.5rem, 12vw, 6rem);
        margin-bottom: 20px;
      }
      .hero__sub {
        font-size: clamp(0.9rem, 4vw, 1rem);
        margin-bottom: 30px;
      }
      .hero__ctas {
        justify-content: center;
        gap: 12px;
      }
      .hero__scroll {
        bottom: 20px;
        right: 50%;
        transform: translateX(50%);
      }
    }
    
    @media (max-width: 480px) {
      .hero {
        padding: 0 5vw 12vh;
      }
      .hero__title {
        font-size: clamp(2.8rem, 15vw, 4.5rem);
      }
      .hero__ctas {
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  ngOnInit() {}
  ngOnDestroy() {}
}
