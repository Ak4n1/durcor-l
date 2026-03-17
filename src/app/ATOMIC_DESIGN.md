# Atomic Design - DURCOR Landing Page

## Estructura de componentes

### 🧬 Atoms (Átomos)
Elementos base reutilizables, sin dependencias entre sí.

- **Button** - Botón base (primary, ghost)
- **Heading** - Títulos (h1-h4)
- **Text** - Párrafos (body, sub, small)
- **Eyebrow** - Etiqueta superior
- **Icon** - Icono Lucide

**Ubicación:** `src/app/atoms/`

### 🧪 Molecules (Moléculas)
Combinaciones simples de átomos. Componentes reutilizables.

- **Card** - Contenedor con glass effect
- **DetailItem** - Icono + label + valor
- **CtaGroup** - Grupo de botones CTA

**Ubicación:** `src/app/molecules/`

### 🦾 Organisms (Organismos)
Secciones complejas que combinan moléculas y átomos.

- **Navbar** - Navegación principal + drawer mobile
- **Hero** - Sección hero full-screen
- **Preloader** - Pantalla de carga
- **ServicesSection** - Grid de servicios
- **ColvenSection** - Soluciones Colven
- **AgroSection** - Servicio al agro
- **WhySection** - Por qué elegirnos
- **ProcessSection** - Proceso de trabajo
- **ContactSection** - Contacto + mapa
- **FinalCtaSection** - CTA final
- **Footer** - Pie de página

**Ubicación:** `src/app/organisms/`

### 📄 Templates
Layouts que orquestan organismos.

- **Landing** - Página principal (única página)

**Ubicación:** `src/app/templates/`

## Cómo agregar un nuevo componente

### Nuevo Atom
```typescript
// src/app/atoms/badge/badge.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  template: `<span class="badge badge-{{ variant }}"><ng-content></ng-content></span>`,
  styles: []
})
export class BadgeComponent {
  @Input() variant: 'primary' | 'secondary' = 'primary';
}
```

### Nueva Molecule
```typescript
// src/app/molecules/badge-group/badge-group.ts
import { Component } from '@angular/core';
import { BadgeComponent } from '../../atoms/badge/badge';

@Component({
  selector: 'app-badge-group',
  standalone: true,
  imports: [BadgeComponent],
  template: `<div class="badge-group"><ng-content></ng-content></div>`,
  styles: []
})
export class BadgeGroupComponent {}
```

### Nuevo Organism
```typescript
// src/app/organisms/new-section/new-section.ts
import { Component } from '@angular/core';
import { CardComponent } from '../../molecules/card/card';

@Component({
  selector: 'app-new-section',
  standalone: true,
  imports: [CardComponent],
  template: `<section class="section"><app-card>...</app-card></section>`,
  styles: []
})
export class NewSectionComponent {}
```

## Reglas

1. **Atoms** no importan nada de la app (solo Angular)
2. **Molecules** importan Atoms
3. **Organisms** importan Atoms + Molecules
4. **Templates** importan Organisms
5. Los estilos globales están en `styles.css`
6. Cada componente tiene `standalone: true`

## Imports

```typescript
// Desde atoms
import { ButtonComponent, HeadingComponent } from '../../atoms';

// Desde molecules
import { CardComponent, DetailItemComponent } from '../../molecules';

// Desde organisms
import { NavbarComponent, HeroComponent } from '../../organisms';
```

## Ventajas

✅ Escalable - Fácil agregar nuevos componentes
✅ Mantenible - Cada componente tiene una responsabilidad clara
✅ Reutilizable - Los átomos y moléculas se usan en múltiples organismos
✅ Testeable - Componentes pequeños y aislados
✅ Documentado - Estructura clara y predecible
