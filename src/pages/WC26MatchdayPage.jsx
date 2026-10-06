import { useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion as Motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ThemeToggle } from '../context/ThemeContext.jsx'
import { useTheme } from '../context/theme.js'

// ─── Constants ────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1]
const LIVE_URL = 'https://wc26-matchday.vercel.app/'
const GREEN = '#4ade80'
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

function Label({ color = 'text-green-400', children }) {
  return (
    <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 ${color}`}>
      {children}
    </p>
  )
}

function GlowTag({ label, accent = GREEN }) {
  return (
    <span
      className="text-xs px-3 py-1 rounded-full border font-medium select-none"
      style={{
        color: accent,
        borderColor: `${accent}40`,
        background: `${accent}10`,
      }}
    >
      {label}
    </span>
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
            { label: 'Features', href: '#features' },
            { label: 'Technical', href: '#technical' },
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
        <div className="flex items-center gap-2">
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-400/30 bg-green-400/8 text-green-300 text-xs font-bold tracking-[0.12em] uppercase hover:border-green-400/50 hover:bg-green-400/14 transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live App
          </a>
          <ThemeToggle />
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
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '20%', top: '40%', width: 520, height: 520,
            background: 'radial-gradient(circle, rgba(74,222,128,0.09), transparent 70%)',
            transform: 'translate(-50%,-50%)',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            left: '80%', top: '55%', width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(99,179,237,0.09), transparent 70%)',
            transform: 'translate(-50%,-50%)',
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '38px 38px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <Motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.1)}
        >
          <Up>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-[0.15em] uppercase"
                style={{ background: 'rgba(74,222,128,0.08)', borderColor: 'rgba(74,222,128,0.2)', color: GREEN }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Live · Deployed
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold"
                style={{ background: 'rgba(99,179,237,0.07)', borderColor: 'rgba(99,179,237,0.2)', color: '#93c5fd' }}
              >
                ⚡ Solo Build
              </span>
              <span
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-bold"
                style={{ background: 'rgba(167,139,250,0.07)', borderColor: 'rgba(167,139,250,0.2)', color: '#c4b5fd' }}
              >
                🏆 FIFA WC26 · Jun–Jul 2026
              </span>
            </div>
          </Up>

          <Up delay={0.06}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">
              FIFA WC26 Matchday
              <br />
              <span style={gradientText}>Intelligence</span>
            </h1>
          </Up>

          <Up delay={0.12}>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mb-10">
              A real-time FIFA World Cup 2026 companion app with match reports, player stats,
              lineups, and standings, all powered by ESPN&apos;s live data feed. Built and shipped
              solo in time for the tournament opener.
            </p>
          </Up>

          <Up delay={0.18}>
            <div className="flex flex-wrap gap-4">
              <Motion.a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 32px rgba(74,222,128,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 24px rgba(74,222,128,0.25)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                Open Live App
                <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Motion.a>
              <Link
                to={backLink.to}
                state={backLink.state}
                onClick={backLink.onClick}
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 border border-white/12 hover:border-white/25 text-slate-300 hover:text-white text-sm font-bold transition-colors duration-200"
              >
                ← Back to Portfolio
              </Link>
            </div>
          </Up>
        </Motion.div>
      </div>
    </section>
  )
}

// ─── Overview ─────────────────────────────────────────────────────────────

function Overview() {
  return (
    <FadeSection id="overview" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-14">
          <Label color="text-green-400">Project Overview</Label>
          <h2 className="text-4xl font-extrabold text-white">What I built</h2>
        </Up>

        <div className="grid md:grid-cols-2 gap-5">
          {/* The Idea */}
          <Up>
            <div
              className="h-full rounded-2xl p-8 border flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.2)' }}>
                💡
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">The Idea</h3>
                <p className="text-slate-400 text-base leading-relaxed">
                  The World Cup only happens every four years. I wanted to build something
                  timely and genuinely useful: a clean, fast app that surfaces exactly what
                  a fan needs: who played, what happened, and where the standings stand.
                </p>
              </div>
            </div>
          </Up>

          {/* The Execution */}
          <Up delay={0.08}>
            <div
              className="h-full rounded-2xl p-8 border flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(99,179,237,0.1)', border: '1px solid rgba(99,179,237,0.2)' }}>
                🚀
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">The Execution</h3>
                <p className="text-slate-400 text-base leading-relaxed">
                  Designed, built, and deployed entirely solo. Live before the tournament opener.
                  Data pulls from ESPN&apos;s public feed with no API key required. Squads,
                  lineups, and player profiles update in real time as matches progress.
                </p>
              </div>
            </div>
          </Up>

          {/* Impact */}
          <Up delay={0.12}>
            <div
              className="h-full rounded-2xl p-8 border flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)' }}>
                📊
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">What It Covers</h3>
                <p className="text-slate-400 text-base leading-relaxed">
                  All 48 group-stage matches across Matchdays 1–3, knockout rounds, live
                  standings, top scorers, player profiles, and match verdicts. Every fixture
                  has a full breakdown with lineups and stats.
                </p>
              </div>
            </div>
          </Up>

          {/* Data */}
          <Up delay={0.16}>
            <div
              className="h-full rounded-2xl p-8 border flex flex-col gap-5"
              style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(103,232,249,0.1)', border: '1px solid rgba(103,232,249,0.2)' }}>
                ⚡
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Zero Downtime Data</h3>
                <p className="text-slate-400 text-base leading-relaxed">
                  The app stays functional even when the ESPN feed is unavailable.
                  Lineups render on the pitch roughly an hour before kickoff, with graceful
                  fallback to full squad lists until then.
                </p>
              </div>
            </div>
          </Up>
        </div>
      </div>
    </FadeSection>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────

const features = [
  {
    icon: '🏟️',
    title: 'All 48 Group Fixtures',
    desc: 'Complete Matchday 1, 2, and 3 coverage across all 12 groups, with results, venues, and kickoff times.',
    accent: '#4ade80',
  },
  {
    icon: '📋',
    title: 'Lineup Visualiser',
    desc: 'Starting XIs rendered on a pitch graphic roughly 1 hour before kickoff; falls back to full squad until then.',
    accent: '#67e8f9',
  },
  {
    icon: '📈',
    title: 'Live Standings',
    desc: 'Group tables update automatically. Points, goal difference, goals for/against. Everything a fan tracks.',
    accent: '#a78bfa',
  },
  {
    icon: '🏅',
    title: 'Player Stats & Top Scorers',
    desc: 'Golden Boot race, assists leaders, and per-player career stats pulled live from ESPN profiles.',
    accent: '#fbbf24',
  },
  {
    icon: '🔮',
    title: 'Match Verdicts',
    desc: 'Pre-match predictions blending betting markets with World Cup pedigree. Probabilities, not promises.',
    accent: '#f472b6',
  },
  {
    icon: '🌙',
    title: 'Dark Mode UI',
    desc: 'Clean, dark interface optimised for match-day reading with fast navigation between matchdays and knockouts.',
    accent: '#93c5fd',
  },
]

function FeatureCard({ f, i }) {
  return (
    <Up delay={i * 0.07}>
      <Motion.div
        whileHover={{
          y: -6,
          boxShadow: `0 24px 60px ${f.accent}20`,
          borderColor: `${f.accent}25`,
        }}
        transition={{ duration: 0.22 }}
        className="h-full rounded-2xl p-7 border flex flex-col gap-4"
        style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.07)' }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: `${f.accent}12`, border: `1px solid ${f.accent}28` }}
        >
          {f.icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-white mb-1.5">{f.title}</h3>
          <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
        </div>
      </Motion.div>
    </Up>
  )
}

function Features() {
  return (
    <FadeSection id="features" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-14">
          <Label color="text-cyan-400">Capabilities</Label>
          <h2 className="text-4xl font-extrabold text-white">Key Features</h2>
        </Up>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
    </FadeSection>
  )
}

// ─── Technical ────────────────────────────────────────────────────────────

const dataFlow = [
  { label: 'ESPN Public Feed', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.3)' },
  { label: 'Data Fetch & Parse', color: '#67e8f9', bg: 'rgba(103,232,249,0.10)', border: 'rgba(103,232,249,0.25)' },
  { label: 'React State Layer', color: '#93c5fd', bg: 'rgba(99,179,237,0.10)', border: 'rgba(99,179,237,0.25)' },
  { label: 'UI Render', color: '#c4b5fd', bg: 'rgba(167,139,250,0.10)', border: 'rgba(167,139,250,0.25)' },
  { label: 'Vercel Edge CDN', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.3)' },
]

function DataFlow() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="flex flex-col items-center gap-0 w-full max-w-[220px]">
      {dataFlow.map((node, i) => (
        <div key={node.label} className="flex flex-col items-center w-full">
          <Motion.div
            initial={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.07)', color: '#475569', boxShadow: 'none' }}
            animate={inView ? {
              background: node.bg,
              borderColor: node.border,
              color: node.color,
              boxShadow: `0 0 16px ${node.border}`,
            } : {}}
            transition={{ duration: 0.35, delay: i * 0.18 }}
            className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-center border"
          >
            {node.label}
          </Motion.div>
          {i < dataFlow.length - 1 && (
            <Motion.div
              className="w-px"
              style={{ height: 20 }}
              initial={{ background: 'rgba(255,255,255,0.05)' }}
              animate={inView ? { background: `linear-gradient(to bottom, ${node.border}, rgba(255,255,255,0.05))` } : {}}
              transition={{ duration: 0.3, delay: i * 0.18 }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

function Technical() {
  const stack = ['React', 'JavaScript', 'CSS', 'Vercel', 'ESPN API']

  return (
    <FadeSection id="technical" className="py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <Up className="text-center mb-14">
          <Label color="text-violet-400">Under the Hood</Label>
          <h2 className="text-4xl font-extrabold text-white">Technical Details</h2>
        </Up>

        <div
          className="rounded-3xl border border-white/8 overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/7">
            {/* Left */}
            <div className="px-8 sm:px-10 py-10 flex flex-col gap-8">
              <Up>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em] mb-3">Architecture</p>
                  <p className="text-slate-300 text-base leading-relaxed">
                    Single-page React app with client-side data fetching. ESPN&apos;s public
                    endpoints are queried directly: no backend, no API key, no quota.
                    The entire app is statically deployed on Vercel&apos;s edge network for
                    instant global load times.
                  </p>
                </div>
              </Up>
              <Up delay={0.08}>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em] mb-3">Resilience</p>
                  <p className="text-slate-300 text-base leading-relaxed">
                    Fixtures, kickoff times, venues, and match verdicts are hand-verified
                    as of June 2026. If the live ESPN feed is unavailable, the app degrades
                    gracefully. Static data stays intact while dynamic player profiles
                    wait for the feed to return.
                  </p>
                </div>
              </Up>
              <Up delay={0.14}>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em] mb-4">Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {stack.map((t) => (
                      <GlowTag key={t} label={t} accent={GREEN} />
                    ))}
                  </div>
                </div>
              </Up>
            </div>

            {/* Right: Data Flow */}
            <div className="px-8 sm:px-10 py-10 flex flex-col items-center justify-center gap-10">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.18em]">Data Pipeline</p>
              <DataFlow />
            </div>
          </div>
        </div>
      </div>
    </FadeSection>
  )
}

// ─── CTA ──────────────────────────────────────────────────────────────────

function CTA() {
  return (
    <FadeSection className="py-20 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Up>
          <div
            className="relative rounded-3xl px-8 sm:px-12 py-16 border border-white/7 overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)' }}
          >
            {/* Ambient glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(74,222,128,0.18), transparent)' }}
            />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-green-400 mb-4">The App is Live</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 leading-tight">
                See it in action
              </h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                All 24 opening fixtures are wrapped up. Tap any match to read the full
                breakdown: results, lineups, and player stats.
              </p>
              <Motion.a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(74,222,128,0.35)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-2.5 rounded-full px-10 py-4 text-base font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 0 28px rgba(74,222,128,0.28)' }}
              >
                <span className="w-2 h-2 rounded-full bg-white/80 animate-pulse" />
                Open FIFA WC26 Matchday
                <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Motion.a>
            </div>
          </div>
        </Up>
      </div>
    </FadeSection>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────

function Footer() {
  const backLink = usePortfolioBackLink()
  return (
    <footer className="border-t border-white/5 py-10 text-center px-6">
      <Link
        to={backLink.to}
        state={backLink.state}
        onClick={backLink.onClick}
        className="text-sm text-slate-600 hover:text-slate-400 transition-colors duration-200"
      >
        ← Back to Portfolio
      </Link>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────

export default function WC26MatchdayPage() {
  return (
    <div className="min-h-screen bg-[#050a14]">
      <CaseStudyNav />
      <Hero />
      <Overview />
      <Features />
      <Technical />
      <CTA />
      <Footer />
    </div>
  )
}
