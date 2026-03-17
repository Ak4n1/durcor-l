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
      z-index: 0;
      pointer-events: none;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
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

  // Camera keyframes per scroll scene
  private readonly keyframes: CameraKeyframe[] = [
    {
      scrollStart: 0, scrollEnd: 0.2,
      position: new THREE.Vector3(5, 2.5, 3),
      target: new THREE.Vector3(0, 0.2, 0)
    },
    {
      scrollStart: 0.2, scrollEnd: 0.4,
      position: new THREE.Vector3(2, 1.8, 4),
      target: new THREE.Vector3(0.5, 0.8, 0)
    },
    {
      scrollStart: 0.4, scrollEnd: 0.6,
      position: new THREE.Vector3(-4, 0.6, 3),
      target: new THREE.Vector3(-0.5, -0.2, 0)
    },
    {
      scrollStart: 0.6, scrollEnd: 0.8,
      position: new THREE.Vector3(0, 1.5, 5),
      target: new THREE.Vector3(0, 0.5, 0)
    },
    {
      scrollStart: 0.8, scrollEnd: 1.0,
      position: new THREE.Vector3(6, 3.5, 6),
      target: new THREE.Vector3(0, -0.5, 0)
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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0d0d0f);

    // Initial camera
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    const kf0 = this.keyframes[0];
    this.camera.position.copy(kf0.position);
    this.camera.lookAt(kf0.target);
    this.currentPos.copy(kf0.position);
    this.currentTarget.copy(kf0.target);

    this.setupLights();
    this.setupEnvironment();
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
    // Dark industrial floor with subtle reflection
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0e0e10,
      roughness: 0.6,
      metalness: 0.4,
    });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;
    this.scene.add(floor);

    // Subtle fog to fade edges into darkness
    this.scene.fog = new THREE.FogExp2(0x0d0d0f, 0.04);
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

    this.renderer.render(this.scene, this.camera);
  };

  private onResize = (): void => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };
}
