import { useRef, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  motion as Motion,
  useInView,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ThemeToggle } from '../context/ThemeContext.jsx'
import { useTheme } from '../context/theme.js'

// ─── Constants ────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1]
const DEFAULT_BACK_SECTION = 'projects'

function usePortfolioBackLink() {
  const navigate = useNavigate()
  const { state } = useLocation()
  const sectionId = state?.fromSection || state?.scrollToSection || DEFAULT_BACK_SECTION

  return {
    to: {
      pathname: '/',
      hash: `#${sectionId}`,
    },
    state: { scrollToSection: sectionId },
    onClick: (e) => {
      if (window.history.length > 1) {
        e.preventDefault()
        navigate(-1)
      }
    },
  }
}

const gradientText = {
  background: 'linear-gradient(130deg, #63b3ed 0%, #a78bfa 55%, #67e8f9 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}

// ─── Shared animation variants ────────────────────────────────────────────

const stagger = (delay = 0.13) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

const fadeUp = (delay = 0, distance = 28) => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, delay, ease: EASE } },
})

// ─── Reusable primitives ──────────────────────────────────────────────────

function FadeSection({ children, className = '', id }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <Motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger()}
      className={className}
    >
      {children}
    </Motion.section>
  )
}

function Up({ children, delay = 0, distance = 28, className = '' }) {
  return (
    <Motion.div variants={fadeUp(delay, distance)} className={className}>
      {children}
    </Motion.div>
  )
}

