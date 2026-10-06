import { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion as Motion, useInView, useScroll, useTransform } from 'framer-motion'
import manualControlVideo from '../../MC.mp4'
import autonomousNavigationVideo from '../../AN.mp4'

// ─── Constants ────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1]
const REPORT_PDF_URL = '/robotics-project-3-report.pdf'
const PINK = '#fda4af'
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
  const { scrollY } = useScroll()
  const bg = useTransform(scrollY, [0, 80], ['rgba(5,10,20,0)', 'rgba(5,10,20,0.92)'])
  const borderOp = useTransform(scrollY, [0, 80], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.06)'])

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
            { label: 'Pipeline', href: '#pipeline' },
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
            background: 'radial-gradient(circle, rgba(253,164,175,0.09), transparent 70%)',
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
            className="text-xs font-bold tracking-[0.22em] uppercase mb-6"
            style={{ color: PINK }}
          >
            Project Case Study &nbsp;·&nbsp; Biometrics &amp; Robotics
          </Motion.p>

          <Motion.h1
            variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0, transition: { duration: 0.68, ease: EASE } } }}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-tight tracking-tight mb-6"
          >
            Face Detection and
            <br />
            <span style={gradientText}>Autonomous Navigation</span>
          </Motion.h1>

          <Motion.p
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE } } }}
            className="text-xl text-slate-400 leading-relaxed max-w-xl mx-auto mb-5"
          >
            A perception-to-action pipeline on TurtleBot4.
          </Motion.p>

          <Motion.p
            variants={{ hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE } } }}
            className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12"
          >
            Built a complete robotics system where a TurtleBot4 detects a known face using computer vision and autonomously navigates toward that person using ROS2.
          </Motion.p>

          <Motion.div
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href="#pipeline"
              className="px-7 py-3.5 rounded-full text-white text-sm font-bold transition-all duration-200"
              style={{
                background: PINK,
                boxShadow: `0 0 28px rgba(253,164,175,0.35)`,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 36px rgba(253,164,175,0.5)'; e.currentTarget.style.filter = 'brightness(1.1)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 28px rgba(253,164,175,0.35)'; e.currentTarget.style.filter = '' }}
            >
              View Pipeline
            </a>
            <a
              href={REPORT_PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full border border-white/12 hover:border-white/25 text-slate-300 hover:text-white text-sm font-bold transition-colors duration-200"
            >
              Full Report
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
    { label: 'Domain', value: 'Biometrics + Robotics' },
    { label: 'Platform', value: 'TurtleBot4' },
    { label: 'Vision Stack', value: 'OpenCV + face_recognition' },
    { label: 'Navigation', value: 'ROS2 Twist Messages' },
    { label: 'Safety System', value: 'LiDAR Distance Control' },
    { label: 'Output', value: 'Autonomous Face Following' },
  ]

  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-pink-300">At a Glance</Label>
          <h2 className="text-3xl font-extrabold text-white">Project Snapshot</h2>
        </Up>
        <Motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={stagger(0.07)}>
          {items.map((item) => (
            <Motion.div
              key={item.label}
              variants={fadeUp()}
              whileHover={{ borderColor: 'rgba(253,164,175,0.2)' }}
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

// ─── Demo Videos ──────────────────────────────────────────────────────────

function DemoVideos() {
  const videos = [
    {
      title: 'Manual Control',
      subtitle: 'Keyboard Teleop',
      src: manualControlVideo,
      accent: '#a78bfa',
      desc: 'Driving the TurtleBot4 manually using keyboard teleop over ROS2.',
    },
    {
      title: 'Autonomous Navigation',
      subtitle: 'Map Goal',
      src: autonomousNavigationVideo,
      accent: PINK,
      desc: 'Robot navigating to a click-to-set goal using the generated map.',
    },
  ]

  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-violet-400">Demo</Label>
          <h2 className="text-3xl font-extrabold text-white">System in Action</h2>
        </Up>
        <Motion.div className="grid md:grid-cols-2 gap-5" variants={stagger(0.1)}>
          {videos.map((v) => (
            <Motion.div
              key={v.title}
              variants={fadeUp()}
              whileHover={{ y: -6, borderColor: `${v.accent}28`, boxShadow: `0 24px 52px ${v.accent}14` }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl border border-white/7 p-6 flex flex-col gap-4"
              style={{ background: 'rgba(255,255,255,0.025)' }}
            >
              <div>
                <p className="text-xs font-bold tracking-[0.18em] uppercase mb-1" style={{ color: v.accent }}>
                  {v.subtitle}
                </p>
                <h3 className="text-lg font-bold text-white">{v.title}</h3>
              </div>
              <video
                className="w-full rounded-xl border border-white/10 bg-[#0b1325] aspect-video"
                controls
                preload="metadata"
              >
                <source src={v.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p className="text-sm text-slate-500">{v.desc}</p>
            </Motion.div>
          ))}
        </Motion.div>

        <Up className="mt-5">
          <div
            className="rounded-2xl border border-amber-300/20 p-5"
            style={{ background: 'rgba(251,191,36,0.05)' }}
          >
            <p className="text-base text-amber-200 leading-relaxed">
              The final face-following demo was not recorded, but the full system implementation is documented in the project report below.
            </p>
          </div>
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
          <Label color="text-pink-300">Background</Label>
          <h2 className="text-3xl font-extrabold text-white">Project Overview</h2>
        </Up>
        <Up>
          <div
            className="rounded-3xl border border-white/8 p-8 sm:p-12 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div className="pointer-events-none absolute -right-16 -top-14 h-60 w-60 rounded-full blur-3xl" style={{ background: 'rgba(253,164,175,0.07)' }} aria-hidden />
            <div className="pointer-events-none absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-violet-500/6 blur-3xl" aria-hidden />
            <p className="relative text-lg text-slate-300 leading-relaxed">
              This project connects computer vision and robotics into a single working system. A TurtleBot4 uses its onboard camera to scan for a known face in real time. When the target face is detected and matched, the robot calculates its position in the frame and issues movement commands through ROS2 to navigate toward them.
            </p>
            <p className="relative mt-5 text-lg text-slate-400 leading-relaxed">
              The system also includes LiDAR-based safety logic to stop the robot at a minimum safe distance, and LED feedback to confirm system state. Before face following, the robot was also configured for manual teleop and autonomous map-based navigation.
            </p>
          </div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── What I Built ──────────────────────────────────────────────────────────

const BUILT_ITEMS = [
  { text: 'Controlled TurtleBot4 using ROS2 Twist messages for manual teleop', accent: PINK },
  { text: 'Generated a map of the environment and enabled click-to-navigate autonomy', accent: '#a78bfa' },
  { text: 'Built a face detection pipeline using OpenCV and the face_recognition library', accent: '#63b3ed' },
  { text: 'Implemented target matching to identify a specific known face among multiple detections', accent: PINK },
  { text: 'Calculated face position in frame and translated it into directional movement commands', accent: '#a78bfa' },
  { text: 'Integrated LiDAR data to enforce a minimum safe stopping distance from the target', accent: '#63b3ed' },
  { text: 'Added LED confirmation feedback to reflect system response state', accent: PINK },
]

function WhatIBuilt() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-violet-400">Deliverables</Label>
          <h2 className="text-3xl font-extrabold text-white">What I Built</h2>
        </Up>
        <Motion.div className="flex flex-col gap-4" variants={stagger(0.07)}>
          {BUILT_ITEMS.map((item, i) => (
            <Motion.div
              key={item.text}
              variants={fadeUp(i * 0.04)}
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

// ─── Pipeline Architecture ─────────────────────────────────────────────────

const PIPELINE_STEPS = [
  {
    step: '01',
    title: 'Camera Feed',
    desc: 'The TurtleBot4 onboard camera streams video frames in real time into the ROS2 image pipeline.',
    accent: '#63b3ed',
  },
  {
    step: '02',
    title: 'Face Detection',
    desc: 'Each frame is processed with OpenCV to detect all faces present using the face_recognition library.',
    accent: PINK,
  },
  {
    step: '03',
    title: 'Target Matching',
    desc: 'Detected faces are compared against a pre-encoded reference image of the target person using face encodings.',
    accent: '#a78bfa',
  },
  {
    step: '04',
    title: 'Direction Calculation',
    desc: 'When a match is found, the face bounding box center is used to determine whether the robot should turn left, right, or move forward.',
    accent: '#63b3ed',
  },
  {
    step: '05',
    title: 'ROS2 Twist Command',
    desc: 'The calculated direction is published as a Twist message to the /cmd_vel topic, driving the robot\'s motion.',
    accent: PINK,
  },
  {
    step: '06',
    title: 'LiDAR Safety Stop',
    desc: 'LiDAR range data is monitored in parallel. If the robot gets within the minimum safe distance, movement stops automatically.',
    accent: '#a78bfa',
  },
]

function Pipeline() {
  return (
    <FadeSection id="pipeline" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-pink-300">Architecture</Label>
          <h2 className="text-3xl font-extrabold text-white">Perception-to-Action Pipeline</h2>
        </Up>

        <Up className="mb-10">
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{ background: 'rgba(253,164,175,0.04)', borderColor: 'rgba(253,164,175,0.15)' }}
          >
            <div className="grid md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/6">
              {[
                { color: 'text-pink-300', heading: 'Input', body: 'Live camera stream from TurtleBot4 onboard camera' },
                { color: 'text-violet-400', heading: 'Processing', body: 'Face detection, encoding comparison, and spatial position calculation' },
                { color: 'text-blue-400', heading: 'Output', body: 'ROS2 Twist velocity commands with LiDAR-enforced safety limits' },
              ].map(({ color, heading, body }) => (
                <div key={heading} className="pt-6 md:pt-0 md:px-6 first:pt-0 first:pl-0 last:pr-0">
                  <p className={`text-xs font-bold tracking-[0.18em] uppercase mb-2 ${color}`}>{heading}</p>
                  <p className="text-base text-slate-300 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </Up>

        <Motion.div className="relative" variants={stagger(0.1)}>
          <div
            className="absolute left-[22px] top-6 bottom-6 w-px hidden sm:block"
            style={{ background: `linear-gradient(to bottom, rgba(253,164,175,0.4), rgba(167,139,250,0.4), rgba(99,179,237,0.3))` }}
          />
          <div className="flex flex-col gap-4">
            {PIPELINE_STEPS.map((s, i) => (
              <Motion.div
                key={s.step}
                variants={fadeUp(i * 0.05)}
                whileHover={{ x: 4, borderColor: `${s.accent}30` }}
                transition={{ duration: 0.2 }}
                className="relative sm:pl-14 rounded-2xl border border-white/7 p-6 sm:p-7"
                style={{ background: 'rgba(255,255,255,0.025)' }}
              >
                <div
                  className="hidden sm:block absolute left-0 top-1/2 w-[11px] h-[11px] rounded-full"
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

// ─── Technical Breakdown ───────────────────────────────────────────────────

const TECH_BREAKDOWN = [
  {
    icon: '◈',
    title: 'Face Detection with OpenCV',
    desc: 'Used OpenCV to process each camera frame and detect face bounding boxes before passing them to the recognition step.',
    accent: PINK,
  },
  {
    icon: '◉',
    title: 'Face Encoding and Matching',
    desc: 'The face_recognition library encodes each detected face into a 128-dimensional vector, then compares it against a pre-encoded reference to confirm identity.',
    accent: '#a78bfa',
  },
  {
    icon: '◍',
    title: 'ROS2 Twist Velocity Control',
    desc: 'Movement is driven by publishing linear and angular velocity values to the /cmd_vel topic using ROS2 Twist messages.',
    accent: '#63b3ed',
  },
  {
    icon: '◎',
    title: 'Map Generation and Autonomy',
    desc: 'Used SLAM to generate a 2D map of the environment, then configured goal-based autonomous navigation using the Nav2 stack.',
    accent: PINK,
  },
  {
    icon: '◐',
    title: 'LiDAR Safety Integration',
    desc: 'LiDAR range scan data is continuously monitored. If the minimum distance falls below the threshold, the robot halts regardless of face detection state.',
    accent: '#a78bfa',
  },
  {
    icon: '◑',
    title: 'LED State Feedback',
    desc: 'LED indicators were configured to reflect the robot\'s current system state: idle, searching, target locked, and stopped.',
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
          {TECH_BREAKDOWN.map((t) => (
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
  const lines = [
    { tokens: [{ text: 'import', color: '#a78bfa' }, { text: ' face_recognition', color: '#67e8f9' }, { text: ',', color: '#94a3b8' }, { text: ' cv2', color: '#67e8f9' }] },
    { tokens: [] },
    { tokens: [{ text: '# Encode the known target face', color: '#64748b' }] },
    { tokens: [{ text: 'known_image', color: '#93c5fd' }, { text: ' = ', color: '#94a3b8' }, { text: 'face_recognition', color: '#67e8f9' }, { text: '.load_image_file(', color: '#94a3b8' }, { text: '"target.jpg"', color: '#86efac' }, { text: ')', color: '#94a3b8' }] },
    { tokens: [{ text: 'known_encoding', color: '#93c5fd' }, { text: ' = ', color: '#94a3b8' }, { text: 'face_recognition', color: '#67e8f9' }, { text: '.face_encodings(', color: '#94a3b8' }, { text: 'known_image', color: '#93c5fd' }, { text: ')[', color: '#94a3b8' }, { text: '0', color: '#f9a8d4' }, { text: ']', color: '#94a3b8' }] },
    { tokens: [] },
    { tokens: [{ text: '# Compare against detected faces in live frame', color: '#64748b' }] },
    { tokens: [{ text: 'matches', color: '#93c5fd' }, { text: ' = ', color: '#94a3b8' }, { text: 'face_recognition', color: '#67e8f9' }, { text: '.compare_faces(', color: '#94a3b8' }] },
    { tokens: [{ text: '    known_encodings', color: '#fca5a5' }, { text: ',', color: '#94a3b8' }, { text: ' frame_encodings', color: '#fca5a5' }, { text: ',', color: '#94a3b8' }, { text: ' tolerance', color: '#fca5a5' }, { text: '=', color: '#94a3b8' }, { text: '0.55', color: '#f9a8d4' }] },
    { tokens: [{ text: ')', color: '#94a3b8' }] },
    { tokens: [] },
    { tokens: [{ text: 'if', color: '#a78bfa' }, { text: ' ', color: '#94a3b8' }, { text: 'True', color: '#a78bfa' }, { text: ' in ', color: '#94a3b8' }, { text: 'matches', color: '#93c5fd' }, { text: ':', color: '#94a3b8' }] },
    { tokens: [{ text: '    ', color: '#94a3b8' }, { text: 'publish_twist', color: '#67e8f9' }, { text: '(linear_x=', color: '#94a3b8' }, { text: '0.2', color: '#f9a8d4' }, { text: ', angular_z=', color: '#94a3b8' }, { text: 'steer_angle', color: '#93c5fd' }, { text: ')', color: '#94a3b8' }] },
  ]

  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Up className="text-center mb-12">
          <Label color="text-pink-300">Implementation</Label>
          <h2 className="text-3xl font-extrabold text-white">Face Matching Logic</h2>
        </Up>
        <Up>
          <Motion.div
            whileHover={{ borderColor: 'rgba(253,164,175,0.2)', boxShadow: '0 0 60px rgba(253,164,175,0.05)' }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/8 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/6" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <span className="w-3 h-3 rounded-full bg-red-500/50" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <span className="w-3 h-3 rounded-full bg-green-500/50" />
              <span className="ml-3 text-xs text-slate-600 font-mono">face_follow.py</span>
            </div>
            <div className="p-6 sm:p-8 font-mono text-sm leading-7 overflow-x-auto">
              {lines.map((line, li) => (
                <div key={li} className="flex gap-6">
                  <span className="select-none text-slate-700 w-4 text-right flex-shrink-0">{li + 1}</span>
                  <span>
                    {line.tokens.length === 0 ? '\u00a0' : line.tokens.map((tok, ti) => (
                      <span key={ti} style={{ color: tok.color }}>{tok.text}</span>
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
    title: 'Real-Time Latency',
    desc: 'Face recognition is computationally expensive. Processing every frame caused lag in movement response. Solving this required frame skipping and resolution reduction.',
    accent: PINK,
  },
  {
    icon: '◉',
    title: 'False Positives in Recognition',
    desc: 'Lookalike faces and partial detections caused the robot to lock onto the wrong target. Lowering the tolerance threshold improved precision at the cost of some recall.',
    accent: '#a78bfa',
  },
  {
    icon: '◍',
    title: 'Smooth Directional Control',
    desc: 'Converting a face\'s pixel position to smooth angular velocity required tuning to avoid jerky, overcorrecting movement when the target shifted position.',
    accent: '#63b3ed',
  },
  {
    icon: '◎',
    title: 'ROS2 + Vision Synchronization',
    desc: 'Running vision processing and ROS2 publishers on separate threads required careful synchronization to prevent stale commands being sent after face loss.',
    accent: PINK,
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
  { metric: '✓', unit: 'Face Following', desc: 'Robot successfully detected and moved toward the target face in live tests.', accent: PINK },
  { metric: '✓', unit: 'Safe Navigation', desc: 'LiDAR enforced safe stopping distance with no collisions during testing.', accent: '#a78bfa' },
  { metric: '✓', unit: 'Map Autonomy', desc: 'Click-to-navigate goal-based autonomy working on a full environment map.', accent: '#63b3ed' },
  { metric: '✓', unit: 'State Feedback', desc: 'LED indicators correctly reflected system state across all tested scenarios.', accent: PINK },
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
              <div className="text-4xl font-black mb-1 leading-none" style={{ color: r.accent }}>{r.metric}</div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-slate-400 mb-3">{r.unit}</p>
              <p className="text-base text-slate-400 leading-relaxed">{r.desc}</p>
            </Motion.div>
          ))}
        </Motion.div>

        <Up>
          <div
            className="rounded-2xl border p-6 sm:p-8"
            style={{ background: 'rgba(253,164,175,0.04)', borderColor: 'rgba(253,164,175,0.15)' }}
          >
            <div className="flex items-start gap-4">
              <span className="text-xl mt-0.5 flex-shrink-0" style={{ color: PINK }} aria-hidden>◈</span>
              <p className="text-base text-slate-200 leading-relaxed">
                <strong className="text-white">This project connected two completely different systems</strong>: computer vision and mobile robotics, into a single working perception-to-action loop. Building the integration between OpenCV, face_recognition, and ROS2 in real hardware conditions required solving problems that don't show up in simulations.
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
  { name: 'ROS2', icon: '◒', color: '#67e8f9' },
  { name: 'OpenCV', icon: '◐', color: PINK },
  { name: 'face_recognition', icon: '◈', color: '#a78bfa' },
  { name: 'TurtleBot4', icon: '◉', color: '#63b3ed' },
  { name: 'LiDAR', icon: '◍', color: PINK },
  { name: 'Nav2', icon: '◎', color: '#a78bfa' },
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
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 100%, rgba(253,164,175,0.05), transparent 70%)' }}
        aria-hidden
      />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <Up>
          <Motion.div
            whileHover={{ borderColor: 'rgba(253,164,175,0.15)', boxShadow: '0 0 60px rgba(253,164,175,0.06)' }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl border border-white/7 px-8 py-14"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 rounded-full blur-3xl"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12), transparent)' }}
              aria-hidden
            />
            <p className="text-xs font-bold tracking-[0.22em] uppercase mb-4 relative" style={{ color: PINK }}>
              Read the Full Write-Up
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight relative leading-tight">
              Full project report available
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10 relative max-w-sm mx-auto">
              The complete implementation details, system diagrams, and test results are documented in the project report.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 relative">
              <a
                href={REPORT_PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white shadow-[0_0_28px_rgba(139,92,246,0.35)] hover:shadow-[0_0_36px_rgba(167,139,250,0.45)] transition-all duration-200"
                style={{ background: '#7c3aed' }}
              >
                View Full Project Report
                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link
                to={backLink.to}
                state={backLink.state}
                onClick={backLink.onClick}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 hover:border-white/25 px-8 py-4 text-base font-bold text-slate-300 hover:text-white transition-colors duration-200"
              >
                ← Back to Portfolio
              </Link>
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

export default function TurtlebotFaceDetectionPage() {
  return (
    <div className="min-h-screen bg-[#050a14]">
      <CaseStudyNav />
      <Hero />
      <Snapshot />
      <DemoVideos />
      <ProjectOverview />
      <WhatIBuilt />
      <Pipeline />
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
