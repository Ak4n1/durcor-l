import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class RevealService {
  init(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
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

    // Initial pass + re-observe after dynamic content
    observe();
    setTimeout(observe, 500);
    setTimeout(observe, 1500);
  }
}
