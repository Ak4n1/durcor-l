import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preloader" [class.hidden]="!visible">
      <div class="preloader__inner">
        <div class="preloader__logo">DURCOR</div>
        <div class="preloader__sub">Preparando experiencia</div>
        <div class="preloader__bar">
          <div class="preloader__progress" [style.width.%]="progress"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .preloader {
      position: fixed;
      inset: 0;
      background: #0d0d0f;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: opacity 0.8s ease, visibility 0.8s ease;
    }
    .preloader.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .preloader__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
    .preloader__logo {
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 3rem;
      font-weight: 900;
      letter-spacing: 0.3em;
      color: #f2f2f2;
    }
    .preloader__sub {
      font-size: 0.75rem;
      letter-spacing: 0.25em;
      text-transform: uppercase;
      color: rgba(242,242,242,0.4);
    }
    .preloader__bar {
      width: 200px;
      height: 1px;
      background: rgba(255,255,255,0.1);
      margin-top: 8px;
      overflow: hidden;
    }
    .preloader__progress {
      height: 100%;
      background: #E05A00;
      transition: width 0.3s ease;
    }
  `]
})
export class PreloaderComponent {
  @Input() visible = true;
  @Input() progress = 0;
}
