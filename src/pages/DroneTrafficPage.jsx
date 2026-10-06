import { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion as Motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ThemeToggle } from '../context/ThemeContext.jsx'
import { useTheme } from '../context/theme.js'
import outputVideo from '../../output-web.mp4'

// ─── Constants ────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1]
const VIDEO_SRC = outputVideo
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
            { label: 'Overview', href: '#overview' },
            { label: 'Technical', href: '#technical' },
            { label: 'Results', href: '#results' },
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
    <section className="relative pt-36 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '20%', top: '40%', width: 520, height: 520,
            background: 'radial-gradient(circle, rgba(103,232,249,0.10), transparent 70%)',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '80%', top: '55%', width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(167,139,250,0.09), transparent 70%)',
            transform: 'translate(-50%,-50%)',
          }}
        />
      </div>

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
            className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-400 mb-6"
          >
            Project Case Study &nbsp;·&nbsp; Computer Vision
          </Motion.p>

          <Motion.h1
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } } }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-tight tracking-tight mb-6"
          >
            Drone-Based Traffic Analysis
            <br />
            <span style={gradientText}>using YOLOv8 and Multi-Object Tracking</span>
          </Motion.h1>

          <Motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE } } }}
            className="text-xl text-slate-400 leading-relaxed max-w-xl mx-auto mb-5"
          >
            Real-time object detection and tracking in aerial footage.
          </Motion.p>

          <Motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE } } }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            Built a real-time computer vision pipeline to detect and track multiple objects in drone footage of a university campus.
          </Motion.p>

          <Motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#overview"
              className="px-7 py-3.5 rounded-full bg-cyan-500 text-white text-sm font-bold shadow-[0_0_28px_rgba(103,232,249,0.3)] hover:bg-cyan-400 hover:shadow-[0_0_36px_rgba(103,232,249,0.45)] transition-all duration-200"
            >
              View Overview
            </a>
            <a
              href="#results"
              className="px-7 py-3.5 rounded-full border border-white/12 hover:border-white/25 text-slate-300 hover:text-white text-sm font-bold transition-colors duration-200"
            >
              See Results
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

// ─── Snapshot ─────────────────────────────────────────────────────────────

