export interface EducationItem {
  degree: string;
  major: string;
  institution: string;
  period: string;
  coursework: string[];
  highlights: string[];
}

export const education: EducationItem[] = [
  {
    degree: "Integrated M.Sc. IT",
    major: "Computer Science",
    institution: "L.J. University",
    period: "March 2024 - April 2028 (Expected)",
    coursework: ["Advanced Software Engineering", "Artificial Intelligence Foundations", "Data Structures & Algorithms"],
    highlights: ["Currently focused on deep learning applications and LLM agent architectures."]
  },
  {
    degree: "B.Sc. IT",
    major: "Computer Science",
    institution: "L.J. University",
    period: "Completed",
    coursework: ["Database Management Systems", "Object-Oriented Programming", "Web Development Foundations"],
    highlights: ["Graduated with strong foundations in computer science theory and database management systems."]
  }
];
