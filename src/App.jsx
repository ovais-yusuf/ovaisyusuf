import { useState } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./context/ThemeContext.jsx";
import {
  timeline,
  skillGroups,
  projects,
  EMAIL,
  LINKEDIN,
  GITHUB,
  SCHOLAR,
  FRONTIERS_PAPER,
} from "./data.js";
import "./portfolio.css";

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: (
      <>
        <path d="M7 17 17 7M7 7h10v10" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    github: (
      <>
        <path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1-.3-2-1-2.5 4-.4 6-2 6-5.5 0-1.5-.5-2.6-1.5-3.5.3-1 .3-2 0-3.5-1.5 0-3 1-3.5 1.5a12 12 0 0 0-6 0C8 3.5 6.5 3 5 3c-.3 1.5-.3 2.5 0 3.5C4 7.4 3.5 8.5 3.5 10c0 3.5 2 5.1 6 5.5C9 16 9 17 9 18v4" />
      </>
    ),
    linkedin: (
      <>
        <rect x="3" y="8" width="4" height="13" rx=".5" />
        <circle cx="5" cy="4" r="1.5" />
        <path d="M11 21V8h4v2c2-3 7-2 7 3v8h-4v-7c0-3-3-3-3 0v7z" />
      </>
    ),
    code: (
      <>
        <path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18" />
      </>
    ),
    vision: (
      <>
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    chat: (
      <>
        <path d="M21 11a8 8 0 0 1-8 8H6l-4 3V11a9 9 0 0 1 19 0Z" />
        <path d="M7 10h10M7 14h6" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
    book: (
      <>
        <path d="M12 5v16M12 5C8 2 3 3 2 3v16c5-1 7 0 10 2 3-2 5-3 10-2V3c-5-1-7 0-10 2Z" />
      </>
    ),
    menu: (
      <>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M6 18 18 6" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.code}
    </svg>
  );
}
const sections = [
  ["about", "About"],
  ["experience", "Career"],
  ["skills", "Expertise"],
  ["projects", "Work"],
  ["research", "Research"],
  ["contact", "Contact"],
];
const RESUME_URL = "/ovais-yusuf-resume.pdf";
function Socials() {
  return (
    <div className="socials">
      {[
        [GITHUB, "GitHub", "github"],
        [LINKEDIN, "LinkedIn", "linkedin"],
        [`mailto:${EMAIL}`, "Email", "mail"],
      ].map(([href, label, icon]) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...(href.startsWith("https")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          <Icon name={icon} />
        </a>
      ))}
    </div>
  );
}
function Eyebrow({ children }) {
  return (
    <p className="eyebrow">
      <span />
      {children}
    </p>
  );
}
function SectionHeader({ label, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{label}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {children && <p className="section-intro">{children}</p>}
    </div>
  );
}
function Tags({ items }) {
  return (
    <ul className="tags">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-inner">
        <a href="#top" className="brand" aria-label="Ovais Yusuf — home">
          <span className="brand-mark">OY</span>
          <span>
            Ovais<span className="accent">.</span>
          </span>
        </a>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="button button-dark nav-contact" href="#contact">
            <Icon name="mail" size={16} />
            <span>Get in Touch</span>
          </a>
          <button
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="section-nav"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
        {open && (
          <nav
            id="section-nav"
            className="section-nav"
            aria-label="Main navigation"
          >
            {sections.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
function Hero() {
  return (
    <section id="top" className="container hero-section">
      <div className="hero-grid">
        <div className="identity-panel">
          <p className="availability">
            <span />
            Available for opportunities
          </p>
          <h1 className="hero-name">
            Ovais Yusuf<span className="accent">.</span>
          </h1>

          <p className="hero-role">
            <Icon name="code" />
            AI/ML Engineer
          </p>
          <p className="hero-description">
            Building intelligent systems across{" "}
            <strong>
              computer vision, machine learning, LLM applications,
            </strong>{" "}
            and research-driven automation.
          </p>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href={RESUME_URL}
              target="_blank"
              rel="noreferrer"
            >
              View Resume <Icon name="arrow" size={18} />
            </a>
          </div>
          <Socials />
        </div>
        <div id="about" className="about-panel">
          <Eyebrow>About</Eyebrow>
          <p className="about-statement">
            I specialize in <strong>building AI/ML systems</strong> and
            research-driven software people can actually use.
          </p>
          <div className="focus-area">
            <p>Currently focused on</p>
            <ul>
              <li>Computer Vision</li>
              <li>Machine Learning</li>
              <li>LLM Applications</li>
              <li>AI Automation</li>
              <li>Formal Verification</li>
            </ul>
          </div>
          <a
            className="button button-primary"
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
          >
            View LinkedIn <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
function Experience() {
  return (
    <section id="experience" className="container page-section">
      <SectionHeader label="Career Path" title="Experience & Education">
        A chronological journey of my professional and academic development.
      </SectionHeader>
      <div className="career-grid">
        <div className="timeline">
          {timeline.map((item) => (
            <article key={item.role} className="timeline-item">
              <span className="timeline-marker">
                <img src={item.logo} alt="" />
              </span>
              <div className="experience-card">
                <div className="role-heading">
                  <h3>{item.role}</h3>
                  <p className="organization">
                    {item.org} <span>· {item.location}</span>
                  </p>
                  <p className="date-label">{item.period}</p>
                </div>
                <ul className="accomplishments">
                  {item.points.map((point) => (
                    <li key={point}>
                      <Icon name="check" size={16} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <Tags items={item.tags} />
              </div>
            </article>
          ))}
        </div>
        <aside className="education">
          <h3>
            <span className="icon-tile">
              <Icon name="book" />
            </span>
            Education
          </h3>
          <article className="education-card">
            <p className="date-label">Graduate studies</p>
            <h4>M.S. Computer Science</h4>
            <p className="organization education-org">
              <img src={timeline[0].logo} alt="" />
              Bridgewater State University
            </p>
            <p>
              4.0 GPA. Graduate work in applied AI, computer vision, and systems
              that have to run outside a notebook.
            </p>
            <div className="education-footer">Bridgewater, Massachusetts</div>
          </article>
        </aside>
      </div>
    </section>
  );
}
function Skills() {
  return (
    <section id="skills" className="container page-section">
      <SectionHeader label="Expertise" title="Technical Stack">
        The tools I use to detect, retrieve, certify, and ship.
      </SectionHeader>
      <div className="skills-grid">
        {skillGroups.map((group, i) => (
          <article key={group.title} className={`skill-card skill-${i}`}>
            <div className="skill-title">
              <span className="icon-tile">
                <Icon name={["vision", "chat", "code", "book"][i]} size={26} />
              </span>
              <h3>{group.title}</h3>
            </div>
            <Tags items={group.items} />
            <div className="skill-rule" />
          </article>
        ))}
      </div>
    </section>
  );
}
function ProjectMedia({ project }) {
  if (project.id === "echo")
    return (
      <div className="project-cover echo-cover">
        <p className="cover-kicker">Echo Madrid / Ask Echo</p>
        <p className="cover-title">
          Your club.
          <br />
          Answers from data.
        </p>
        <p className="cover-note">Match results / Recent form / La Liga</p>
      </div>
    );
  if (project.id === "aerial")
    return (
      <div className="project-cover aerial-cover">
        <p className="cover-kicker">Computer vision / Language queries</p>
        <p className="cover-title">
          Aerial scenes.
          <br />
          Queryable insights.
        </p>
        <p className="cover-note">YOLOv8 / ByteTrack / Python</p>
      </div>
    );
  if (project.id === "lean")
    return (
      <div className="project-cover proof-cover">
        <p className="cover-kicker">Research / Formal methods</p>
        <p className="proof-title">
          From argument
          <br />
          to <span>checked proof.</span>
        </p>
        <ol aria-label="Certification workflow">
          <li>Decompose</li>
          <li>Build</li>
          <li>Review</li>
          <li>Lean check</li>
          <li>Merge</li>
        </ol>
        <p className="cover-note">Workflow overview · Lean 4</p>
      </div>
    );
  return (
    <div className={`project-cover ${project.id}-cover`}>
      <p className="cover-kicker">
        {project.id === "mscc"
          ? "Metro South Chamber of Commerce"
          : "FIFA World Cup 2026"}
      </p>
      <p className="cover-title">
        {project.id === "mscc" ? (
          <>
            Answers grounded
            <br />
            in your documents.
          </>
        ) : (
          <>
            Matchday
            <br />
            <span>Intelligence.</span>
          </>
        )}
      </p>
      <p className="cover-note">
        {project.id === "mscc"
          ? "Internal assistant + public website chatbot"
          : "Match state / Events / Reports"}
      </p>
    </div>
  );
}
function ProjectCard({ project }) {
  const route =
    project.id === "aerial"
      ? "/projects/drone-traffic"
      : project.id === "fifa"
        ? "/projects/wc26-matchday"
        : project.to;
  return (
    <article className="project-card">
      {project.media && (
        <div className="project-media">
          <ProjectMedia project={project} />
        </div>
      )}
      <div className="project-body">
        <p className="project-category">{project.category}</p>
        <Tags items={project.tags} />
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.outcome && (
          <p className="project-outcome">
            <Icon name="check" size={16} />
            {project.outcome}
          </p>
        )}
        <div className="project-footer">
          <span>{project.year}</span>
          <div>
            {project.source && (
              <a href={project.source} target="_blank" rel="noreferrer">
                GitHub <Icon name="arrow" size={16} />
              </a>
            )}
            {route && (
              <Link to={route} state={{ fromSection: "projects" }}>
                Case study <Icon name="arrow" size={16} />
              </Link>
            )}
            {project.href && (
              <a
                href={project.href}
                {...(project.href.startsWith("https")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {project.id === "lean"
                  ? "View research project"
                  : project.to
                    ? "Explore"
                    : "Live project"}
                <Icon name="arrow" size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
function Projects() {
  const [filter, setFilter] = useState("All Projects");
  const visible = projects.filter(
    (p) => filter === "All Projects" || p.filters.includes(filter),
  );
  return (
    <section id="projects" className="container page-section">
      <SectionHeader label="Selected Work" title="Featured Projects">
        Systems where detection, language, and proof have to stay honest.
      </SectionHeader>
      <div
        className="project-filters"
        role="group"
        aria-label="Filter projects"
      >
        {[
          "All Projects",
          "AI / ML",
          "Computer Vision",
          "Research",
          "Software",
        ].map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} projects shown
      </p>
      <div className="projects-grid">
        {visible.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
function Research() {
  return (
    <section id="research" className="container page-section">
      <SectionHeader label="Research" title="Research & Technical Work">
        Applied research across aerial imagery, language, and formal
        verification.
      </SectionHeader>
      <div className="research-grid">
        <article className="research-card">
          <div className="research-card-heading">
            <span className="icon-tile">
              <Icon name="book" />
            </span>
            <h3>Peer-reviewed publications</h3>
          </div>
          <p>
            12 publications: four journal articles, including IEEE Access and
            Frontiers in Neurorobotics, and eight IEEE conference papers. Most
            of the work is aerial detection, tracking, and recognition.
          </p>
          <ul className="publication-list">
            <li>
              <a href={FRONTIERS_PAPER} target="_blank" rel="noreferrer">
                Vehicle recognition pipeline via DeepSort on aerial image
                datasets <Icon name="arrow" size={16} />
              </a>
              <span>Frontiers in Neurorobotics, 2024</span>
            </li>
            <li>
              <a href={SCHOLAR} target="_blank" rel="noreferrer">
                Enhancing Vehicle Detection and Tracking in UAV Imagery{" "}
                <Icon name="arrow" size={16} />
              </a>
              <span>IEEE Access</span>
            </li>
          </ul>
          <a
            className="text-link"
            href={SCHOLAR}
            target="_blank"
            rel="noreferrer"
          >
            Google Scholar <Icon name="arrow" size={16} />
          </a>
        </article>
        <article className="research-card">
          <div className="research-card-heading">
            <span className="icon-tile">
              <Icon name="layers" />
            </span>
            <h3>Technical research</h3>
          </div>
          <ul className="research-items">
            <li>
              <h4>Aerial scene understanding capstone</h4>
              <p>
                Language-queryable detection and tracking over real aerial
                footage, grounded in YOLOv8 and ByteTrack.
              </p>
            </li>
            <li>
              <h4>Formal verification research</h4>
              <p>
                AI engineering work at Bridgewater State University from May to
                September 2026 on an automated Lean 4 certification workflow.
              </p>
            </li>
            <li>
              <h4>StARS research presentation</h4>
              <p>
                Presented the Metro South Chamber chatbot work at the Student
                Arts & Research Symposium at Bridgewater State University.
              </p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}
function Contact() {
  const [prepared, setPrepared] = useState(false);
  function onSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio inquiry from ${data.get("name")}`,
    );
    const body = encodeURIComponent(
      `${data.get("brief")}\n\nFrom: ${data.get("name")}\nEmail: ${data.get("email")}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setPrepared(true);
  }
  return (
    <section id="contact" className="container contact-section">
      <div className="contact-panel">
        <div className="contact-copy">
          <p className="availability">
            <span />
            Available for opportunities
          </p>
          <h2>
            Let’s build
            <br />
            <span>something intelligent.</span>
          </h2>
          <p className="contact-description">
            AI engineering, computer vision, machine learning, research
            collaboration, and software opportunities.
          </p>
          <a className="contact-email" href={`mailto:${EMAIL}`}>
            <span className="icon-tile">
              <Icon name="mail" />
            </span>
            <span>
              <small>Email me</small>
              {EMAIL}
            </span>
          </a>
          <Socials />
        </div>
        <form className="contact-form" onSubmit={onSubmit}>
          <div className="form-row">
            <label>
              Full name <span>*</span>
              <input
                name="name"
                autoComplete="name"
                placeholder="Your name"
                required
              />
            </label>
            <label>
              Email address <span>*</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <label>
            Your project brief <span>*</span>
            <textarea
              name="brief"
              placeholder="What are you looking to build?"
              rows="7"
              required
            />
          </label>
          <button className="button button-primary" type="submit">
            Prepare email <Icon name="arrow" size={18} />
          </button>
          <p className="form-note" role="status">
            {prepared
              ? "Your email draft is ready in your mail app. Review it there and send when ready."
              : "Opens your email app with a draft. You review and send it."}
          </p>
        </form>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Ovais Yusuf</p>
        <nav aria-label="Footer navigation">
          {sections.map(([id, label]) => (
            <a href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
        <p>Bridgewater, MA</p>
      </div>
    </footer>
  );
}
export default function App() {
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Experience />
        <Skills />
        <Projects />
        <Research />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
