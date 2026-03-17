import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  template: `
    <nav class="navbar" [class.scrolled]="scrolled()">
      <div class="navbar__inner">
        <a href="#" class="navbar__logo" (click)="scrollTo($event, null)">DURCOR</a>

        <!-- Desktop links -->
        <div class="navbar__links">
          <a href="#inicio"    (click)="scrollTo($event, 'inicio')">Inicio</a>
          <a href="#servicios" (click)="scrollTo($event, 'servicios')">Servicios</a>
          <a href="#colven"    (click)="scrollTo($event, 'colven')">Colven</a>
          <a href="#agro"      (click)="scrollTo($event, 'agro')">Agro</a>
          <a href="#nosotros"  (click)="scrollTo($event, 'nosotros')">Nosotros</a>
          <a href="#contacto"  (click)="scrollTo($event, 'contacto')" class="navbar__cta">Contacto</a>
        </div>

        <!-- Hamburger -->
        <button class="hamburger" (click)="toggleMenu()" [class.open]="menuOpen()" aria-label="Menú">
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>

    <!-- Mobile drawer -->
    <div class="drawer" [class.open]="menuOpen()">
      <div class="drawer__logo">DURCOR</div>
      <nav class="drawer__links">
        <a href="#inicio"    (click)="scrollTo($event, 'inicio')">Inicio</a>
        <a href="#servicios" (click)="scrollTo($event, 'servicios')">Servicios</a>
        <a href="#colven"    (click)="scrollTo($event, 'colven')">Colven</a>
        <a href="#agro"      (click)="scrollTo($event, 'agro')">Agro</a>
        <a href="#nosotros"  (click)="scrollTo($event, 'nosotros')">Nosotros</a>
        <a href="#contacto"  (click)="scrollTo($event, 'contacto')" class="drawer__cta">Contacto</a>
      </nav>
    </div>
    <!-- Overlay -->
    <div class="drawer__overlay" [class.open]="menuOpen()" (click)="closeMenu()"></div>
  `,
  styles: []
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 60); }

  toggleMenu() {
    console.log('[Navbar] toggleMenu called, current:', this.menuOpen());
    this.menuOpen.update(v => !v);
    console.log('[Navbar] menuOpen is now:', this.menuOpen());
  }
  closeMenu() { this.menuOpen.set(false); }

  scrollTo(e: Event, id: string | null): void {
    e.preventDefault();
    this.closeMenu();
    const target = id ? document.getElementById(id) : document.documentElement;
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
