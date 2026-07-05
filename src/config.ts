import { personal } from "./config/personal";
import { socials } from "./config/socials";
import { projects } from "./config/projects";
import { experiences } from "./config/experience";
import { skills } from "./config/skills";
import { education } from "./config/education";
import { certifications } from "./config/certifications";

export const config = {
  developer: {
    name: personal.name,
    fullName: personal.fullName,
    title: personal.title,
    description: personal.bio,
  },
  social: {
    github: socials.github,
    email: socials.email,
    location: personal.location,
  },
  about: {
    title: "About Me",
    description: personal.about,
  },
  experiences: experiences,
  education: education,
  certifications: certifications,
  projects: projects,
  contact: socials,
  skills: {
    develop: {
      title: "AI & Programming",
      description: skills.ai_llm.title,
      details: "Integrating Large Language Models (LLM), prompt engineering architectures, automation workflows, and Python scripting.",
      tools: [...skills.ai_llm.tools, ...skills.programming.tools, ...skills.research.tools],
    },
    design: {
      title: "Full-Stack & Tools",
      description: skills.backend.title,
      details: "Building responsive frontends in React.js, secure REST APIs in Node.js, managing databases with MongoDB, and deploying on Vercel.",
      tools: [...skills.frontend.tools, ...skills.backend.tools, ...skills.tools.tools],
    },
  },
};
