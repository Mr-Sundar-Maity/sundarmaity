import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { getSpatialPalette, type ThemeMode } from '../utils/portfolio';

interface SpatialBackdrop3DProps {
  theme: ThemeMode;
  scrollProgress: number;
}

interface PrismSeed {
  x: number;
  y: number;
  z: number;
  scale: number;
  rotX: number;
  rotY: number;
  speedX: number;
  speedY: number;
  phase: number;
  floatAmp: number;
}

const _mat4 = new THREE.Matrix4();
const _pos = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _scale = new THREE.Vector3();
const _euler = new THREE.Euler();

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createSoftParticleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(size / 2, size / 2, 2, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.45, 'rgba(255, 255, 255, 0.55)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function seededUnit(seed: number): number {
  const raw = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return raw - Math.floor(raw);
}

export function SpatialBackdrop3D({ theme, scrollProgress }: SpatialBackdrop3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const themeRef = useRef<ThemeMode>(theme);
  const scrollRef = useRef<number>(scrollProgress);
  const syncThemeRef = useRef<((nextTheme: ThemeMode) => void) | null>(null);

  scrollRef.current = scrollProgress;

  useEffect(() => {
    themeRef.current = theme;
    syncThemeRef.current?.(theme);
  }, [theme]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const width = window.innerWidth || 1440;
    const height = window.innerHeight || 900;

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    renderer.setClearColor(0x000000, 0);

    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const initialPalette = getSpatialPalette(themeRef.current);
    const fog = new THREE.FogExp2(initialPalette.fogColor, 0.036);
    scene.fog = fog;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 60);
    camera.position.set(0, 0.3, 10.5);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // Lighting rig: Cool sky / lavender ground + warm peach rim + powder blue key
    const hemiLight = new THREE.HemisphereLight(
      initialPalette.hemiSkyColor,
      initialPalette.hemiGroundColor,
      themeRef.current === 'dark' ? 0.95 : 1.25
    );
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(
      initialPalette.keyLightColor,
      themeRef.current === 'dark' ? 1.35 : 1.55
    );
    keyLight.position.set(7, 9, 8);
    scene.add(keyLight);

    const powderPointLight = new THREE.PointLight(0x8db9f0, 2.4, 26, 1.3);
    powderPointLight.position.set(-4.5, 3.2, 5.5);
    scene.add(powderPointLight);

    const peachRimLight = new THREE.PointLight(0xf5b69e, 1.8, 22, 1.4);
    peachRimLight.position.set(5.8, -2.6, 3.5);
    scene.add(peachRimLight);

    // Composite 8-part architectural 3D sculpture
    const sculptureGroup = new THREE.Group();
    sculptureGroup.position.set(-0.4, 0.85, -3.1);
    scene.add(sculptureGroup);

    const disposables: Array<{ dispose: () => void }> = [envTarget.texture];

    // 1. Primary Powder Blue faceted crystal core
    const coreGeo = new THREE.IcosahedronGeometry(1.42, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#8db9f0'),
      roughness: 0.24,
      metalness: 0.35,
      clearcoat: 0.9,
      clearcoatRoughness: 0.14,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.46 : 0.56,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);
    disposables.push(coreGeo, coreMat);

    // 2. Crisp architectural edge cage around core
    const edgeGeo = new THREE.EdgesGeometry(coreGeo, 10);
    const edgeMat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#b9d7f9'),
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.52 : 0.72,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    edgeLines.scale.setScalar(1.01);
    sculptureGroup.add(edgeLines);
    disposables.push(edgeGeo, edgeMat);

    // 3. Inner Soft Lavender White nested octahedron core
    const innerGeo = new THREE.OctahedronGeometry(0.76, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e9e8f8'),
      roughness: 0.62,
      metalness: 0.14,
      transparent: true,
      opacity: 0.85,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    sculptureGroup.add(innerMesh);
    disposables.push(innerGeo, innerMat);

    // 4. Primary tilted Powder Blue orbital gyro ring
    const ringGeo1 = new THREE.TorusGeometry(2.08, 0.048, 16, 72);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8db9f0'),
      roughness: 0.22,
      metalness: 0.72,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.set(Math.PI / 3.2, Math.PI / 7, 0);
    sculptureGroup.add(ringMesh1);
    disposables.push(ringGeo1, ringMat1);

    // 5. Secondary Soft Lavender White orbital ring
    const ringGeo2 = new THREE.TorusGeometry(2.52, 0.036, 14, 72);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e9e8f8'),
      roughness: 0.56,
      metalness: 0.2,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.set(-Math.PI / 4, Math.PI / 3.5, Math.PI / 6);
    sculptureGroup.add(ringMesh2);
    disposables.push(ringGeo2, ringMat2);

    // 6. Outer architectural hexagonal prism frame ring
    const frameGeo = new THREE.TorusGeometry(2.96, 0.024, 6, 6);
    const frameMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#8db9f0'),
      roughness: 0.34,
      metalness: 0.58,
      transparent: true,
      opacity: 0.72,
    });
    const frameMesh = new THREE.Mesh(frameGeo, frameMat);
    frameMesh.rotation.set(Math.PI / 6, -Math.PI / 5, 0);
    sculptureGroup.add(frameMesh);
    disposables.push(frameGeo, frameMat);

    // 7-9. Warm Sunset Peach Highlight Satellite Nodes (3 composite accent orbs)
    const satGeo = new THREE.OctahedronGeometry(0.2, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f5b69e'),
      emissive: new THREE.Color('#f5b69e'),
      emissiveIntensity: 0.22,
      roughness: 0.28,
      metalness: 0.38,
    });
    const satCollarGeo = new THREE.TorusGeometry(0.32, 0.018, 8, 28);
    const satCollarMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e9e8f8'),
      roughness: 0.45,
      metalness: 0.4,
    });
    disposables.push(satGeo, satMat, satCollarGeo, satCollarMat);

    const satellites: THREE.Group[] = [];
    const satelliteConfigs = [
      { radius: 2.15, speed: 0.45, phase: 0.2, tilt: 0.45 },
      { radius: 2.58, speed: -0.34, phase: 2.4, tilt: -0.6 },
      { radius: 2.95, speed: 0.28, phase: 4.5, tilt: 0.85 },
    ];
    for (const cfg of satelliteConfigs) {
      const satGroup = new THREE.Group();
      const body = new THREE.Mesh(satGeo, satMat);
      const collar = new THREE.Mesh(satCollarGeo, satCollarMat);
      collar.rotation.x = Math.PI / 2.4;
      satGroup.add(body, collar);
      satGroup.userData = cfg;
      sculptureGroup.add(satGroup);
      satellites.push(satGroup);
    }

    // Instanced Spatial Depth Lattice (32 floating polyhedra adhering to Primary/Secondary/Highlight color ratio)
    const prismCount = 32;
    const prismGeo = new THREE.OctahedronGeometry(0.36, 0);
    const prismMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.36,
      metalness: 0.28,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.56 : 0.68,
    });
    const instancedPrisms = new THREE.InstancedMesh(prismGeo, prismMat, prismCount);
    instancedPrisms.frustumCulled = false;

    const prismSeeds: PrismSeed[] = [];
    const colorPowder = new THREE.Color('#8db9f0');
    const colorLavender = new THREE.Color('#e9e8f8');
    const colorPeach = new THREE.Color('#f5b69e');

    for (let i = 0; i < prismCount; i++) {
      const rx = (seededUnit(i + 1) - 0.5) * 19;
      const ry = (seededUnit(i + 37) - 0.5) * 12;
      const rz = -3.2 - seededUnit(i + 71) * 11.5;
      const scale = 0.35 + seededUnit(i + 109) * 0.95;

      prismSeeds.push({
        x: rx,
        y: ry,
        z: rz,
        scale,
        rotX: seededUnit(i + 151) * Math.PI * 2,
        rotY: seededUnit(i + 193) * Math.PI * 2,
        speedX: (seededUnit(i + 211) - 0.5) * 0.25,
        speedY: (seededUnit(i + 257) - 0.5) * 0.32,
        phase: seededUnit(i + 307) * Math.PI * 2,
        floatAmp: 0.14 + seededUnit(i + 353) * 0.28,
      });

      _pos.set(rx, ry, rz);
      _euler.set(prismSeeds[i].rotX, prismSeeds[i].rotY, 0);
      _quat.setFromEuler(_euler);
      _scale.setScalar(scale);
      _mat4.compose(_pos, _quat, _scale);
      instancedPrisms.setMatrixAt(i, _mat4);

      // Strict color priority: ~58% Primary Powder Blue, ~27% Secondary Lavender White, ~15% Highlight Sunset Peach
      const colorRoll = seededUnit(i + 401);
      if (colorRoll < 0.58) {
        instancedPrisms.setColorAt(i, colorPowder);
      } else if (colorRoll < 0.85) {
        instancedPrisms.setColorAt(i, colorLavender);
      } else {
        instancedPrisms.setColorAt(i, colorPeach);
      }
    }
    instancedPrisms.instanceMatrix.needsUpdate = true;
    if (instancedPrisms.instanceColor) instancedPrisms.instanceColor.needsUpdate = true;
    instancedPrisms.computeBoundingSphere();
    scene.add(instancedPrisms);
    disposables.push(prismGeo, prismMat);

    // Atmospheric depth particles
    const particleCount = 84;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (seededUnit(i + 503) - 0.5) * 22;
      particlePositions[i * 3 + 1] = (seededUnit(i + 547) - 0.5) * 14;
      particlePositions[i * 3 + 2] = -1 - seededUnit(i + 593) * 14;

      const cRoll = seededUnit(i + 619);
      const chosen = cRoll < 0.58 ? colorPowder : cRoll < 0.85 ? colorLavender : colorPeach;
      particleColors[i * 3] = chosen.r;
      particleColors[i * 3 + 1] = chosen.g;
      particleColors[i * 3 + 2] = chosen.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    const particleTexture = createSoftParticleTexture();
    const particleMat = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      opacity: themeRef.current === 'dark' ? 0.65 : 0.72,
      depthWrite: false,
      vertexColors: true,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    disposables.push(particleGeo, particleTexture, particleMat);

    syncThemeRef.current = (nextTheme: ThemeMode) => {
      const p = getSpatialPalette(nextTheme);
      fog.color.set(p.fogColor);
      hemiLight.color.set(p.hemiSkyColor);
      hemiLight.groundColor.set(p.hemiGroundColor);
      hemiLight.intensity = nextTheme === 'dark' ? 0.95 : 1.25;
      keyLight.color.set(p.keyLightColor);
      keyLight.intensity = nextTheme === 'dark' ? 1.35 : 1.55;
      coreMat.opacity = nextTheme === 'dark' ? 0.46 : 0.56;
      edgeMat.opacity = nextTheme === 'dark' ? 0.52 : 0.72;
      prismMat.opacity = nextTheme === 'dark' ? 0.56 : 0.68;
      particleMat.opacity = nextTheme === 'dark' ? 0.65 : 0.72;
    };

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const pointerTarget = { x: 0, y: 0 };
    const pointerSmooth = { x: 0, y: 0 };
    let smoothScroll = scrollRef.current;

    const handlePointerMove = (e: PointerEvent) => {
      const vw = window.innerWidth || 1440;
      const vh = window.innerHeight || 900;
      pointerTarget.x = (e.clientX / vw - 0.5) * 2;
      pointerTarget.y = (e.clientY / vh - 0.5) * 2;
    };

    const handleResize = () => {
      const w = window.innerWidth || 1440;
      const h = window.innerHeight || 900;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let frameId = 0;
    let disposed = false;
    let lastTime = performance.now();
    let elapsed = 0;

    const afterDraw = (cb: () => void) => {
      if (disposed) return;
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = typeof gl.fenceSync === 'function' ? gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0) : null;
      if (!sync) {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      gl.flush();
      const poll = () => {
        if (disposed) {
          gl.deleteSync(sync);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    const updateScene = (dt: number) => {
      elapsed += dt;

      // Damped pointer & scroll parallax
      pointerSmooth.x = THREE.MathUtils.damp(pointerSmooth.x, pointerTarget.x, 4.5, dt);
      pointerSmooth.y = THREE.MathUtils.damp(pointerSmooth.y, pointerTarget.y, 4.5, dt);
      smoothScroll = THREE.MathUtils.damp(smoothScroll, scrollRef.current, 5.2, dt);

      const isNarrow = (window.innerWidth || 1440) < 1024;
      const baseX = isNarrow ? 0.35 : -0.45;
      const scrollAngle = smoothScroll * Math.PI * 1.15;

      // Subtle scroll-driven camera travel + pointer parallax
      camera.position.x = pointerSmooth.x * 0.85 + Math.sin(scrollAngle) * 1.15;
      camera.position.y = 0.35 - pointerSmooth.y * 0.55 - smoothScroll * 2.2;
      camera.position.z = 10.5 - Math.sin(smoothScroll * Math.PI) * 1.35;
      camera.lookAt(pointerSmooth.x * 0.25, -smoothScroll * 1.5, -2.5);

      // Sculpture frames hero open space at top and glides smoothly across sections on scroll
      sculptureGroup.position.x = baseX + Math.sin(smoothScroll * Math.PI * 1.4) * (isNarrow ? 1.1 : 3.2);
      sculptureGroup.position.y = 0.85 - smoothScroll * 2.4 + Math.sin(elapsed * 0.7) * 0.14;
      sculptureGroup.position.z = -3.1 + Math.sin(smoothScroll * Math.PI) * 0.8;
      sculptureGroup.rotation.y = elapsed * 0.16 + smoothScroll * 1.4 + pointerSmooth.x * 0.28;
      sculptureGroup.rotation.x = Math.sin(elapsed * 0.25) * 0.12 - pointerSmooth.y * 0.22;

      coreMesh.rotation.y = elapsed * 0.22;
      coreMesh.rotation.z = elapsed * 0.11;
      edgeLines.rotation.copy(coreMesh.rotation);
      innerMesh.rotation.y = -elapsed * 0.35;
      innerMesh.rotation.x = elapsed * 0.18;

      ringMesh1.rotation.z = elapsed * 0.24;
      ringMesh2.rotation.y = -elapsed * 0.19;
      frameMesh.rotation.z = elapsed * 0.08;

      for (const sat of satellites) {
        const cfg = sat.userData as { radius: number; speed: number; phase: number; tilt: number };
        const angle = elapsed * cfg.speed + cfg.phase;
        sat.position.set(
          Math.cos(angle) * cfg.radius,
          Math.sin(angle) * cfg.radius * Math.sin(cfg.tilt),
          Math.sin(angle) * cfg.radius * Math.cos(cfg.tilt)
        );
        sat.rotation.y = elapsed * 0.9;
        sat.rotation.x = elapsed * 0.5;
      }

      for (let i = 0; i < prismCount; i++) {
        const s = prismSeeds[i];
        _pos.set(
          s.x,
          s.y + Math.sin(elapsed * 0.7 + s.phase) * s.floatAmp,
          s.z
        );
        _euler.set(s.rotX + elapsed * s.speedX, s.rotY + elapsed * s.speedY, 0);
        _quat.setFromEuler(_euler);
        _scale.setScalar(s.scale);
        _mat4.compose(_pos, _quat, _scale);
        instancedPrisms.setMatrixAt(i, _mat4);
      }
      instancedPrisms.instanceMatrix.needsUpdate = true;
      particles.rotation.y = elapsed * 0.025 + pointerSmooth.x * 0.05;
    };

    const tick = () => {
      if (disposed) return;
      const now = performance.now();
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      updateScene(dt);
      renderer.render(scene, camera);

      if (prefersReducedMotion) {
        return;
      }
      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      syncThemeRef.current = null;
      for (const item of disposables) {
        item.dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      data-testid="spatial-3d-canvas"
      className="fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
    />
  );
}
