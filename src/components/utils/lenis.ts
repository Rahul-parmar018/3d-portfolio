import Lenis from "lenis";

export let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}