function Label({ color = 'text-blue-400', children }) {
  return (
    <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 ${color}`}>
      {children}
    </p>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────

function CaseStudyNav() {
  const backLink = usePortfolioBackLink()
  const { dark } = useTheme()
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], [
    'rgba(0,0,0,0)',
    dark ? 'rgba(5,10,20,0.92)' : 'rgba(238,242,249,0.92)',
  ])
  const borderOp = useTransform(scrollY, [0, 80], [
    'rgba(0,0,0,0)',
    dark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.09)',
  ])

  return (
    <Motion.nav
      style={{ backgroundColor: bg, borderBottomColor: borderOp }}
      className="fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-xl"
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to={backLink.to}
          state={backLink.state}
          onClick={backLink.onClick}
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium"
        >
          <span aria-hidden>←</span> Back to Portfolio
        </Link>
        <div className="hidden sm:flex items-center gap-6">
          {[
            { label: 'Architecture', href: '#architecture' },
            { label: 'Outcomes', href: '#outcomes' },
            { label: 'Stack', href: '#stack' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 font-medium"
            >
              {label}
            </a>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </Motion.nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────

function Hero() {
  const backLink = usePortfolioBackLink()
  return (
    <section className="relative pt-36 pb-24 px-6 overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '18%', top: '35%', width: 560, height: 560,
            background: 'radial-gradient(circle, rgba(99,179,237,0.13), transparent 70%)',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '82%', top: '55%', width: 440, height: 440,
            background: 'radial-gradient(circle, rgba(167,139,250,0.10), transparent 70%)',
            transform: 'translate(-50%,-50%)',
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#050a14] via-transparent to-[#050a14]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
        >
          <Motion.p
            variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } } }}
            className="text-xs font-bold tracking-[0.22em] uppercase text-violet-400 mb-6"
          >
            Internship Case Study &nbsp;·&nbsp; Metro South Chamber of Commerce
          </Motion.p>

          <Motion.h1
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } } }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-tight tracking-tight mb-6"
          >
            AI Chatbot Assistant System
            <br />
            <span style={gradientText}>for Metro South Chamber</span>
          </Motion.h1>

          <Motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE } } }}
            className="text-xl text-slate-400 leading-relaxed max-w-xl mx-auto mb-5"
          >
            Designing and building two AI-powered assistants to improve internal workflows and public information access.
          </Motion.p>

          <Motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE } } }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            During my internship at the Metro South Chamber of Commerce, I built two AI chatbot systems: an internal AI assistant for Chamber staff over accreditation documents, and a public-facing website chatbot for visitors and members. Both used a retrieval-grounded (RAG) approach with gpt-4o-mini, strict grounding, and fallback handling to prevent hallucinations. A major component was processing newsletter PDFs and website content into a searchable knowledge base. The project was presented at the Student Arts & Research Symposium (StARS) at Bridgewater State University with a live demo.
          </Motion.p>

          <Motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#architecture"
              className="px-7 py-3.5 rounded-full bg-violet-500 text-white text-sm font-bold shadow-[0_0_28px_rgba(139,92,246,0.35)] hover:bg-violet-400 hover:shadow-[0_0_36px_rgba(167,139,250,0.45)] transition-all duration-200"
            >
              View Architecture
            </a>
            <a
              href="#outcomes"
              className="px-7 py-3.5 rounded-full border border-white/12 hover:border-white/25 text-slate-300 hover:text-white text-sm font-bold transition-colors duration-200"
            >
              Key Outcomes
            </a>
            <Link
              to={backLink.to}
              state={backLink.state}
              onClick={backLink.onClick}
              className="px-7 py-3.5 rounded-full border border-white/12 hover:border-white/25 text-slate-300 hover:text-white text-sm font-bold transition-colors duration-200"
            >
              ← Back to Portfolio
            </Link>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  )
}

// ─── Project Snapshot ─────────────────────────────────────────────────────

const SNAPSHOT_ITEMS = [
  { label: 'Organization', value: 'Metro South Chamber of Commerce' },
  { label: 'Role', value: 'AI Chatbot Developer Intern' },
  { label: 'Duration', value: 'Jan 2026 – May 2026' },
  { label: 'Systems Built', value: '2 AI Chatbot Systems' },
  { label: 'Focus Areas', value: 'RAG · gpt-4o-mini · FastAPI · Prompt Engineering' },
  { label: 'Status', isStatus: true },
]

function ProjectSnapshot() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-blue-400">Overview</Label>
          <h2 className="text-3xl font-extrabold text-white">Project Snapshot</h2>
        </Up>
        <Motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={stagger(0.07)}>
          {SNAPSHOT_ITEMS.map((item) => (
            <Motion.div
              key={item.label}
              variants={fadeUp()}
              whileHover={{ borderColor: 'rgba(255,255,255,0.12)' }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/7 p-6"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-2">
                {item.label}
              </p>
              {item.isStatus ? (
                <div className="flex flex-col gap-1.5">
                  <span className="inline-flex items-center gap-2 text-base font-semibold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                    Internal: Delivered
                  </span>
                  <span className="inline-flex items-center gap-2 text-base font-semibold text-blue-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    Public Bot: Deployment-ready
                  </span>
                </div>
              ) : (
                <p className="text-base font-semibold text-white leading-snug">{item.value}</p>
              )}
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </FadeSection>
  )
}

// ─── The Challenge ─────────────────────────────────────────────────────────

function Challenge() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Up className="text-center mb-10">
          <Label color="text-cyan-400">Context</Label>
          <h2 className="text-3xl font-extrabold text-white">The Challenge</h2>
        </Up>
        <Up>
          <div
            className="rounded-3xl border border-white/8 p-8 sm:p-12 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div className="pointer-events-none absolute -right-16 -top-14 h-60 w-60 rounded-full bg-blue-500/8 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-violet-500/8 blur-3xl" aria-hidden />

            <div className="relative grid md:grid-cols-2 gap-10 mb-10">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-blue-400 mb-4">Internal Problem</p>
                <p className="text-base text-slate-300 leading-relaxed">
                  Staff handling accreditation needed to cross-reference long documents, past applications, and best practice guides simultaneously. It was a slow, manual, error-prone process with a real deadline.
                </p>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-violet-400 mb-4">Public Problem</p>
                <p className="text-base text-slate-300 leading-relaxed">
                  Visitors and members on the Chamber website had no fast way to get answers about events, membership, or services. Missed engagement and repeated staff inquiries were the result.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-white/7">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-3">The Goal</p>
              <p className="text-lg font-semibold text-white leading-relaxed">
                Build two AI systems that solve real organizational problems. Not just demos, but tools people actually use.
              </p>
            </div>
          </div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── The Two Systems ───────────────────────────────────────────────────────

const SYSTEMS = [
  {
    number: '01',
    label: 'Internal Tool',
    title: 'Accreditation Assistant',
    desc: 'An internal AI assistant for Chamber staff over accreditation documents, using a RAG approach with gpt-4o-mini, strict grounding, and fallback handling to prevent hallucinations.',
    points: [
      'Compares 2026 accreditation questions against 2015 completed responses',
      'Identifies gaps, new requirements, and structural differences',
      'Pulls U.S. Chamber best practice examples for stronger answers',
      'Structured output: 2015 reference → 2026 question → recommendation',
    ],
    accent: '#63b3ed',
    glow: 'rgba(99,179,237,0.12)',
    borderHover: 'rgba(99,179,237,0.22)',
    labelColor: 'text-blue-400',
  },
  {
    number: '02',
    label: 'Public-Facing',
    title: 'Website Chatbot',
    desc: 'A FastAPI-powered public-facing website chatbot for visitors and members. Retrieval-grounded with gpt-4o-mini, strict grounding, and fallback handling to prevent hallucinations.',
    points: [
      'Answers questions scoped strictly to official MSCC website content',
      'Newsletter PDFs and website content processed into a searchable knowledge base',
      'Fallback handling for out-of-domain queries with no hallucinations',
      'Chatbot bubble UI designed for website embedding',
    ],
    accent: '#a78bfa',
    glow: 'rgba(167,139,250,0.12)',
    borderHover: 'rgba(167,139,250,0.22)',
    labelColor: 'text-violet-400',
  },
]

function TwoSystems() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-violet-400">What I Built</Label>
          <h2 className="text-3xl font-extrabold text-white">Two Systems, One Internship</h2>
        </Up>
        <Motion.div className="grid md:grid-cols-2 gap-5" variants={stagger(0.1)}>
          {SYSTEMS.map((sys) => (
            <Motion.div
              key={sys.number}
              variants={fadeUp()}
              whileHover={{
                y: -8,
                boxShadow: `0 28px 60px ${sys.glow}`,
                borderColor: sys.borderHover,
              }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-white/7 p-8 flex flex-col gap-6"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-5xl font-black leading-none select-none"
                  style={{ color: sys.accent, opacity: 0.18 }}
                >
                  {sys.number}
                </span>
                <div>
                  <p className={`text-xs font-bold tracking-[0.18em] uppercase mb-1 ${sys.labelColor}`}>
                    {sys.label}
                  </p>
                  <h3 className="text-xl font-extrabold text-white">{sys.title}</h3>
                </div>
              </div>

              <p className="text-base text-slate-400 leading-relaxed">{sys.desc}</p>

              <ul className="space-y-3">
                {sys.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-base text-slate-300 leading-relaxed">
                    <span
                      className="mt-[5px] flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: sys.accent }}
                    />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </FadeSection>
  )
}

// ─── Internal Assistant Flow ───────────────────────────────────────────────

const INTERNAL_STEPS = [
  {
    step: '01',
    title: 'Collect & Organize Source Material',
    desc: 'Gathered the 2015 completed accreditation application and integrated all supporting attachments: governance, HR, finance, and operational documents.',
    accent: '#63b3ed',
  },
  {
    step: '02',
    title: 'Extract 2026 Questions',
    desc: 'Manually extracted and restructured accreditation questions from a locked online portal that couldn\'t be scraped, turning inaccessible content into a clean, usable document.',
    accent: '#a78bfa',
  },
  {
    step: '03',
    title: 'Integrate Best Practice References',
    desc: 'Added U.S. Chamber best practice example documents, manually merging large PDFs when free online tools failed to handle the file size.',
    accent: '#67e8f9',
  },
  {
    step: '04',
    title: 'Engineer the System Instructions',
    desc: 'Built detailed prompts guiding the AI to compare questions, detect new requirements, identify gaps in past responses, and suggest stronger, structured answers.',
    accent: '#63b3ed',
  },
  {
    step: '05',
    title: 'Deliver for Staff Testing',
    desc: 'Packaged and delivered the assistant with clear response structure: 2015 MSCC reference → current 2026 question → best practice recommendation.',
    accent: '#a78bfa',
  },
]

function InternalFlow() {
  return (
    <FadeSection id="internal-system" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-blue-400">System One · Deep Dive</Label>
          <h2 className="text-3xl font-extrabold text-white">How the Internal Assistant Works</h2>
        </Up>

        {/* 3-col info strip */}
        <Up className="mb-10">
          <div
            className="rounded-2xl border border-blue-500/18 p-6 sm:p-8"
            style={{ background: 'rgba(99,179,237,0.04)' }}
          >
            <div className="grid md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/6">
              {[
                {
                  color: 'text-blue-400',
                  heading: 'Input',
                  body: '2026 accreditation question + 2015 completed responses + U.S. Chamber best practices',
                },
                {
                  color: 'text-violet-400',
                  heading: 'Processing',
                  body: 'Cross-referencing, gap detection, and recommendation generation via engineered AI instructions',
                },
                {
                  color: 'text-cyan-400',
                  heading: 'Output',
                  body: 'Structured 3-part guidance: past answer → current question → recommended approach',
                },
              ].map(({ color, heading, body }) => (
                <div key={heading} className="pt-6 md:pt-0 md:px-6 first:pt-0 first:pl-0 last:pr-0">
                  <p className={`text-xs font-bold tracking-[0.18em] uppercase mb-2 ${color}`}>{heading}</p>
                  <p className="text-base text-slate-300 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Up>

        {/* Step-by-step flow */}
        <Motion.div className="relative" variants={stagger(0.1)}>
          <div
            className="absolute left-[22px] top-6 bottom-6 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, rgba(99,179,237,0.4), rgba(167,139,250,0.4), rgba(103,232,249,0.3))' }}
          />
          <div className="flex flex-col gap-4">
            {INTERNAL_STEPS.map((s, i) => (
              <Motion.div
                key={s.step}
                variants={fadeUp(i * 0.05)}
                whileHover={{ x: 4, borderColor: `${s.accent}30` }}
                transition={{ duration: 0.2 }}
                className="relative sm:pl-14 rounded-2xl border border-white/7 p-6 sm:p-7"
                style={{ background: 'rgba(255,255,255,0.025)' }}
              >
                <div
                  className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full"
                  style={{
                    background: s.accent,
                    boxShadow: `0 0 12px ${s.accent}80`,
                    transform: 'translate(-5px, -50%)',
                  }}
                />
                <div className="flex items-start gap-5">
                  <span
                    className="text-xs font-black tracking-widest mt-0.5 flex-shrink-0 select-none"
                    style={{ color: s.accent, opacity: 0.5 }}
                  >
                    {s.step}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">{s.title}</h3>
                    <p className="text-base text-slate-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </FadeSection>
  )
}

// ─── Website Chatbot Architecture ─────────────────────────────────────────

const ARCH_NODES = [
  { label: 'User Message', bg: 'rgba(99,179,237,0.14)', border: 'rgba(99,179,237,0.38)', color: '#93c5fd', glow: 'rgba(99,179,237,0.4)' },
  { label: 'Chat Bubble UI', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.14)', color: '#94a3b8', glow: 'rgba(148,163,184,0.3)' },
  { label: 'FastAPI Backend', bg: 'rgba(103,232,249,0.12)', border: 'rgba(103,232,249,0.32)', color: '#67e8f9', glow: 'rgba(103,232,249,0.38)' },
  { label: 'OpenAI API', bg: 'rgba(167,139,250,0.14)', border: 'rgba(167,139,250,0.38)', color: '#c4b5fd', glow: 'rgba(167,139,250,0.42)' },
  { label: 'Scoped MSCC Content', bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.14)', color: '#94a3b8', glow: 'rgba(148,163,184,0.3)' },
  { label: 'Response', bg: 'rgba(103,232,249,0.14)', border: 'rgba(103,232,249,0.38)', color: '#67e8f9', glow: 'rgba(103,232,249,0.42)' },
]

function ArchFlow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [active, setActive] = useState(-1)

  useEffect(() => {
    if (!inView) return
    let cancelled = false

    const run = () => {
      let i = 0
      const step = () => {
        if (cancelled) return
        setActive(i)
        i++
        if (i < ARCH_NODES.length) {
          setTimeout(step, 270)
        } else {
          setTimeout(() => {
            if (!cancelled) {
              setActive(-1)
              setTimeout(() => { if (!cancelled) run() }, 900)
            }
          }, 700)
        }
      }
      setTimeout(step, 500)
    }
    run()
    return () => { cancelled = true }
  }, [inView])

  return (
    <div ref={ref} className="flex flex-col items-center gap-0 w-full max-w-[240px]">
      {ARCH_NODES.map((node, i) => {
        const lit = active >= i
        return (
          <div key={node.label} className="flex flex-col items-center w-full">
            <Motion.div
              animate={{
                background: lit ? node.bg : 'rgba(255,255,255,0.03)',
                borderColor: lit ? node.border : 'rgba(255,255,255,0.07)',
                color: lit ? node.color : '#475569',
                boxShadow: lit ? `0 0 16px ${node.glow}` : '0 0 0px transparent',
              }}
              transition={{ duration: 0.3 }}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-center border"
            >
              {node.label}
            </Motion.div>
            {i < ARCH_NODES.length - 1 && (
              <Motion.div
                className="w-px"
                animate={{
                  background: lit
                    ? `linear-gradient(to bottom, ${node.border}, rgba(255,255,255,0.05))`
                    : 'rgba(255,255,255,0.05)',
                }}
                style={{ height: 20 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

const CHATBOT_CAPABILITIES = [
  { icon: '📅', title: 'Events & Registration', desc: 'Upcoming events, registration details, dates, and sign-up info.' },
  { icon: '🤝', title: 'Membership', desc: 'Benefits, tiers, how to join, and what membership includes.' },
  { icon: '💼', title: 'Business Resources', desc: 'Programs, services, and tools available to Chamber members.' },
  { icon: '📍', title: 'Contact & Location', desc: 'Office address, contact info, and how to reach the Chamber.' },
  { icon: '🏛️', title: 'Chamber Purpose', desc: 'What MSCC is, its mission, and how it serves the community.' },
  { icon: '🚫', title: 'Graceful Fallback', desc: 'Out-of-scope queries handled cleanly with no hallucinations.' },
]

function WebsiteChatbot() {
  return (
    <FadeSection id="architecture" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-violet-400">System Two · Deep Dive</Label>
          <h2 className="text-3xl font-extrabold text-white">How the Website Chatbot Works</h2>
        </Up>

        <Up className="mb-10">
          <Motion.div
            whileHover={{ boxShadow: '0 0 80px rgba(167,139,250,0.08)' }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-white/8 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/7">
              {/* Left: Architecture Flow */}
              <div className="px-8 py-10 flex flex-col items-center">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em] mb-8">
                  Request Flow
                </p>
                <ArchFlow />
              </div>

              {/* Right: Build Details */}
              <div className="px-8 py-10 flex flex-col gap-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em] mb-2">
                  What I Built
                </p>
                {[
                  { label: 'FastAPI backend', desc: 'Request routing, validation, and OpenAI integration' },
                  { label: 'OpenAI API connection', desc: 'gpt-4o-mini responses scoped to official MSCC content' },
                  { label: 'Structured knowledge files', desc: 'Newsletter PDFs and website content processed into a searchable knowledge base' },
                  { label: 'Conversation memory', desc: 'Short-term context window for multi-turn follow-ups' },
                  { label: 'Chatbot bubble UI', desc: 'Floating React interface designed for website embedding' },
                  { label: 'Scope enforcement', desc: 'System-level instructions prevent out-of-domain answers' },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex gap-3 items-start">
                    <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-violet-400/55 flex-shrink-0" />
                    <p className="text-base text-slate-300 leading-relaxed">
                      <span className="font-semibold text-white">{label}</span>
                      <span className="text-slate-500">: {desc}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Motion.div>
        </Up>

        {/* Capabilities Grid */}
        <Up>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em] mb-6 text-center">
            Chatbot Capabilities
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CHATBOT_CAPABILITIES.map((cap) => (
              <Motion.div
                key={cap.title}
                whileHover={{ y: -5, borderColor: 'rgba(167,139,250,0.2)' }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-white/7 p-5"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div className="text-2xl mb-3" aria-hidden>{cap.icon}</div>
                <h3 className="text-sm font-bold text-white mb-1.5">{cap.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{cap.desc}</p>
              </Motion.div>
            ))}
          </div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── Challenges ────────────────────────────────────────────────────────────

const CHALLENGES = [
  {
    icon: '◈',
    title: 'Unstructured Knowledge Base',
    desc: 'Converting scattered website content, PDFs, and organizational documents into a clean, queryable structure required careful curation and judgment about what to include.',
    accent: '#63b3ed',
  },
  {
    icon: '◉',
    title: 'Locked Accreditation Portal',
    desc: 'The 2026 accreditation questions lived behind a locked portal that couldn\'t be scraped. Manual extraction and restructuring was the only viable path.',
    accent: '#a78bfa',
  },
  {
    icon: '◍',
    title: 'PDF Merging at Scale',
    desc: 'Free tools couldn\'t handle the volume of large best-practice PDFs. Manual merging, reformatting, and document organization added significant prep work.',
    accent: '#67e8f9',
  },
  {
    icon: '◎',
    title: 'Prompt Refinement',
    desc: 'Getting the bot to produce consistently structured and useful output required many iterations of prompt engineering, balancing depth with precision.',
    accent: '#63b3ed',
  },
  {
    icon: '◐',
    title: 'Scope Control',
    desc: 'Preventing the chatbot from answering out-of-domain questions without breaking conversational flow required careful system instruction design and testing.',
    accent: '#a78bfa',
  },
  {
    icon: '◑',
    title: 'Memory & State Debugging',
    desc: 'Debugging conversation memory between the React frontend and FastAPI backend: session state, context passing, and edge cases in multi-turn dialogue.',
    accent: '#67e8f9',
  },
]

function Challenges() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-cyan-400">Engineering Reality</Label>
          <h2 className="text-3xl font-extrabold text-white">Challenges I Solved</h2>
        </Up>
        <Motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={stagger(0.07)}>
          {CHALLENGES.map((c) => (
            <Motion.div
              key={c.title}
              variants={fadeUp()}
              whileHover={{
                y: -8,
                borderColor: `${c.accent}28`,
                boxShadow: `0 24px 52px ${c.accent}14`,
              }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl border border-white/7 p-6 flex flex-col gap-4"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <span className="text-2xl" style={{ color: c.accent }} aria-hidden>{c.icon}</span>
              <div>
                <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{c.desc}</p>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </FadeSection>
  )
}

// ─── Tech Stack ────────────────────────────────────────────────────────────

const TECH_ITEMS = [
  { name: 'Python', icon: '⟨⟩', color: '#63b3ed' },
  { name: 'FastAPI', icon: '⚡', color: '#67e8f9' },
  { name: 'OpenAI API', icon: '◈', color: '#a78bfa' },
  { name: 'gpt-4o-mini', icon: '✦', color: '#c4b5fd' },
  { name: 'Prompt Eng.', icon: '◉', color: '#63b3ed' },
  { name: 'RAG Retrieval', icon: '◍', color: '#a78bfa' },
  { name: 'NLP', icon: '◎', color: '#67e8f9' },
  { name: 'React / UI', icon: '◐', color: '#63b3ed' },
  { name: 'Content Files', icon: '◑', color: '#a78bfa' },
  { name: 'Chat Bubble UI', icon: '◒', color: '#67e8f9' },
]

function TechStack() {
  return (
    <FadeSection id="stack" className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Up className="mb-12">
          <Label color="text-violet-400">Tools &amp; Technologies</Label>
          <h2 className="text-3xl font-extrabold text-white">Tech Stack</h2>
        </Up>
        <Motion.div className="flex flex-wrap justify-center gap-4" variants={stagger(0.05)}>
          {TECH_ITEMS.map((item, i) => (
            <Motion.div
              key={item.name}
              variants={fadeUp(i * 0.04)}
              whileHover={{
                y: -10,
                scale: 1.07,
                boxShadow: `0 0 28px ${item.color}40`,
                borderColor: `${item.color}40`,
              }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-2.5 px-6 py-5 rounded-2xl border border-white/7 min-w-[100px] cursor-default select-none"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <span className="text-xl" style={{ color: item.color }} aria-hidden>{item.icon}</span>
              <span className="text-base font-semibold text-slate-400">{item.name}</span>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </FadeSection>
  )
}

// ─── Key Outcomes ──────────────────────────────────────────────────────────

const OUTCOMES = [
  {
    metric: '2',
    unit: 'AI Systems',
    desc: 'Two AI assistants built for real organizational use, not demos.',
    accent: '#63b3ed',
  },
  {
    metric: '↓',
    unit: 'Manual Work',
    desc: 'Reduced manual document lookup for accreditation staff significantly.',
    accent: '#a78bfa',
  },
  {
    metric: 'MVP',
    unit: 'Shipped',
    desc: 'Public chatbot reached a deployment-ready stage for visitors and members.',
    accent: '#67e8f9',
  },
  {
    metric: '✓',
    unit: 'Staff Testing',
    desc: 'Internal tool delivered and tested against a real accreditation deadline.',
    accent: '#63b3ed',
  },
]

function KeyOutcomes() {
  return (
    <FadeSection id="outcomes" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-blue-400">Results</Label>
          <h2 className="text-3xl font-extrabold text-white">Key Outcomes</h2>
        </Up>

        <Motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" variants={stagger(0.08)}>
          {OUTCOMES.map((o) => (
            <Motion.div
              key={o.unit}
              variants={fadeUp()}
              whileHover={{
                y: -8,
                boxShadow: `0 20px 50px ${o.accent}20`,
                borderColor: `${o.accent}28`,
              }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl border border-white/7 p-6 text-center"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <div
                className="text-4xl font-black mb-1 leading-none"
                style={{ color: o.accent }}
              >
                {o.metric}
              </div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-400 mb-3">
                {o.unit}
              </p>
              <p className="text-base text-slate-400 leading-relaxed">{o.desc}</p>
            </Motion.div>
          ))}
        </Motion.div>

        <Up>
          <div
            className="rounded-2xl border border-emerald-500/18 p-6 sm:p-8"
            style={{ background: 'rgba(16,185,129,0.04)' }}
          >
            <div className="flex items-start gap-4">
              <span className="text-emerald-400 text-xl mt-0.5 flex-shrink-0" aria-hidden>◈</span>
              <p className="text-base text-slate-200 leading-relaxed">
                <strong className="text-white">This project applied AI to a live organizational workflow,</strong> not a classroom exercise. The systems were designed with real users, real data, and real deadlines as constraints. That distinction matters.
              </p>
            </div>
          </div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── What I Learned ────────────────────────────────────────────────────────

const LESSONS = [
  {
    title: 'Translating AI ideas into usable systems',
    desc: 'There\'s a large gap between "this could work with AI" and building something people trust and use. System design, UX, and edge case handling matter just as much as model choice.',
    accent: '#63b3ed',
  },
  {
    title: 'Scope control is a feature, not a limitation',
    desc: 'Restricting what a chatbot answers is not a weakness. It\'s what makes it reliable in production. A well-scoped assistant consistently outperforms a general one in organizational contexts.',
    accent: '#a78bfa',
  },
  {
    title: 'Data quality drives output quality',
    desc: 'No amount of prompt engineering compensates for poorly organized knowledge. The work of curating, structuring, and cleaning content is foundational, not optional.',
    accent: '#67e8f9',
  },
]

function WhatILearned() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-cyan-400">Reflection</Label>
          <h2 className="text-3xl font-extrabold text-white">What I Learned</h2>
        </Up>
        <Motion.div className="flex flex-col gap-4" variants={stagger(0.1)}>
          {LESSONS.map((l, i) => (
            <Motion.div
              key={l.title}
              variants={fadeUp(i * 0.05)}
              whileHover={{ x: 4, borderColor: `${l.accent}30` }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/7 p-7 flex gap-6 items-start"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <span
                className="text-2xl font-black flex-shrink-0 mt-0.5 select-none"
                style={{ color: l.accent, opacity: 0.6 }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-base font-bold text-white mb-2">{l.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{l.desc}</p>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </FadeSection>
  )
}

// ─── Final CTA ─────────────────────────────────────────────────────────────

function FinalCTA() {
  const backLink = usePortfolioBackLink()
  return (
    <FadeSection className="py-20 px-6 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(99,179,237,0.06), transparent 70%)',
        }}
        aria-hidden
      />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <Up>
          <Motion.div
            whileHover={{ borderColor: 'rgba(99,179,237,0.15)', boxShadow: '0 0 60px rgba(99,179,237,0.07)' }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-white/7 px-8 py-14"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.14), transparent)' }} aria-hidden />

            <p className="text-xs font-bold tracking-[0.22em] uppercase text-violet-400 mb-4 relative">
              Want to see more?
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight relative leading-tight">
              Interested in my work?
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10 relative max-w-sm mx-auto">
              I&apos;m open to AI engineering roles, research collaborations, and real-world AI systems projects.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 relative">
              <Link
                to={backLink.to}
                state={backLink.state}
                onClick={backLink.onClick}
                className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-8 py-4 text-base font-bold text-white shadow-[0_0_28px_rgba(139,92,246,0.35)] hover:bg-violet-400 hover:shadow-[0_0_36px_rgba(167,139,250,0.45)] transition-all duration-200"
              >
                ← Back to Portfolio
              </Link>
              <a
                href="mailto:muhammadovaisyusuf@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/12 hover:border-white/25 px-8 py-4 text-base font-bold text-slate-300 hover:text-white transition-colors duration-200"
              >
                Get in Touch
              </a>
            </div>
          </Motion.div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── Footer ─────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 text-center px-6">
      <p className="text-sm text-slate-700 tracking-wide">
        © {new Date().getFullYear()} &nbsp;·&nbsp; Built with React, Tailwind CSS &amp; Framer Motion
      </p>
    </footer>
  )
}

// ─── Page Export ─────────────────────────────────────────────────────────────

export default function MSCCCaseStudyPage() {
  return (
    <div className="min-h-screen bg-[#050a14]">
      <CaseStudyNav />
      <Hero />
      <ProjectSnapshot />
      <Challenge />
      <TwoSystems />
      <InternalFlow />
      <WebsiteChatbot />
      <Challenges />
      <TechStack />
      <KeyOutcomes />
      <WhatILearned />
      <FinalCTA />
      <Footer />
    </div>
  )
}
