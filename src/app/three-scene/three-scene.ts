import {
  Component, ElementRef, OnDestroy, OnInit,
  ViewChild, Output, EventEmitter
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface CameraKeyframe {
  scrollStart: number; // 0-1
  scrollEnd: number;
  position: THREE.Vector3;
  target: THREE.Vector3;
}

@Component({
  selector: 'app-three-scene',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 10; /* above hero background but below hero content */
      pointer-events: none;
      background: #050505;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
      pointer-events: none;
    }
  `]
})
export class ThreeSceneComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @Output() loadProgress = new EventEmitter<number>();
  @Output() loadComplete = new EventEmitter<void>();

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private animFrameId!: number;
  private scrollY = 0;
  private currentPos = new THREE.Vector3();
  private currentTarget = new THREE.Vector3();
  private backgroundPlane: THREE.Mesh | null = null;
  private backgroundTexture: THREE.Texture | null = null;
  private bottomGradientPlane: THREE.Mesh | null = null;

  // Camera keyframes per scroll scene
  private readonly keyframes: CameraKeyframe[] = [
    {
      scrollStart: 0, scrollEnd: 0.2,
      position: new THREE.Vector3(0, 1.2, 6), // frontal view
      target: new THREE.Vector3(0, 0.5, 0)
    },
    {
      scrollStart: 0.2, scrollEnd: 0.4,
      position: new THREE.Vector3(4, 2, 4), // diagonal right
      target: new THREE.Vector3(0, 0.2, 0)
    },
    {
      scrollStart: 0.4, scrollEnd: 0.6,
      position: new THREE.Vector3(-4, 1.5, 3), // left side
      target: new THREE.Vector3(0, 0, 0)
    },
    {
      scrollStart: 0.6, scrollEnd: 0.8,
      position: new THREE.Vector3(0, 2, -5), // rear view
      target: new THREE.Vector3(0, 0.5, 0)
    },
    {
      scrollStart: 0.8, scrollEnd: 1.0,
      position: new THREE.Vector3(5, 3, 5), // high angle
      target: new THREE.Vector3(0, 0, 0)
    }
  ];

  private readonly scrollHandler = () => { this.scrollY = window.scrollY; };

  ngOnInit(): void {
    this.initScene();
    this.loadModel();
    this.animate();
    window.addEventListener('scroll', this.scrollHandler, { passive: true });
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.onResize);
    this.renderer.dispose();
  }

  private initScene(): void {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x050505, 1); // solid black clear
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050505); // black background for when image is out of view

    // Initial camera
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    const kf0 = this.keyframes[0];
    this.camera.position.copy(kf0.position);
    this.camera.lookAt(kf0.target);
    this.currentPos.copy(kf0.position);
    this.currentTarget.copy(kf0.target);

    this.setupLights();
    this.setupEnvironment();
    this.loadBackgroundImage();
  }

  private setupLights(): void {
    // Ambient — very low, just to avoid pure black
    const ambient = new THREE.AmbientLight(0xffffff, 0.15);
    this.scene.add(ambient);

    // Key light — warm technical spotlight from upper right
    const key = new THREE.SpotLight(0xfff5e0, 4, 30, Math.PI / 6, 0.4, 1.5);
    key.position.set(6, 8, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.bias = -0.001;
    this.scene.add(key);
    this.scene.add(key.target);

    // Cool fill — diagnostic blue from left
    const fill = new THREE.DirectionalLight(0x4488cc, 0.5);
    fill.position.set(-6, 3, -2);
    this.scene.add(fill);

    // Warm rim — separation from behind
    const rim = new THREE.DirectionalLight(0xff7722, 0.4);
    rim.position.set(-2, 2, -8);
    this.scene.add(rim);

    // Ground bounce — very subtle warm
    const bounce = new THREE.DirectionalLight(0x331100, 0.3);
    bounce.position.set(0, -3, 0);
    this.scene.add(bounce);
  }

  private setupEnvironment(): void {
    // No floor — background image shows through transparent canvas
  }

  private loadBackgroundImage(): void {
    const loader = new THREE.TextureLoader();
    const imageUrl = 'assets/images/bg.png';
    
    loader.load(imageUrl, (texture) => {
      this.backgroundTexture = texture;
      
      // Create fullscreen quad positioned at "top" of virtual space
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uViewportOffset: { value: 0.0 }
        },
        vertexShader: `
          uniform float uViewportOffset;
          varying vec2 vUv;
          void main() {
            vUv = uv;
            // Move the background up as we scroll down - simulates staying in place
            vec4 pos = vec4(position, 1.0);
            pos.y += uViewportOffset;
            gl_Position = pos;
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          varying vec2 vUv;
          
          void main() {
            vec4 texColor = texture2D(uTexture, vUv);
            
            // Apply effects like reference
            float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
            vec3 contrastedColor = pow(vec3(gray) * 1.25, vec3(1.0));
            
            // Add blue and orange glows like reference
            vec2 blueCenter = vec2(0.75, 0.25);
            float blueDist = distance(vUv, blueCenter);
            vec3 blueGlow = vec3(0.0, 0.4, 1.0) * (1.0 - smoothstep(0.0, 0.7, blueDist)) * 0.1;
            
            vec2 orangeCenter = vec2(0.25, 0.75);
            float orangeDist = distance(vUv, orangeCenter);
            vec3 orangeGlow = vec3(0.94, 0.42, 0.0) * (1.0 - smoothstep(0.0, 0.7, orangeDist)) * 0.15;
            
            vec3 finalColor = contrastedColor + blueGlow + orangeGlow;
            
            // Add dark overlay to the entire image
            vec3 darkOverlay = vec3(0.0, 0.0, 0.0); // Pure black overlay
            float overlayStrength = 0.85; // 85% dark overlay (EVEN MORE DARK)
            finalColor = mix(finalColor, darkOverlay, overlayStrength);
            
            // Add gradient at bottom - 30% bottom black, 70% top fades to transparent
            float gradientStart = 0.7; // Start gradient at 70% (30% from bottom will be black)
            float gradientEnd = 1.0;   // End at bottom (100%)
            float bottomGradient = smoothstep(gradientStart, gradientEnd, 1.0 - vUv.y);
            vec3 blackColor = vec3(0.02, 0.02, 0.02); // Back to dark black
            finalColor = mix(finalColor, blackColor, bottomGradient);
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
        depthTest: false,
        depthWrite: false
      });
      
      this.backgroundPlane = new THREE.Mesh(geometry, material);
      this.backgroundPlane.renderOrder = -999; // Behind everything
      this.scene.add(this.backgroundPlane);
      
      // Create additional gradient for the bottom area (below image)
      this.createBottomGradient();
      
      console.log('Background image loaded successfully');
    }, undefined, (error) => {
      console.error('Error loading background image:', error);
    });
  }

  private createBottomGradient(): void {
    // Create gradient for bottom area in canvas
    const geometry = new THREE.PlaneGeometry(2, 4); // Tall plane for gradient
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uViewportOffset: { value: 0.0 }
      },
      vertexShader: `
        uniform float uViewportOffset;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec4 pos = vec4(position, 1.0);
          // Position at bottom of screen, moves with scroll
          pos.y = -2.0 + uViewportOffset;
          gl_Position = pos;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          // Gradient from black at bottom to transparent at top
          float gradient = smoothstep(0.0, 1.0, vUv.y);
          vec3 blackColor = vec3(0.0, 0.0, 0.0);
          float alpha = 1.0 - gradient; // Inverted - black at bottom, transparent at top
          gl_FragColor = vec4(blackColor, alpha * 0.9);
        }
      `,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
    
    this.bottomGradientPlane = new THREE.Mesh(geometry, material);
    this.bottomGradientPlane.renderOrder = -998; // In front of background but behind everything else
    this.scene.add(this.bottomGradientPlane);
  }

  private loadModel(): void {
    const MODEL_URL = 'assets/3d/source/bmw_m4_modified_widebody_knitro_builds.glb';
    const CACHE_NAME = 'durcor-models-v1';

    const addToScene = (arrayBuffer: ArrayBuffer) => {
      const loader = new GLTFLoader();
      loader.parse(arrayBuffer, '', (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = 5 / Math.max(size.x, size.y, size.z);

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y = -1;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            const mesh = child as THREE.Mesh;
            const applyTransparent = (m: THREE.Material) => {
              const mat = (m as THREE.MeshStandardMaterial).clone();
              mat.transparent = true;
              mat.opacity = 0;
              return mat;
            };
            mesh.material = Array.isArray(mesh.material)
              ? mesh.material.map(applyTransparent)
              : applyTransparent(mesh.material as THREE.Material);
          }
        });

        this.scene.add(model);
        this.fadeInModel(model);
        this.loadProgress.emit(100);
        this.loadComplete.emit();
      }, (err) => {
        console.error('Error parsing model:', err);
        this.loadComplete.emit();
      });
    };

    // Try Cache API first
    if ('caches' in window) {
      caches.open(CACHE_NAME).then(cache => {
        cache.match(MODEL_URL).then(cached => {
          if (cached) {
            // Serve from cache instantly
            cached.arrayBuffer().then(buf => addToScene(buf));
          } else {
            // Fetch, cache, then parse
            fetch(MODEL_URL)
              .then(res => {
                cache.put(MODEL_URL, res.clone());
                return res.arrayBuffer();
              })
              .then(buf => addToScene(buf))
              .catch(err => { console.error(err); this.loadComplete.emit(); });
          }
        });
      });
    } else {
      // Fallback: GLTFLoader normal
      const loader = new GLTFLoader();
      loader.load(MODEL_URL, (gltf) => {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const scale = 5 / Math.max(size.x, size.y, size.z);
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));
        model.position.y = -1;
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) { child.castShadow = true; child.receiveShadow = true; }
        });
        this.scene.add(model);
        this.loadProgress.emit(100);
        this.loadComplete.emit();
      }, undefined, () => this.loadComplete.emit());
    }
  }

  private fadeInModel(model: THREE.Object3D, duration = 1800): void {
    const finalY = model.position.y;
    model.position.y = finalY - 2.5; // start below ground

    const start = performance.now();
    const tick = () => {
      const raw = Math.min((performance.now() - start) / duration, 1);
      // smoothstep easing
      const t = raw * raw * (3 - 2 * raw);

      // rise up
      model.position.y = finalY - 2.5 + 2.5 * t;

      // fade in (starts at 0, reaches 1)
      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach(m => { (m as THREE.MeshStandardMaterial).opacity = t; });
        }
      });

      if (raw < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  private getCameraForScroll(fraction: number): { position: THREE.Vector3, target: THREE.Vector3 } {
    // Find which keyframe pair we're in
    for (let i = 0; i < this.keyframes.length; i++) {
      const kf = this.keyframes[i];
      if (fraction >= kf.scrollStart && fraction <= kf.scrollEnd) {
        const next = this.keyframes[Math.min(i + 1, this.keyframes.length - 1)];
        const t = (fraction - kf.scrollStart) / (kf.scrollEnd - kf.scrollStart);
        const smooth = t * t * (3 - 2 * t); // smoothstep
        return {
          position: new THREE.Vector3().lerpVectors(kf.position, next.position, smooth),
          target: new THREE.Vector3().lerpVectors(kf.target, next.target, smooth)
        };
      }
    }
    const last = this.keyframes[this.keyframes.length - 1];
    return { position: last.position.clone(), target: last.target.clone() };
  }

  private animate = (): void => {
    this.animFrameId = requestAnimationFrame(this.animate);

    const totalScroll = document.body.scrollHeight - window.innerHeight;
    const fraction = totalScroll > 0 ? Math.min(this.scrollY / totalScroll, 1) : 0;

    const { position, target } = this.getCameraForScroll(fraction);

    // Smooth lerp toward target camera state
    this.currentPos.lerp(position, 0.04);
    this.currentTarget.lerp(target, 0.04);

    this.camera.position.copy(this.currentPos);
    this.camera.lookAt(this.currentTarget);

    // Move background up as we scroll down - simulates it staying in place
    if (this.backgroundPlane && this.backgroundPlane.material) {
      const material = this.backgroundPlane.material as THREE.ShaderMaterial;
      const windowHeight = window.innerHeight;
      const scrollProgress = this.scrollY / windowHeight;
      // Move background up proportionally to scroll
      material.uniforms['uViewportOffset'].value = scrollProgress * 2.0;
    }

    // Move bottom gradient with same offset as background
    if (this.bottomGradientPlane && this.bottomGradientPlane.material) {
      const material = this.bottomGradientPlane.material as THREE.ShaderMaterial;
      const windowHeight = window.innerHeight;
      const scrollProgress = this.scrollY / windowHeight;
      material.uniforms['uViewportOffset'].value = scrollProgress * 2.0;
    }

    this.renderer.render(this.scene, this.camera);
  };

  private onResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
