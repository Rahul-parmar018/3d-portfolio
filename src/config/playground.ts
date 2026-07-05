export interface CandidexStage {
  id: string;
  name: string;
  explanation: string;
  technologies: string[];
  codeSnippet: string;
  challenges: string;
}

export interface PromptStrategy {
  id: string;
  name: string;
  promptPattern: string;
  responseExample: string;
  estTokens: number;
  estCost: string;
  estLatency: string;
  qualityScore: number;
  whyMatters: string;
}

export const candidexPipeline: CandidexStage[] = [
  {
    id: "upload",
    name: "Upload Resume",
    explanation: "Recruiters drop PDF resumes into a secure drag-and-drop landing area. The file is validated and prepared for pipeline streaming.",
    technologies: ["React.js", "TypeScript", "HTML5 Drag-Drop API"],
    codeSnippet: `const onDrop = useCallback((acceptedFiles) => {
  acceptedFiles.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Validate PDF headers and stream to processing endpoint
      uploadToServer(file);
    };
    reader.readAsArrayBuffer(file);
  });
}, []);`,
    challenges: "Handling raw file validation, restricting malicious MIME uploads, and managing asynchronous loading states for bulky documents."
  },
  {
    id: "processing",
    name: "PDF Processing",
    explanation: "The uploaded file is sent to the backend where it is read as a buffer stream, converting binary structures into accessible document trees.",
    technologies: ["Node.js", "Express", "pdf-parse"],
    codeSnippet: `import pdf from 'pdf-parse';

export const parsePdf = async (buffer: Buffer) => {
  const data = await pdf(buffer);
  return {
    text: data.text,
    metadata: data.metadata,
    pagesCount: data.numpages
  };
};`,
    challenges: "Handling multiple layout columns, avoiding text scrambling during character mapping, and optimizing memory footprint during peak concurrent uploads."
  },
  {
    id: "extraction",
    name: "Text Extraction",
    explanation: "Raw unformatted text is extracted, normalized (lowercased, whitespace-stripped), and structured for the embedding models.",
    technologies: ["Python", "NLTK", "Regex Tools"],
    codeSnippet: `def clean_text(raw_text: str) -> str:
    cleaned = raw_text.strip().replace('\\n', ' ')
    cleaned = re.sub(r'\\s+', ' ', cleaned)
    return cleaned.lower()`,
    challenges: "Stripping hidden non-Unicode formatting control sequences and filtering out system headers without removing essential candidate metrics."
  },
  {
    id: "skills",
    name: "Skill Extraction",
    explanation: "Our custom extraction layer runs pattern matching and semantic searches to isolate technical skills, tools, and certifications.",
    technologies: ["Spacy NLP", "Custom Named Entity Recognition (NER)"],
    codeSnippet: `import spacy
nlp = spacy.load("en_core_web_sm")

def extract_entities(text):
    doc = nlp(text)
    skills = [ent.text for ent in doc.ents if ent.label_ == "SKILL"]
    return list(set(skills))`,
    challenges: "Disambiguating skills (e.g., 'Go' the programming language vs. 'go' the verb) and supporting complex multi-word frameworks."
  },
  {
    id: "embeddings",
    name: "Embedding",
    explanation: "The parsed resume text and parsed requirements are sent to an embedding model, producing 1536-dimension vectors representing semantic meaning.",
    technologies: ["OpenAI Embedding V3", "Vectorization Libraries"],
    codeSnippet: `const response = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: candidateCleanedText,
});
const vector = response.data[0].embedding;`,
    challenges: "Truncating content to match context window limitations and managing network latency during batch embedding calls."
  },
  {
    id: "analysis",
    name: "AI Analysis",
    explanation: "LLMs perform contextual comparison between the candidate profile vectors and company job requirements, scoring candidate qualifications.",
    technologies: ["Claude 3.5 Sonnet / GPT-4o", "Prompt Architecture"],
    codeSnippet: `const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    { role: "system", content: "You are an expert recruiter evaluating skills gap." },
    { role: "user", content: \`Compare Resume: \${resumeText} with Job: \${jobDescription}\` }
  ]
});`,
    challenges: "Reducing model hallucinations, enforcing structured JSON returns, and maintaining objective evaluation criteria."
  },
  {
    id: "score",
    name: "Scoring Engine",
    explanation: "Cosine similarity and model scores are aggregated to output an overall fit index (0-100%), breaking down match percentages.",
    technologies: ["Cos-Similarity Calculations", "Scoring Weight Trees"],
    codeSnippet: `function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const normA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const normB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (normA * normB);
}`,
    challenges: "Aligning math-based cosine similarities with qualitative LLM reasoning outputs to provide balanced scores."
  },
  {
    id: "dashboard",
    name: "Dashboard View",
    explanation: "Recruiters view structured scores, matching skills, experience timelines, and suggested follow-up interview questions.",
    technologies: ["TailwindCSS", "Framer Motion", "Recharts Visualizations"],
    codeSnippet: `<RecruiterView>
  <ScoreCard score={candidate.similarity} />
  <SkillsBadgeList matched={candidate.skills} />
</RecruiterView>`,
    challenges: "Creating highly accessible, fast-loading list tables for recruiters to compare hundreds of profiles simultaneously."
  }
];

