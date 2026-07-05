export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  pdf: string;
  credentialUrl?: string;
  skillsGained: string[];
  platform: "Coursera" | "Forage" | "Google" | "IBM" | "NVIDIA" | "Microsoft" | "Other";
  relevanceGroup: "AI & Machine Learning" | "Data Analytics" | "Professional";
  sortOrder: number;
}

export const certifications: CertificationItem[] = [
  // 🤖 AI & Machine Learning (Top)
  {
    id: "tata-genai",
    title: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Tata Group (Forage)",
    category: "AI",
    pdf: "/certificates/tata-genai-data-analytics.pdf",
    credentialUrl: "https://www.theforage.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_69069529bdd1b392dca1c18f_1782849303665_completion_certificate.pdf",
    skillsGained: ["Generative AI", "Data Analytics", "Data Quality Analysis", "Strategic Insights"],
    platform: "Forage",
    relevanceGroup: "AI & Machine Learning",
    sortOrder: 1
  },
  {
    id: "python-data-science",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM (Coursera)",
    category: "Python",
    pdf: "/certificates/python-data-science-ai-development.pdf",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/52W8F9N4KMBS",
    skillsGained: ["Python", "Data Structures", "Web Scraping", "APIs"],
    platform: "Coursera",
    relevanceGroup: "AI & Machine Learning",
    sortOrder: 2
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering for ChatGPT",
    issuer: "Vanderbilt University (Coursera)",
    category: "LLM",
    pdf: "/certificates/prompt-engineering-chatgpt.pdf",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/RX8VDZ0DU7AH",
    skillsGained: ["Prompt Engineering", "ChatGPT", "LLM Workflows", "Prompt Patterns"],
    platform: "Coursera",
    relevanceGroup: "AI & Machine Learning",
    sortOrder: 3
  },
  {
    id: "human-llm-interaction",
    title: "Conceptualizing Human–LLM Interaction: Usage, Wellbeing, and Risk Perspectives",
    issuer: "L.J. University / Partner Academic Publisher",
    category: "AI",
    pdf: "/certificates/conceptualizing-human-llm-interaction.pdf",
    skillsGained: ["Human-AI Interaction", "LLM Risks Evaluation", "User Wellbeing Perspectives"],
    platform: "Other",
    relevanceGroup: "AI & Machine Learning",
    sortOrder: 4
  },
  // 📊 Data Analytics
  {
    id: "deloitte-data-analytics",
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte Australia (Forage)",
    category: "Data Analytics",
    pdf: "/certificates/deloitte-data-analytics.pdf",
    credentialUrl: "https://www.theforage.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_69069529bdd1b392dca1c18f_1782847044575_completion_certificate.pdf",
    skillsGained: ["Data Analytics", "Data Visualization", "Data Wrangling", "Dashboard Design"],
    platform: "Forage",
    relevanceGroup: "Data Analytics",
    sortOrder: 5
  },
  // 💼 Professional
  {
    id: "google-marketing",
    title: "Google Digital Marketing & E-commerce",
    issuer: "Google (Coursera)",
    category: "Marketing",
    pdf: "/certificates/google-digital-marketing-ecommerce.pdf",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/EW21NGT55RFK",
    skillsGained: ["Digital Marketing", "E-commerce", "SEO", "Customer Analytics"],
    platform: "Coursera",
    relevanceGroup: "Professional",
    sortOrder: 6
  }
];
