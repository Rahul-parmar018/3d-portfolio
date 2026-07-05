import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { socials } from "../config/socials";
import { trackEvent } from "../utils/analytics";

const SocialIcons = () => {
  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;

    social.querySelectorAll("span").forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);

      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, []);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {socials.github && (
          <span>
            <a href={socials.github} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('GitHub Clicked', { source: 'social_sidebar' })}>
              <FaGithub />
            </a>
          </span>
        )}
        {socials.linkedin && (
          <span>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('LinkedIn Clicked', { source: 'social_sidebar' })}>
              <FaLinkedinIn />
            </a>
          </span>
        )}
        {socials.twitter && (
          <span>
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('Twitter Clicked', { source: 'social_sidebar' })}>
              <FaXTwitter />
            </a>
          </span>
        )}
        {socials.instagram && (
          <span>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('Instagram Clicked', { source: 'social_sidebar' })}>
              <FaInstagram />
            </a>
          </span>
        )}
      </div>
      <a
        className="resume-button"
        href={socials.resumeUrl || "#"}
        target={socials.resumeUrl ? "_blank" : undefined}
        rel="noopener noreferrer"
        onClick={() => trackEvent('Resume Downloaded', { source: 'social_sidebar' })}
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
