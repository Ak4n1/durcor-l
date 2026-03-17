import { Component } from '@angular/core';
import { NavbarComponent } from '../../organisms/navbar/navbar';
import { HeroComponent } from '../../organisms/hero/hero';
import { ServicesComponent } from '../../organisms/services-section/services-section';
import { ColvenComponent } from '../../organisms/colven-section/colven-section';
import { AgroComponent } from '../../organisms/agro-section/agro-section';
import { WhyComponent } from '../../organisms/why-section/why-section';
import { ProcessComponent } from '../../organisms/process-section/process-section';
import { ContactComponent } from '../../organisms/contact-section/contact-section';
import { FinalCtaComponent } from '../../organisms/final-cta-section/final-cta-section';
import { FooterComponent } from '../../organisms/footer/footer';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    ColvenComponent,
    AgroComponent,
    WhyComponent,
    ProcessComponent,
    ContactComponent,
    FinalCtaComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar></app-navbar>
    <app-hero></app-hero>
    <app-services></app-services>
    <app-colven></app-colven>
    <app-agro></app-agro>
    <app-why></app-why>
    <app-process></app-process>
    <app-contact></app-contact>
    <app-final-cta></app-final-cta>
    <app-footer></app-footer>
  `,
})
export class LandingComponent {}
