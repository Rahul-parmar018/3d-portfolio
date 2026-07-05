import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";
import { socials } from "../config/socials";
import { trackEvent } from "../utils/analytics";

import { lenis, setLenis } from "./utils/lenis";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenisInstance = new Lenis({
      duration: 1.7,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.7,
      touchMultiplier: 2,
      infinite: false,
    });
    setLenis(lenisInstance);

    // Start paused
    lenisInstance.stop();

    // Handle smooth scroll animation frame
    function raf(time: number) {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Handle navigation links
    let links = document.querySelectorAll(".header ul a, .mobile-menu ul a");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        setIsMenuOpen(false);
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section && lenis) {
            const target = document.querySelector(section) as HTMLElement;
            if (target) {
              lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
              });
            }
          }
        }
      });
    });

    // Handle resize
    window.addEventListener("resize", () => {
      lenis?.resize();
    });

    return () => {
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          RP
        </a>

        {/* Desktop Navigation Links */}
        <ul className="nav-desktop">
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#experience" href="#experience">
              <HoverLinks text="EXPERIENCE" />
            </a>
          </li>
          <li>
            <a data-href="#skills" href="#skills">
              <HoverLinks text="SKILLS" />
            </a>
          </li>
          <li>
            <a data-href="#certifications" href="#certifications">
              <HoverLinks text="CERTIFICATIONS" />
            </a>
          </li>
          <li>
            <a data-href="#education" href="#education">
              <HoverLinks text="EDUCATION" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="PROJECTS" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          {socials.resumeUrl && (
            <li>
              <a href={socials.resumeUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('Resume Viewed', { source: 'navbar_desktop' })}>
                <HoverLinks text="RESUME" />
              </a>
            </li>
          )}
        </ul>

        {/* Hamburger Toggle Button */}
        <button
          className={`hamburger ${isMenuOpen ? "is-active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          data-cursor="disable"
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </button>
      </div>

      {/* Mobile & Tablet Overlay Navigation */}
      <div className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              ABOUT
            </a>
          </li>
          <li>
            <a data-href="#experience" href="#experience">
              EXPERIENCE
            </a>
          </li>
          <li>
            <a data-href="#skills" href="#skills">
              SKILLS
            </a>
          </li>
          <li>
            <a data-href="#certifications" href="#certifications">
              CERTIFICATIONS
            </a>
          </li>
          <li>
            <a data-href="#education" href="#education">
              EDUCATION
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              PROJECTS
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              CONTACT
            </a>
          </li>
          {socials.resumeUrl && (
            <li>
              <a href={socials.resumeUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('Resume Viewed', { source: 'navbar_mobile' })}>
                RESUME
              </a>
            </li>
          )}
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
