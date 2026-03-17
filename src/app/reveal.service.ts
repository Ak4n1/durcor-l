import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RevealService {
  private hasInitialized = false;

  init(): void {
    if (this.hasInitialized) return;
    this.hasInitialized = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, 50);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const observe = () => {
      document.querySelectorAll('.reveal').forEach((el) => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });
    };

    // Wait for DOM to settle, then observe
    setTimeout(() => {
      observe();
    }, 200);

    // Re-observe after dynamic content
    setTimeout(observe, 800);
    setTimeout(observe, 2000);
  }
}


