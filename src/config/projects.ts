export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  technologies: string;
  image: string;
  description: string;
  status: "Planned" | "In Development" | "Completed" | "Coming Soon";
  repository: string;
  demo: string;
  architecture: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

export const projects: ProjectItem[] = [
  {
    id: 1,
    title: "Candidex AI Analyzer",
    category: "AI / LLM Resume Parsing",
    technologies: "React, TypeScript, LLMs, TailwindCSS",
    image: "/images/candidex.png",
    description: "An intelligent platform designed to parse resumes and evaluate candidates matching technical skills requirements.",
    status: "Completed",
    repository: "",
    demo: "https://candidex-ai-analyzer.vercel.app/",
    architecture: "Web-based analysis interface querying AI language models to parse and score resume content.",
    metrics: []
  },
  {
    id: 2,
    title: "End-to-End Computer Vision System",
    category: "Deep Learning / CV",
    technologies: "Python, PyTorch, OpenCV, Docker, FastAPI",
    image: "/images/drishti.png",
    description: "A complete image detection and processing pipeline spanning raw dataset loading, model training, accuracy evaluation metrics, and serverless endpoint inference.",
    status: "Planned",
    repository: "",
    demo: "",
    architecture: "",
    metrics: []
  },
  {
    id: 3,
    title: "AI SaaS Application",
    category: "Full Stack SaaS",
    technologies: "React, Node.js, MongoDB, Express, AWS, Stripe",
    image: "/images/votechain.png",
    description: "A full-stack software-as-a-service web application integrating payment routing, secure user endpoints, monitoring, and cloud-hosted scaling.",
    status: "Planned",
    repository: "",
    demo: "",
    architecture: "",
    metrics: []
  }
];