export const promptStrategies: PromptStrategy[] = [
  {
    id: "zeroshot",
    name: "Zero-Shot Prompting",
    promptPattern: "Classify this resume text into categories: Frontend, Backend, AI. Text: [Resume]",
    responseExample: "Category: AI\nConfidence: 85%",
    estTokens: 150,
    estCost: "$0.0003",
    estLatency: "450ms",
    qualityScore: 65,
    whyMatters: "Fastest execution and lowest cost. Ideal for simple, clear classifications, but fails on nuanced, subjective, or edge-case candidates."
  },
  {
    id: "fewshot",
    name: "Few-Shot Prompting",
    promptPattern: "Classify resume text.\nInput: [Resume A] -> Category: Frontend\nInput: [Resume B] -> Category: AI\nInput: [Resume C] ->",
    responseExample: "Category: AI\nConfidence: 92% (Aligned with Example B)",
    estTokens: 600,
    estCost: "$0.0012",
    estLatency: "800ms",
    qualityScore: 82,
    whyMatters: "By providing example input-output pairs, the LLM learns the tone and category thresholds without fine-tuning, dramatically increasing alignment."
  },
  {
    id: "cot",
    name: "Chain-of-Thought",
    promptPattern: "Classify the resume. Let's think step by step: First, list all programming languages. Second, identify the primary projects. Third...",
    responseExample: "Thinking Process:\n1. Languages: Python, C++\n2. Projects: PyTorch chatbot, Spacy parsing...\nConclusion: AI Category.",
    estTokens: 1100,
    estCost: "$0.0022",
    estLatency: "1600ms",
    qualityScore: 95,
    whyMatters: "Forces the model to output its reasoning path. Extremely effective for complex candidate evaluation, matching experiences, and reasoning skills gap."
  },
  {
    id: "structured",
    name: "Structured JSON Output",
    promptPattern: "Extract candidate details. Return a JSON object with keys: 'name', 'years_experience', 'skills_list'. Ensure no conversational text.",
    responseExample: `{\n  "name": "Rahul Parmar",\n  "years_experience": 1.5,\n  "skills_list": ["Python", "React", "LLM"]\n}`,
    estTokens: 350,
    estCost: "$0.0007",
    estLatency: "700ms",
    qualityScore: 90,
    whyMatters: "Guarantees output can be directly parsed by backend code without regex parsing failures, making it key for robust database storage pipelines."
  }
];

export const upcomingDomains = [
  { name: "Computer Vision", status: "Coming Soon" },
  { name: "Retrieval-Augmented Generation (RAG)", status: "In Development" },
  { name: "Fine-Tuning Architectures", status: "Coming Soon" },
  { name: "AI Agents (LangGraph)", status: "In Development" },
  { name: "Model Context Protocol (MCP)", status: "Coming Soon" },
  { name: "MLOps Pipelines", status: "Coming Soon" },
  { name: "AI/ML Applied Research", status: "Coming Soon" }
];
