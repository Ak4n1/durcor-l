import { Component, OnInit, signal } from '@angular/core';
import { ThreeSceneComponent } from './three-scene/three-scene';
import { PreloaderComponent } from './organisms/preloader/preloader';
import { LandingComponent } from './templates/landing/landing';
import { RevealService } from './reveal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ThreeSceneComponent,
    PreloaderComponent,
    LandingComponent,
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
