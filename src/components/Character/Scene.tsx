import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

// WebGL Feature Detection
function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch (e) {
    return false;
  }
}

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [dismiss3D, setDismiss3D] = useState(false);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    // Check WebGL availability
    if (!isWebGLAvailable()) {
      setIsWebGLSupported(false);
      return;
    }

    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: window.devicePixelRatio < 2,
        powerPreference: "high-performance",
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let characterLoaded = false;

      // Loading timeout check
      const timeoutId = setTimeout(() => {
        if (!characterLoaded) {
          setLoadError(true);
        }
      }, 15000); // 15 seconds timeout boundary

      loadCharacter().then((gltf) => {
        if (gltf) {
          characterLoaded = true;
          clearTimeout(timeoutId);
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          setChar(character);
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          window.addEventListener("resize", () =>
            handleResize(renderer, camera, canvasDiv, character)
          );
        }
      }).catch(() => {
        clearTimeout(timeoutId);
        setLoadError(true);
      });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", (event) => {
        onMouseMove(event);
      });
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        clearTimeout(timeoutId);
        clearTimeout(debounce);
        scene.clear();
        renderer.dispose();
        window.removeEventListener("resize", () =>
          handleResize(renderer, camera, canvasDiv, character!)
        );
        if (canvasDiv.current && canvasDiv.current.contains(renderer.domElement)) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, [retryKey]);

  // Degradation Fallback rendering if WebGL is disabled or dismissed
  if (dismiss3D || !isWebGLSupported) {
    return (
      <div className="character-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
        <img 
          src="/Screenshot_2026-04-08_22-10-00.png" 
          alt="Rahul Parmar Workspace Preview" 
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>

        {/* Load Error Boundary overlay */}
        {loadError && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(11, 8, 12, 0.95)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            textAlign: "center",
            boxSizing: "border-box"
          }}>
            <h4 style={{ color: "#eae5ec", fontSize: "16px", marginBottom: "15px" }}>
              Unable to initialize 3D Character Model.
            </h4>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => {
                  setLoadError(false);
                  setRetryKey(prev => prev + 1);
                }}
                style={{
                  background: "var(--accentColor)",
                  color: "#0b080c",
                  border: "none",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Retry
              </button>
              <button
                onClick={() => setDismiss3D(true)}
                style={{
                  background: "transparent",
                  color: "#eae5ec",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                Continue without 3D
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Scene;