function Snapshot() {
  const items = [
    { label: 'Domain', value: 'Computer Vision' },
    { label: 'Dataset', value: 'Aerial Drone Footage' },
    { label: 'Detection Model', value: 'YOLOv8 (Ultralytics)' },
    { label: 'Tracking', value: 'BoT-SORT / ByteTrack' },
    { label: 'Environment', value: 'University Campus' },
    { label: 'Output', value: 'Annotated Video + CSV Logs' },
  ]

  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-cyan-400">At a Glance</Label>
          <h2 className="text-3xl font-extrabold text-white">Project Snapshot</h2>
        </Up>
        <Motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={stagger(0.07)}>
          {items.map((item) => (
            <Motion.div
              key={item.label}
              variants={fadeUp()}
              whileHover={{ borderColor: 'rgba(103,232,249,0.2)' }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/7 p-6"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-500 mb-2">{item.label}</p>
              <p className="text-base font-semibold text-white leading-snug">{item.value}</p>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </FadeSection>
  )
}

// ─── Video ─────────────────────────────────────────────────────────────────

function VideoSection() {
  return (
    <FadeSection id="overview" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-violet-400">Demo</Label>
          <h2 className="text-3xl font-extrabold text-white">MODEL OUTPUT</h2>
        </Up>
        <Up>
          <Motion.div
            whileHover={{ boxShadow: '0 0 80px rgba(103,232,249,0.08)' }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-white/8 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div className="p-6 sm:p-8">
              <video
                className="w-full rounded-2xl border border-white/10 bg-[#0b1325] aspect-video"
                controls
                preload="metadata"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="mt-4 text-center text-sm text-slate-500 font-medium">
                Model output showing real-time detection and tracking of objects in aerial drone footage
              </p>
            </div>
          </Motion.div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── Project Overview ──────────────────────────────────────────────────────

function ProjectOverview() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Up className="text-center mb-10">
          <Label color="text-cyan-400">Background</Label>
          <h2 className="text-3xl font-extrabold text-white">Project Overview</h2>
        </Up>
        <Up>
          <div
            className="rounded-3xl border border-white/8 p-8 sm:p-12 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div className="pointer-events-none absolute -right-16 -top-14 h-60 w-60 rounded-full bg-cyan-500/6 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-violet-500/6 blur-3xl" aria-hidden />
            <p className="relative text-lg text-slate-300 leading-relaxed">
              This project focuses on analyzing aerial drone footage of a university campus using deep learning.
              The system detects and tracks objects such as people, vehicles, and other moving entities in real time.
              It is designed to work in complex environments where objects are small, partially occluded, and constantly moving.
            </p>
            <p className="relative mt-5 text-lg text-slate-400 leading-relaxed">
              The pipeline runs frame-by-frame, applies YOLOv8 for detection, assigns persistent tracking IDs across frames,
              and generates both annotated video output and structured CSV logs for downstream analysis.
            </p>
          </div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── What I Built ──────────────────────────────────────────────────────────

const BUILT_ITEMS = [
  { text: 'Real-time object detection using YOLOv8', accent: '#67e8f9' },
  { text: 'Multi-object tracking using BoT-SORT and ByteTrack', accent: '#a78bfa' },
  { text: 'Frame-by-frame video processing pipeline', accent: '#63b3ed' },
  { text: 'Annotated video generation with bounding boxes and persistent IDs', accent: '#67e8f9' },
  { text: 'Structured CSV logging of detections for frame-wise tracking data', accent: '#a78bfa' },
]

function WhatIBuilt() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-violet-400">Deliverables</Label>
          <h2 className="text-3xl font-extrabold text-white">What I Built</h2>
        </Up>
        <Motion.div className="flex flex-col gap-4" variants={stagger(0.08)}>
          {BUILT_ITEMS.map((item, i) => (
            <Motion.div
              key={item.text}
              variants={fadeUp(i * 0.05)}
              whileHover={{ x: 4, borderColor: `${item.accent}30` }}
              transition={{ duration: 0.2 }}
              className="rounded-2xl border border-white/7 px-7 py-5 flex items-center gap-5"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: item.accent, boxShadow: `0 0 8px ${item.accent}80` }}
              />
              <p className="text-base text-slate-300 leading-relaxed">{item.text}</p>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </FadeSection>
  )
}

// ─── Technical Breakdown ───────────────────────────────────────────────────

const TECH_POINTS = [
  {
    icon: '◈',
    title: 'YOLOv8 for Detection',
    desc: 'Used Ultralytics YOLOv8 for real-time bounding box detection across each video frame, optimized for small and distant aerial objects.',
    accent: '#67e8f9',
  },
  {
    icon: '◉',
    title: 'Persistent Tracking IDs',
    desc: 'Applied BoT-SORT and ByteTrack to maintain consistent object IDs across frames, even through partial occlusion and re-entries.',
    accent: '#a78bfa',
  },
  {
    icon: '◍',
    title: 'Parameter Tuning',
    desc: 'Tuned confidence threshold, IoU, and image size specifically for aerial perspective where objects appear small and densely packed.',
    accent: '#63b3ed',
  },
  {
    icon: '◎',
    title: 'Class Filtering',
    desc: 'Filtered detection to specific classes (person, car, truck, bus, bicycle) to reduce noise and focus on traffic-relevant objects.',
    accent: '#67e8f9',
  },
  {
    icon: '◐',
    title: 'Structured Output',
    desc: 'Generated both annotated video files and CSV logs with frame number, object ID, class, and bounding box coordinates for analysis.',
    accent: '#a78bfa',
  },
  {
    icon: '◑',
    title: 'Small Object Optimization',
    desc: 'Increased input image resolution and applied multi-scale inference to improve detection of people and vehicles far from the camera.',
    accent: '#63b3ed',
  },
]

function TechnicalBreakdown() {
  return (
    <FadeSection id="technical" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-blue-400">Under the Hood</Label>
          <h2 className="text-3xl font-extrabold text-white">Technical Breakdown</h2>
        </Up>
        <Motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={stagger(0.07)}>
          {TECH_POINTS.map((t) => (
            <Motion.div
              key={t.title}
              variants={fadeUp()}
              whileHover={{
                y: -8,
                borderColor: `${t.accent}28`,
                boxShadow: `0 24px 52px ${t.accent}14`,
              }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl border border-white/7 p-6 flex flex-col gap-4"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <span className="text-2xl" style={{ color: t.accent }} aria-hidden>{t.icon}</span>
              <div>
                <h3 className="text-base font-bold text-white mb-2">{t.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed">{t.desc}</p>
              </div>
            </Motion.div>
          ))}
        </Motion.div>
      </div>
    </FadeSection>
  )
}

// ─── Code Snippet ──────────────────────────────────────────────────────────

function CodeSnippet() {
  const PY_KEYWORDS = new Set([
    'from', 'import', 'while', 'if', 'not', 'break', 'for', 'in', 'continue', 'else',
  ])

  const PY_SPECIALS = new Set(['None', 'True', 'False'])

  const tokenizePythonLine = (line) => {
    if (!line) return []

    const regex = /(f?"[^"]*"|f?'[^']*'|\b\d+(?:\.\d+)?\b|\b[A-Za-z_][A-Za-z0-9_]*\b)/g
    const tokens = []
    let lastIndex = 0
    let match

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ text: line.slice(lastIndex, match.index), color: '#94a3b8' })
      }

      const text = match[0]
      let color = '#e2e8f0'

      if (/^f?["']/.test(text)) color = '#86efac'
      else if (/^\d/.test(text)) color = '#f9a8d4'
      else if (PY_KEYWORDS.has(text)) color = '#a78bfa'
      else if (PY_SPECIALS.has(text)) color = '#67e8f9'
      else if (['YOLO', 'cv2', 'VideoCapture', 'track', 'rectangle', 'putText', 'imshow', 'waitKey'].includes(text)) color = '#67e8f9'
      else if (['model', 'cap', 'results', 'frame', 'ret', 'result', 'box', 'cls', 'conf', 'track_id', 'x1', 'y1', 'x2', 'y2', 'label'].includes(text)) color = '#93c5fd'

      tokens.push({ text, color })
      lastIndex = regex.lastIndex
    }

    if (lastIndex < line.length) {
      tokens.push({ text: line.slice(lastIndex), color: '#94a3b8' })
    }

    return tokens
  }

  const lines = [
    'from ultralytics import YOLO',
    'import cv2',
    '',
    'model = YOLO("best.pt")',
    '',
    'cap = cv2.VideoCapture("university_park.mp4")',
    '',
    'while True:',
    '    ret, frame = cap.read()',
    '    if not ret:',
    '        break',
    '',
    '    results = model.track(',
    '        frame,',
    '        persist=True,',
    '        tracker="botsort.yaml",',
    '        conf=0.15,',
    '        iou=0.45,',
    '        imgsz=1536',
    '    )',
    '',
    '    for result in results:',
    '        if result.boxes is None:',
    '            continue',
    '',
    '        for box in result.boxes:',
    '            cls = int(box.cls[0])',
    '            conf = float(box.conf[0])',
    '            track_id = int(box.id[0]) if box.id is not None else None',
    '',
    '            x1, y1, x2, y2 = map(int, box.xyxy[0])',
    '',
    '            label = f"{cls} {conf:.2f}"',
    '            if track_id is not None:',
    '                label += f" ID:{track_id}"',
    '',
    '            cv2.rectangle(frame, (x1, y1), (x2, y2), (0,255,0), 2)',
    '            cv2.putText(frame, label, (x1, y1-10),',
    '                        cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0,255,0), 2)',
    '',
    '    cv2.imshow("Tracking", frame)',
    '    if cv2.waitKey(1) & 0xFF == 27:',
    '        break',
    '',
    'cap.release()',
    'cv2.destroyAllWindows()',
  ]

  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-cyan-400">Implementation</Label>
          <h2 className="text-3xl font-extrabold text-white">Core Tracking Call</h2>
        </Up>
        <Up>
          <Motion.div
            whileHover={{ borderColor: 'rgba(103,232,249,0.2)', boxShadow: '0 0 60px rgba(103,232,249,0.06)' }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/8 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-3 text-xs text-slate-600 font-mono">track.py</span>
            </div>
            <div className="p-6 sm:p-8 font-mono text-sm leading-7 overflow-x-auto">
              {lines.map((line, li) => (
                <div key={li} className="flex gap-6">
                  <span className="select-none text-slate-700 w-4 text-right flex-shrink-0">{li + 1}</span>
                  <span className="whitespace-pre">
                    {line.length === 0 ? '\u00a0' : tokenizePythonLine(line).map((tok, ti) => (
                      <span key={`${li}-${ti}`} style={{ color: tok.color }}>{tok.text}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </Motion.div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── Challenges ────────────────────────────────────────────────────────────

const CHALLENGES = [
  {
    icon: '◈',
    title: 'Small Objects in Aerial View',
    desc: 'People and vehicles filmed from altitude appear very small in the frame. Standard detection settings miss them entirely without resolution adjustments.',
    accent: '#67e8f9',
  },
  {
    icon: '◉',
    title: 'False Positives in Early Versions',
    desc: 'Dense tree canopies and rooftop structures were misclassified as vehicles in early runs. Confidence threshold tuning and class filtering resolved most of this.',
    accent: '#a78bfa',
  },
  {
    icon: '◍',
    title: 'Tracking Instability During Occlusion',
    desc: 'Objects passing behind trees or other obstructions caused ID switches and tracking drops. ByteTrack\'s re-identification logic reduced these significantly.',
    accent: '#63b3ed',
  },
  {
    icon: '◎',
    title: 'Iterative Parameter Tuning',
    desc: 'Confidence, IoU, and image resolution all required manual tuning for aerial data. No out-of-the-box preset worked well without domain-specific adjustments.',
    accent: '#67e8f9',
  },
]

function Challenges() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-cyan-400">Engineering Reality</Label>
          <h2 className="text-3xl font-extrabold text-white">Challenges and How I Addressed Them</h2>
        </Up>
        <Motion.div className="grid sm:grid-cols-2 gap-4" variants={stagger(0.08)}>
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

// ─── Results ───────────────────────────────────────────────────────────────

const RESULTS = [
  { metric: '↑', unit: 'Detection Accuracy', desc: 'Improved accuracy for vehicles and people after resolution and threshold tuning.', accent: '#67e8f9' },
  { metric: '↓', unit: 'ID Switches', desc: 'Fewer tracking identity switches across frames with BoT-SORT re-identification.', accent: '#a78bfa' },
  { metric: '↓', unit: 'False Positives', desc: 'Significantly reduced misclassifications after tuning and class filtering.', accent: '#63b3ed' },
  { metric: '✓', unit: 'Clean Output', desc: 'Annotated video and CSV logs ready for downstream traffic analysis.', accent: '#67e8f9' },
]

function Results() {
  return (
    <FadeSection id="results" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-blue-400">Outcomes</Label>
          <h2 className="text-3xl font-extrabold text-white">Results</h2>
        </Up>
        <Motion.div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" variants={stagger(0.08)}>
          {RESULTS.map((r) => (
            <Motion.div
              key={r.unit}
              variants={fadeUp()}
              whileHover={{
                y: -8,
                boxShadow: `0 20px 50px ${r.accent}20`,
                borderColor: `${r.accent}28`,
              }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl border border-white/7 p-6 text-center"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <div className="text-4xl font-black mb-1 leading-none" style={{ color: r.accent }}>
                {r.metric}
              </div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-400 mb-3">{r.unit}</p>
              <p className="text-base text-slate-400 leading-relaxed">{r.desc}</p>
            </Motion.div>
          ))}
        </Motion.div>

        <Up>
          <div
            className="rounded-2xl border border-cyan-500/18 p-6 sm:p-8"
            style={{ background: 'rgba(103,232,249,0.04)' }}
          >
            <div className="flex items-start gap-4">
              <span className="text-cyan-400 text-xl mt-0.5 flex-shrink-0" aria-hidden>◈</span>
              <p className="text-base text-slate-200 leading-relaxed">
                <strong className="text-white">The end-to-end pipeline runs on real drone footage</strong> and produces both human-readable annotated video and machine-readable CSV data suitable for traffic flow analysis, density estimation, and behavioral pattern detection.
              </p>
            </div>
          </div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── Tech Stack ────────────────────────────────────────────────────────────

const TECH_ITEMS = [
  { name: 'Python', icon: '⟨⟩', color: '#63b3ed' },
  { name: 'YOLOv8', icon: '◎', color: '#67e8f9' },
  { name: 'Ultralytics', icon: '◈', color: '#a78bfa' },
  { name: 'OpenCV', icon: '◐', color: '#67e8f9' },
  { name: 'BoT-SORT', icon: '◉', color: '#63b3ed' },
  { name: 'ByteTrack', icon: '◍', color: '#a78bfa' },
  { name: 'Pandas', icon: '◑', color: '#63b3ed' },
]

function TechStack() {
  return (
    <FadeSection className="py-20 px-6">
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

// ─── Final CTA ─────────────────────────────────────────────────────────────

function FinalCTA() {
  const backLink = usePortfolioBackLink()
  return (
    <FadeSection className="py-20 px-6 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(103,232,249,0.05), transparent 70%)' }}
        aria-hidden
      />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <Up>
          <Motion.div
            whileHover={{ borderColor: 'rgba(103,232,249,0.15)', boxShadow: '0 0 60px rgba(103,232,249,0.06)' }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-white/7 px-8 py-14"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(103,232,249,0.10), transparent)' }}
              aria-hidden
            />
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-400 mb-4 relative">
              Explore More
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight relative leading-tight">
              Interested in my work?
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10 relative max-w-sm mx-auto">
              I build real-world AI and computer vision systems. Check out my other projects or get in touch.
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

// ─── Footer ──────────────────────────────────────────────────────────────────

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

export default function DroneTrafficPage() {
  return (
    <div className="min-h-screen bg-[#050a14]">
      <CaseStudyNav />
      <Hero />
      <Snapshot />
      <VideoSection />
      <ProjectOverview />
      <WhatIBuilt />
      <TechnicalBreakdown />
      <CodeSnippet />
      <Challenges />
      <Results />
      <TechStack />
      <FinalCTA />
      <Footer />
    </div>
  )
}
