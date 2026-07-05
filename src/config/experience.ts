export interface ExperienceItem {
  position: string;
  company: string;
  period: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export const experiences: ExperienceItem[] = [
  {
    position: "Full-Stack Developer | AI Systems & Automation",
    company: "Bluehole (OPC) Pvt Ltd",
    period: "January 2025 - Present (1 year 7 months)",
    location: "Ahmedabad, Gujarat, India",
    description: "Building and maintaining full-stack web applications using React.js, Node.js, Python, and modern API architectures, and developing AI-integrated systems and automation workflows.",
    responsibilities: [
      "Building and maintaining full-stack web applications using React.js, Node.js, Python, and modern API architectures.",
      "Developing AI-integrated systems, automation workflows, and scalable backend solutions for digital products.",
      "Working on REST APIs, backend services, and modern web application infrastructure.",
      "Contributing to AI-powered tools involving workflow automation, intelligent integrations, and product-focused solutions.",
      "Supporting development and deployment of scalable web-based platforms in a startup environment."
    ],
    technologies: ["React.js", "Node.js", "Python", "REST APIs", "MongoDB", "Git", "GitHub", "Vercel", "AI Integrations", "Automation Systems"]
  },
  {
    position: "AI Content & Digital Marketing Executive",
    company: "Bluehole (OPC) Pvt Ltd",
    period: "April 2026 - Present (4 months)",
    location: "Ahmedabad, Gujarat, India",
    description: "Created AI-generated marketing creatives, promotional assets, and branding systems to support digital campaigns in a startup environment.",
    responsibilities: [
      "Created AI-generated marketing creatives, short-form video content, and digital campaigns for social media platforms.",
      "Developed AI-powered promotional assets, influencer-style virtual branding content, and product marketing visuals.",
      "Designed AI-generated advertisements and promotional campaigns for mobile apps, websites, and digital products.",
      "Worked on AI-assisted content workflows, branding systems, and social media growth initiatives.",
      "Contributed to digital marketing strategies involving AI-generated visuals, automation workflows, and product-focused campaigns."
    ],
    technologies: ["AI Branding Systems", "AI Generative Creatives", "Workflow Automation", "Digital Campaigns"]
  }
];
