import { Component, OnInit, signal } from '@angular/core';
import { ThreeSceneComponent } from './three-scene/three-scene';
import { PreloaderComponent } from './preloader/preloader';
import { NavbarComponent } from './navbar/navbar';
import { HeroComponent } from './hero/hero';
import { ServicesComponent } from './sections/services/services';
import { ColvenComponent } from './sections/colven/colven';
import { AgroComponent } from './sections/agro/agro';
import { WhyComponent } from './sections/why/why';
import { ProcessComponent } from './sections/process/process';
import { ContactComponent } from './sections/contact/contact';
import { FinalCtaComponent } from './sections/final-cta/final-cta';
import { FooterComponent } from './sections/footer/footer';
import { RevealService } from './reveal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ThreeSceneComponent, PreloaderComponent, NavbarComponent,
    HeroComponent, ServicesComponent, ColvenComponent, AgroComponent,
    WhyComponent, ProcessComponent, ContactComponent,
    FinalCtaComponent, FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  preloaderVisible = signal(true);
  loadProgress = signal(0);
  constructor(private reveal: RevealService) {}

  ngOnInit(): void {
    // Dismiss preloader quickly — don't wait for 3D model
    setTimeout(() => {
      this.preloaderVisible.set(false);
      setTimeout(() => this.reveal.init(), 300);
    }, 1200);
  }

  onLoadProgress(p: number): void { this.loadProgress.set(p); }
  onLoadComplete(): void { /* model loaded — handled by three-scene */ }
}
