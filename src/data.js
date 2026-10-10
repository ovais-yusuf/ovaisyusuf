import bsuLogo from "./assets/bsu.jpeg";
import msccLogo from "./assets/mscc.png";
import auLogo from "./assets/au.webp";

const MSCC_CASE_STUDY_PATH = "/projects/mscc-chatbot";
const CAPSTONE_URL =
  "https://aerial-scene-query-git-main-muhammads-projects-7dea6a81.vercel.app/";
const FIFA_URL = "https://wc26-matchday.vercel.app/";
const EMAIL = "muhammadovaisyusuf@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/muhammadovaisyusuf/";
const GITHUB = "https://github.com/ovais-yusuf";
const SCHOLAR = "https://scholar.google.com/citations?user=KLamYacAAAAJ&hl=en";
const FRONTIERS_PAPER =
  "https://www.frontiersin.org/journals/neurorobotics/articles/10.3389/fnbot.2024.1430155/full";

const timeline = [
  {
    role: "AI/ML Engineer - Aerial Scene Understanding (Graduate Research Assistant)",
    marker: "BSU",
    logo: bsuLogo,
    org: "Bridgewater State University",
    location: "Bridgewater, MA",
    period: "Sept 2026 – Current",
    points: [
      "Building a language-queryable aerial scene understanding system using computer vision and machine learning.",
      "Combining YOLOv8 detection and ByteTrack tracking to turn aerial video into persistent object detections and queryable scene data.",
    ],
    tags: ["Python", "PyTorch", "YOLOv8", "ByteTrack"],
  },
  {
    role: "AI Engineer - Automated Theorem Proving (Lean 4)",
    marker: "BSU",
    logo: bsuLogo,
    org: "Bridgewater State University",
    location: "Bridgewater, MA",
    period: "May 2026 – Sept 2026",
    points: [
      "Built an AI-assisted workflow for certifying mathematical arguments in Lean 4.",
      "Proof tasks are decomposed, constructed, reviewed independently, and merged only after Lean validation.",
    ],
    tags: ["Lean 4", "Python", "Formal verification"],
  },
  {
    role: "AI Developer",
    marker: "MSCC",
    logo: msccLogo,
    org: "Metro South Chamber of Commerce",
    location: "Brockton, MA",
    period: "Jan 2026 – May 2026",
    points: [
      "Built two retrieval-grounded systems: an internal assistant over accreditation documents, and a public website chatbot for visitors and members.",
      "Processed newsletter PDFs and website content into a searchable knowledge base, with strict grounding and fallback handling.",
      "Presented the work at the Student Arts & Research Symposium (StARS) at Bridgewater State University.",
    ],
    tags: ["FastAPI", "gpt-4o-mini", "RAG", "Python"],
  },
  {
    role: "Machine Learning Researcher",
    marker: "IMC",
    logo: auLogo,
    org: "IMC, Air University, Pakistan",
    location: "Islamabad",
    period: "Aug 2022 – Aug 2024",
    points: [
      "Contributed to research in computer vision, NLP, and autonomous systems, with a focus on aerial imagery.",
      "Published 12 peer-reviewed papers in IEEE journals, Frontiers, and international conferences.",
    ],
    tags: ["Computer vision", "PyTorch", "Aerial imagery"],
  },
];

const skillGroups = [
  {
    title: "AI & Computer Vision",
    items: [
      "Python",
      "PyTorch",
      "Scikit-learn",
      "YOLO",
      "YOLOv8",
      "ByteTrack",
      "OpenCV",
      "Aerial imagery",
    ],
  },
  {
    title: "LLM Applications",
    items: ["OpenAI API", "RAG", "gpt-4o-mini", "Prompt engineering"],
  },
  {
    title: "Software & Web",
    items: ["Next.js", "React", "JavaScript", "Python", "FastAPI"],
  },
  {
    title: "Research & Formal Methods",
    items: ["Lean 4", "Formal verification", "Git", "GitHub"],
  },
];

const projects = [
  {
    id: "echo",
    category: "AI / Sports Analytics",
    filters: ["AI / ML", "Software"],
    title: "Echo Madrid — Ask Echo",
    description:
      "A natural-language assistant for Real Madrid match results, recent form, and La Liga standings. An LLM tool-calling layer connects questions to a live PostgreSQL database through FastAPI.",
    outcome: "Answers grounded in match and standings data.",
    tags: ["FastAPI", "PostgreSQL", "LLM tool calling", "Railway"],
    year: "2026",
    href: "https://echo-madrid-production.up.railway.app/",
    source: "https://github.com/ovais-yusuf/echo-madrid",
    media: "echo",
  },
  {
    id: "aerial",
    category: "Computer Vision / AI",
    filters: ["AI / ML", "Computer Vision"],
    title: "Language-Queryable Aerial Scene Understanding",
    description:
      "Turns aerial video into persistent object detections and queryable scene data. Vehicles are detected with YOLOv8, tracked with ByteTrack, counted through zones, and queried in English only from those results.",
    outcome:
      "English questions are answered only from detection and tracking output.",
    tags: ["YOLOv8", "ByteTrack", "Python", "PyTorch"],
    year: "2026",
    href: CAPSTONE_URL,
    featured: true,
    media: "aerial-title",
  },
  {
    id: "lean",
    category: "Research / Formal Verification",
    filters: ["Research"],
    title: "Automated Mathematical Proof Certification",
    description:
      "An automated formal-verification workflow using Lean and AI-assisted proof tooling to decompose, review, validate, and certify mathematical arguments.",
    outcome: "Candidates are merged only after they typecheck in Lean 4.",
    tags: ["Lean 4", "AI-assisted theorem proving", "Automation"],
    year: "2026",
    href: "https://vignonoussa.com/nsf-research-summer-26-student-research-on-the-hrt-conjecture/",
    featured: true,
    media: "lean",
  },
  {
    id: "mscc",
    category: "AI / ML",
    filters: ["AI / ML"],
    title: "Metro South Chamber Chatbots",
    description:
      "Two FastAPI systems with gpt-4o-mini: an internal accreditation assistant and a public website chatbot. Answers stay inside chamber documents, or they do not go out.",
    outcome:
      "Presented at the Student Arts & Research Symposium (StARS) at Bridgewater State University.",
    tags: ["FastAPI", "OpenAI API", "RAG", "Python"],
    year: "2026",
    href: MSCC_CASE_STUDY_PATH,
    to: MSCC_CASE_STUDY_PATH,
    media: "poster",
  },
  {
    id: "fifa",
    category: "Software",
    filters: ["Software"],
    title: "FIFA WC26 Matchday Intelligence",
    description:
      "A live companion for the 2026 World Cup: match state, scores, events, lineups, formations, and post-match reports. After kickoff, the pipeline runs without editorial input.",
    tags: ["Next.js", "ESPN API", "API-Football", "Vercel"],
    year: "2026",
    href: FIFA_URL,
    media: "poster",
  },
];

export {
  timeline,
  skillGroups,
  projects,
  EMAIL,
  LINKEDIN,
  GITHUB,
  SCHOLAR,
  FRONTIERS_PAPER,
  CAPSTONE_URL,
  FIFA_URL,
};
