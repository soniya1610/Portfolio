import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import emailjs from '@emailjs/browser'
import {
  ArrowDown,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Copy,
  ExternalLink,
  GitFork,
  MapPin,
  Menu,
  Moon,
  RefreshCw,
  Send,
  Star,
  Sun,
  X,
} from 'lucide-react'
import { AnimatePresence, motion, MotionConfig, useInView } from 'framer-motion'
import {
  credentials,
  coursework,
  education,
  experience,
  profile,
  projects,
  skillGroups,
  stats,
} from './data'
import { useGitHub, type GitHubRepository } from './useGitHub'
import './index.css'

const navigation = [
  ['Home', 'home'],
  ['About', 'about'],
  ['Experience', 'experience'],
  ['Skills', 'skills'],
  ['Projects', 'projects'],
  ['GitHub', 'github'],
  ['Education', 'education'],
  ['Achievements', 'achievements'],
  ['Contact', 'contact'],
]

const roles = ['Full Stack Developer', 'Java Developer', 'React Developer', 'Blockchain Developer']
const currentYear = new Date().getFullYear()

function ExternalAnchor({
  href,
  children,
  className,
  label,
}: {
  href: string
  children: ReactNode
  className?: string
  label?: string
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  )
}

function GithubMark({ size = 17 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .9C5.85.9.9 5.85.9 12c0 4.9 3.18 9.05 7.6 10.51.56.1.76-.24.76-.54v-1.9c-3.1.67-3.76-1.32-3.76-1.32-.51-1.29-1.24-1.64-1.24-1.64-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.2 3.23.91.1-.72.39-1.2.7-1.48-2.48-.28-5.09-1.25-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.08 1.15.89-.24 1.85-.37 2.8-.37.95 0 1.9.13 2.8.37 2.14-1.45 3.08-1.15 3.08-1.15.61 1.53.23 2.67.11 2.95.72.78 1.15 1.78 1.15 3 0 4.28-2.62 5.23-5.11 5.51.4.34.75 1 .75 2.02v3c0 .3.2.65.77.54C19.93 21.05 23.1 16.9 23.1 12 23.1 5.85 18.15.9 12 .9Z" />
    </svg>
  )
}

function LinkedinMark({ size = 17 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.9H4.97V9.37h2.96v9.53ZM6.45 8.07a1.72 1.72 0 1 1 0-3.44 1.72 1.72 0 0 1 0 3.44Zm12.48 10.83h-2.96v-4.64c0-1.1-.02-2.51-1.53-2.51-1.53 0-1.77 1.2-1.77 2.43v4.72H9.71V9.37h2.84v1.3h.04c.4-.75 1.36-1.53 2.8-1.53 2.99 0 3.54 1.97 3.54 4.53v5.23Z" />
    </svg>
  )
}

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const stored = localStorage.getItem('soniya-theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [expandedExperience, setExpandedExperience] = useState<string | null>('Quantify')
  const [resumeMessage, setResumeMessage] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [copied, setCopied] = useState(false)
  const [contactSending, setContactSending] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('soniya-theme', theme)
  }, [theme])

  useEffect(() => {
    const sections = navigation.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: [0, 0.2, 0.5] },
    )
    sections.forEach((section) => section && observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const interval = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % roles.length)
    }, 2800)
    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    if (selectedProject === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedProject])

  async function downloadResume() {
    try {
      const response = await fetch('/resume.pdf', { method: 'HEAD' })
      if (!response.ok) {
        setResumeMessage('The resume PDF is not available in this workspace yet.')
        return
      }
      const link = document.createElement('a')
      link.href = '/resume.pdf'
      link.download = 'Soniya-Meena-Resume.pdf'
      link.click()
      setResumeMessage('')
    } catch {
      setResumeMessage('Could not check for the resume PDF. Please try again later.')
    }
  }

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const subject = String(formData.get('subject') ?? '').trim()
    const message = String(formData.get('message') ?? '').trim()
    const body = `${message}\n\n— ${String(formData.get('name') ?? '').trim()}\n${String(formData.get('email') ?? '').trim()}`

    const { VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY } = import.meta.env
    if (VITE_EMAILJS_SERVICE_ID && VITE_EMAILJS_TEMPLATE_ID && VITE_EMAILJS_PUBLIC_KEY) {
      setContactSending(true)
      setContactMessage('')
      try {
        await emailjs.sendForm(
          VITE_EMAILJS_SERVICE_ID,
          VITE_EMAILJS_TEMPLATE_ID,
          form,
          { publicKey: VITE_EMAILJS_PUBLIC_KEY },
        )
        setContactMessage('Message sent — thank you for reaching out.')
        form.reset()
      } catch {
        setContactMessage('The message could not be sent. Please try again or email me directly.')
      } finally {
        setContactSending(false)
      }
      return
    }

    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setContactMessage('Your email app should open with this message ready to send. It has not been sent yet.')
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
      setContactMessage('Clipboard access is unavailable. You can email me directly at ' + profile.email)
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell">
        <div className="scroll-progress" aria-hidden="true" />
        <header className="site-header">
          <a className="wordmark" href="#home" aria-label="Soniya Meena home">
            <span className="wordmark-mark">S</span>
            <span>soniya<span className="wordmark-period">.</span></span>
          </a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button
              className="icon-button theme-toggle"
              onClick={() => setTheme((current) => (current === 'light' ? 'dark' : 'light'))}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button className="button button-dark header-resume" onClick={downloadResume}>
              Resume <ArrowDownToLine size={15} />
            </button>
            <button
              className="icon-button menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </header>

        <main>
          <section className="hero section-wrap" id="home">
            <div className="hero-copy">
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="status-dot" /> OPEN TO INTERNSHIP OPPORTUNITIES
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.06 }}
              >
                Hi, I’m Soniya
                <span className="heading-period">.</span>
                <br />
                <span className="heading-soft">I build things</span>
                <br />
                that make sense.
              </motion.h1>
              <div className="role-line" aria-live="polite">
                <Code2 size={17} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -7 }}
                    transition={{ duration: 0.2 }}
                  >
                    {roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
                <span className="role-divider">/</span>
                <span>New Delhi, India</span>
              </div>
              <p className="hero-intro">
                Computer Science undergraduate drawn to thoughtful products, dependable Java
                systems, and interfaces that feel effortless to use.
              </p>
              <div className="hero-actions">
                <a className="button button-accent" href="#projects">
                  Explore my work <ArrowRight size={16} />
                </a>
                <button className="button button-outline" onClick={downloadResume}>
                  Download résumé <ArrowDownToLine size={16} />
                </button>
              </div>
              {resumeMessage && <p className="inline-note" role="status">{resumeMessage}</p>}
              <div className="hero-socials">
                <ExternalAnchor href={profile.github} label="GitHub profile">
                  <GithubMark /> GitHub <ArrowUpRight size={13} />
                </ExternalAnchor>
                <ExternalAnchor href={profile.linkedin} label="LinkedIn profile">
                  <LinkedinMark /> LinkedIn <ArrowUpRight size={13} />
                </ExternalAnchor>
                <span className="social-rule" />
                <span className="hero-location"><MapPin size={14} /> Based in India</span>
              </div>
            </div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="hero-visual-top">
                <span><span className="status-dot" /> PORTFOLIO / 2026</span>
                <span>01 — 07</span>
              </div>
              <div className="profile-frame">
                <div className="profile-image-wrap">
                  <img
                    src="https://avatars.githubusercontent.com/u/199352391?v=4"
                    alt="Soniya Meena's GitHub profile avatar"
                    fetchPriority="high"
                  />
                </div>
                <span className="frame-star frame-star-one">✳</span>
                <span className="frame-star frame-star-two">✳</span>
                <div className="profile-caption">
                  <span className="caption-index">FIG. 01</span>
                  <span>Curiosity, in progress.</span>
                </div>
              </div>
              <div className="floating-label label-top"><span>Currently exploring</span><strong>Spring Boot × Web3</strong></div>
              <div className="floating-label label-bottom"><span>Based in</span><strong>New Delhi, IN <MapPin size={13} /></strong></div>
              <div className="visual-code">
                <span className="code-dots"><i /><i /><i /></span>
                <code>
                  <span className="code-purple">const</span> developer = {'{'}
                  <br />
                  &nbsp;&nbsp;name: <span className="code-green">"Soniya Meena"</span>,
                  <br />
                  &nbsp;&nbsp;focus: [<span className="code-green">"Java"</span>, <span className="code-green">"React"</span>,<span className="code-green">"Solidity"</span>],
                  <br />
                  &nbsp;&nbsp;build: <span className="code-green">"with intent"</span>
                  <br />
                  {'}'}
                </code>
              </div>
            </motion.div>
            <a className="hero-scroll" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
          </section>

          <section className="stats-strip section-wrap" aria-label="Professional snapshot">
            {stats.map((stat, index) => <AnimatedStat key={stat.label} {...stat} delay={index * 0.08} />)}
          </section>

          <section className="section section-wrap about-section" id="about">
            <SectionHeading index="01" eyebrow="A LITTLE ABOUT ME" title="Curious by nature. Builder by choice." />
            <div className="about-grid">
              <div className="about-copy">
                <p className="lead-copy">
                  I’m a Computer Science and Engineering undergraduate at Bhagat Phool Singh
                  Mahila Vishwavidyalaya, interested in building useful software from the ground up.
                </p>
                <p>
                  My work moves between Java and Spring on the backend, React on the frontend, and
                  mobile and blockchain projects that keep me learning. I care about how systems
                  behave as much as how they feel to use.
                </p>
                <p>
                  Outside of coursework, I contribute to open source, explore emerging technology,
                  and keep sharpening my problem-solving fundamentals.
                </p>
                <a className="text-link" href="#contact">A little more about my story <ArrowRight size={15} /></a>
              </div>
              <div className="journey-card">
                <div className="journey-card-heading"><span>THE JOURNEY SO FAR</span><span>2024 — NOW</span></div>
                <div className="journey-item">
                  <span className="journey-node" />
                  <div><time>2024 — 2028</time><strong>B.Tech, Computer Science</strong><span>BPS Mahila Vishwavidyalaya</span></div>
                </div>
                <div className="journey-item">
                  <span className="journey-node" />
                  <div><time>2026</time><strong>Open-source contributor</strong><span>GirlScript Summer of Code</span></div>
                </div>
                <div className="journey-item">
                  <span className="journey-node node-current" />
                  <div><time>2026 — PRESENT</time><strong>Software Developer Intern</strong><span>Quantify · Mobile & Blockchain</span></div>
                </div>
                <div className="journey-footer"><span>Always learning, always building</span><span>↗</span></div>
              </div>
            </div>
          </section>

          <section className="section section-wrap experience-section" id="experience">
            <SectionHeading index="02" eyebrow="WHERE I'VE CONTRIBUTED" title="Experience that compounds." />
            <div className="experience-list">
              {experience.map((item, index) => (
                <motion.article
                  className="experience-row"
                  key={item.company}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <div className="experience-date"><span>{item.dates}</span><span className="experience-line" /></div>
                  <div className="experience-content">
                    <button
                      className="experience-title-row"
                      type="button"
                      aria-expanded={expandedExperience === item.company}
                      aria-controls={`experience-${index}`}
                      onClick={() => setExpandedExperience((current) => current === item.company ? null : item.company)}
                    >
                      <div><span className="experience-type">{item.type}</span><h3>{item.role}</h3><p className="experience-company">{item.company}</p></div>
                      <ChevronDown size={17} className={`experience-chevron ${expandedExperience === item.company ? 'is-expanded' : ''}`} aria-hidden="true" />
                    </button>
                    <div id={`experience-${index}`} hidden={expandedExperience !== item.company}>
                      <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
                      <div className="tag-row">{item.technologies.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="section skills-section" id="skills">
            <div className="section-wrap">
              <SectionHeading index="03" eyebrow="TOOLS OF THE TRADE" title="A toolkit that keeps growing." />
              <p className="section-intro">No arbitrary scores. Just the technologies I’ve been learning and using to build.</p>
              <div className="skills-grid">
                {skillGroups.map((group, index) => (
                  <motion.article
                    className="skill-group"
                    key={group.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                  >
                    <div className="skill-group-title"><span className="skill-symbol">{['⌘', '⌁', '◈', '⟡', '↗'][index]}</span><h3>{group.title}</h3></div>
                    <div className="tag-row">{group.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}</div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          <section className="section section-wrap projects-section" id="projects">
            <SectionHeading index="04" eyebrow="SELECTED WORK" title="Small details. Bigger ideas." />
            <div className="projects-grid">
              {projects.map((project, index) => (
                <motion.article
                  className={`project-card project-${project.accent}`}
                  key={project.name}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: index * 0.1, duration: 0.45 }}
                >
                  <button className="project-preview" onClick={() => setSelectedProject(index)} aria-label={`View details for ${project.name}`}>
                    <span className="preview-meta"><span>{project.category}</span><span>0{index + 1} / 0{projects.length}</span></span>
                    <ProjectArtwork index={index} />
                    <span className="preview-open"><ArrowUpRight size={17} /></span>
                  </button>
                  <div className="project-card-content">
                    <div className="project-heading-row"><h3>{project.name}</h3><span className="project-mark">{project.mark}</span></div>
                    <p>{project.description}</p>
                    <div className="tag-row project-tags">{project.stack.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
                    <div className="project-footer">
                      <button className="text-link" onClick={() => setSelectedProject(index)}>Explore project <ArrowRight size={15} /></button>
                      <ExternalAnchor href={project.url} label={`Open ${project.name} on GitHub`}><GithubMark /></ExternalAnchor>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          <section className="section github-section" id="github">
            <div className="section-wrap">
              <SectionHeading index="05" eyebrow="OPEN SOURCE, IN MOTION" title="A window into my GitHub." />
              <GitHubActivity />
            </div>
          </section>

          <section className="section section-wrap coding-section" id="coding">
            <div className="coding-card">
              <div className="coding-icon"><Code2 size={24} /></div>
              <div className="coding-copy">
                <span className="section-eyebrow">THE DAILY PRACTICE</span>
                <h2>Strong fundamentals, one problem at a time.</h2>
                <p>500+ data structures and algorithms problems solved. Currently focused on Java, patterns, and writing clear solutions.</p>
              </div>
              <ExternalAnchor href={profile.leetcode} className="button button-outline">
                LeetCode profile <ArrowUpRight size={15} />
              </ExternalAnchor>
              <div className="coding-watermark">DSA</div>
            </div>
          </section>

          <section className="section section-wrap education-section" id="education">
            <SectionHeading index="06" eyebrow="THE FOUNDATIONS" title="Learning with purpose." />
            <div className="education-grid">
              <div className="education-list">
                {education.map((item) => (
                  <article className="education-item" key={item.institution}>
                    <div className="education-symbol">✳</div>
                    <div className="education-details">
                      <span className="education-date">{item.dates || 'COMPLETED'}</span>
                      <h3>{item.institution}</h3>
                      <p>{item.degree}</p>
                    </div>
                    <strong className="education-result">{item.result}</strong>
                  </article>
                ))}
              </div>
              <aside className="coursework-card">
                <span className="section-eyebrow">RELEVANT COURSEWORK</span>
                <h3>Concepts I’m building on.</h3>
                <div className="coursework-list">
                  {coursework.map((course, index) => <span key={course}><i>{String(index + 1).padStart(2, '0')}</i>{course}</span>)}
                </div>
              </aside>
            </div>
            <div className="credentials" id="achievements">
              <div className="credentials-heading"><span className="section-eyebrow">CERTIFICATIONS & RECOGNITION</span><span>03 ITEMS</span></div>
              <div className="credentials-grid">
                {credentials.map((credential) => (
                  <article className="credential" key={credential.name}>
                    <span className="credential-icon">✳</span>
                    <div><span>{credential.type} · {credential.year}</span><h3>{credential.name}</h3><p>{credential.issuer}</p></div>
                    <Check size={16} className="credential-check" />
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section contact-section" id="contact">
            <div className="section-wrap">
              <div className="contact-topline"><span className="section-eyebrow">07 / SAY HELLO</span><span><span className="status-dot" /> OPEN TO THE RIGHT OPPORTUNITY</span></div>
              <div className="contact-grid">
                <div className="contact-copy">
                  <h2>Have an opportunity<br />or an idea in mind<span className="heading-period">?</span></h2>
                  <p>I’d love to hear what you’re working on. Tell me a little about it and let’s see where the conversation goes.</p>
                  <button className="email-copy" onClick={copyEmail}>
                    <span>{profile.email}</span>{copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <div className="contact-socials">
                    <ExternalAnchor href={profile.linkedin}><LinkedinMark /> LinkedIn <ArrowUpRight size={13} /></ExternalAnchor>
                    <ExternalAnchor href={profile.github}><GithubMark /> GitHub <ArrowUpRight size={13} /></ExternalAnchor>
                    <ExternalAnchor href={profile.leetcode}><Code2 size={17} /> LeetCode <ArrowUpRight size={13} /></ExternalAnchor>
                  </div>
                </div>
                <form className="contact-form" onSubmit={submitContact}>
                  <div className="form-row">
                    <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" required /></label>
                    <label>Email address<input name="email" type="email" autoComplete="email" placeholder="jane@company.com" required /></label>
                  </div>
                  <label>Subject<input name="subject" placeholder="A role, a project, or just hello" required /></label>
                  <label>Message<textarea name="message" rows={4} placeholder="A little context goes a long way..." required /></label>
                  <button className="button button-accent form-submit" type="submit" disabled={contactSending}>
                    {contactSending ? 'Sending…' : 'Send message'} <Send size={15} />
                  </button>
                  {contactMessage && <p className="form-feedback" role="status">{contactMessage}</p>}
                  <p className="form-footnote">This opens your email app; nothing is sent through this site.</p>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="site-footer">
          <div className="section-wrap footer-main">
            <a className="wordmark" href="#home"><span className="wordmark-mark">S</span><span>soniya<span className="wordmark-period">.</span></span></a>
            <p>Building thoughtfully, learning constantly.</p>
            <div className="footer-links">
              {navigation.slice(0, 5).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
            </div>
            <a className="back-top" href="#home" aria-label="Back to top">BACK TO TOP <ArrowUpRight size={14} /></a>
          </div>
          <div className="section-wrap footer-bottom"><span>© {currentYear} Soniya Meena</span><span>Made with curiosity in New Delhi, India <span className="footer-spark">✳</span></span></div>
        </footer>

        <AnimatePresence>
          {selectedProject !== null && (
            <ProjectDialog index={selectedProject} onClose={() => setSelectedProject(null)} />
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  )
}

function SectionHeading({ index, eyebrow, title }: { index: string; eyebrow: string; title: string }) {
  return (
    <div className="section-heading">
      <div className="section-heading-meta"><span>{index}</span><span className="section-eyebrow">{eyebrow}</span></div>
      <h2>{title}</h2>
      <span className="heading-ornament" aria-hidden="true">✳</span>
    </div>
  )
}

function AnimatedStat({
  value,
  suffix,
  label,
  delay,
}: {
  value: string
  suffix: string
  label: string
  delay: number
}) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(numberRef, { once: true, margin: '-50px' })
  const [count, setCount] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? value : '0',
  )

  useEffect(() => {
    if (!isInView) return
    const target = Number(value)
    const decimals = value.includes('.') ? 1 : 0
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const startedAt = performance.now()
    let frame = 0
    function animate(now: number) {
      const progress = Math.min((now - startedAt) / 850, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount((target * eased).toFixed(decimals).padStart(value.length, '0'))
      if (progress < 1) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isInView, value])

  return (
    <motion.div
      className="stat-item"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay, duration: 0.4 }}
    >
      <strong><span ref={numberRef} className="stat-number">{count}</span><span>{suffix}</span></strong>
      <span>{label}</span>
    </motion.div>
  )
}

function ProjectArtwork({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="artwork artwork-logistics" aria-hidden="true">
        <div className="logistics-sidebar"><i /><i /><i /><i /></div>
        <div className="logistics-board">
          <div className="logistics-heading"><span>Shipment overview</span><span>● ACTIVE</span></div>
          <div className="logistics-stats"><i /><i /><i /></div>
          <div className="logistics-route"><span>DEL</span><div><i /><i /><i /><i /><i /></div><span>BLR</span></div>
          <div className="logistics-card"><span>●</span><i /><i /><b>82%</b></div>
        </div>
        <span className="artwork-index">ROUTE / 0024</span>
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="artwork artwork-lok" aria-hidden="true">
        <div className="lok-map-grid" />
        <div className="map-path"><i /><i /><i /><i /><i /></div>
        <div className="map-pins"><span>+</span><span>+</span><span>+</span></div>
        <div className="lok-info-card"><span>PROJECT STATUS</span><b>On track <i /></b><div><span>Progress</span><strong>68%</strong></div><i className="lok-progress"><b /></i></div>
        <span className="artwork-index">N 28° 36' / E 77° 12'</span>
      </div>
    )
  }
  if (index === 2) {
    return (
      <div className="artwork artwork-agent" aria-hidden="true">
        <div className="agent-orbit agent-orbit-a" /><div className="agent-orbit agent-orbit-b" />
        <div className="agent-core"><span>AC</span><i>✳</i></div>
        <div className="agent-node node-product"><span>01</span><b>DISCOVER</b></div>
        <div className="agent-node node-negotiate"><span>02</span><b>NEGOTIATE</b></div>
        <div className="agent-node node-approve"><span>03</span><b>APPROVE</b></div>
        <div className="agent-node node-pay"><span>04</span><b>TRANSACT</b></div>
        <span className="artwork-index">AGENT WORKFLOW / V.1</span>
      </div>
    )
  }
  if (index === 3) {
    return (
      <div className="artwork artwork-tipjar" aria-hidden="true">
        <div className="tipjar-glow" />
        <div className="tipjar-eth-symbol"><span>Ξ</span></div>
        <div className="tipjar-board">
          <div className="tipjar-heading"><span>TipJar dApp</span><span className="tipjar-badge">● Sepolia</span></div>
          <div className="tipjar-amount-card">
            <span className="tipjar-sublabel">SEND ETH TIP</span>
            <div className="tipjar-val-row"><b>0.05</b><span>ETH</span></div>
          </div>
          <div className="tipjar-memo-card">
            <span className="tipjar-sublabel">MEMO</span>
            <p>Great project! Keep building ☕</p>
          </div>
          <div className="tipjar-btn-row">
            <span className="tipjar-action-btn">Send Tip</span>
            <span className="tipjar-gas">Gas: 0.0004 ETH</span>
          </div>
        </div>
        <div className="tipjar-token-pill"><span>QTK</span><b>ERC-20</b></div>
        <span className="artwork-index">SEPOLIA / 0x6252...7Ae</span>
      </div>
    )
  }
  return (
    <div className="artwork artwork-dhunn" aria-hidden="true">
      <div className="dhunn-glow" />
      <div className="dhunn-player">
        <div className="dhunn-top">
          <div className="dhunn-disc">
            <div className="dhunn-disc-ring" />
            <span>♫</span>
          </div>
          <div className="dhunn-title-group">
            <span className="dhunn-badge">NOW PLAYING</span>
            <strong>Dhunn Beats</strong>
            <span>Audius Stream · Chill</span>
          </div>
        </div>
        <div className="dhunn-waveform">
          <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
        </div>
        <div className="dhunn-scrub">
          <time>01:42</time>
          <div className="dhunn-progress"><b /></div>
          <time>03:28</time>
        </div>
        <div className="dhunn-controls">
          <span>⏮</span>
          <span className="dhunn-play">▶</span>
          <span>⏭</span>
          <span className="dhunn-heart">♥</span>
        </div>
      </div>
      <div className="dhunn-pill"><span>Expo Go</span><i>●</i></div>
      <span className="artwork-index">REACT NATIVE / EXPO AUDIO</span>
    </div>
  )
}

function ProjectDialog({ index, onClose }: { index: number; onClose: () => void }) {
  const project = projects[index]
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    dialog.querySelector<HTMLButtonElement>('.dialog-close')?.focus()
    function keepFocusInside(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', keepFocusInside)
    return () => document.removeEventListener('keydown', keepFocusInside)
  }, [])

  return (
    <motion.div
      className="dialog-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <motion.section
        ref={dialogRef}
        className="project-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        <button className="icon-button dialog-close" onClick={onClose} aria-label="Close project details"><X size={19} /></button>
        <span className="section-eyebrow">{project.category} · PROJECT {project.mark}</span>
        <h2 id="dialog-title">{project.name}</h2>
        <p>{project.details}</p>
        <div className="tag-row">{project.stack.map((tech) => <span className="tag" key={tech}>{tech}</span>)}</div>
        <div className="dialog-links">
          <ExternalAnchor href={project.url} className="button button-dark"><GithubMark size={16} /> View source <ArrowUpRight size={14} /></ExternalAnchor>
          {project.demo && <ExternalAnchor href={project.demo} className="button button-outline">Live demo <ExternalLink size={14} /></ExternalAnchor>}
        </div>
      </motion.section>
    </motion.div>
  )
}

function GitHubActivity() {
  const { profile: githubProfile, repositories, loading, error, reload } = useGitHub()
  const [language, setLanguage] = useState('All languages')
  const [sort, setSort] = useState<'updated' | 'stars'>('updated')
  const [showAll, setShowAll] = useState(false)
  const languages = useMemo(
    () => ['All languages', ...Array.from(new Set(repositories.map((repo) => repo.language).filter((value): value is string => Boolean(value))))].sort((a, b) => a === 'All languages' ? -1 : a.localeCompare(b)),
    [repositories],
  )
  const visibleRepos = useMemo(() => {
    const filtered = repositories.filter((repo) => language === 'All languages' || repo.language === language)
    return filtered.sort((a, b) => sort === 'stars'
      ? b.stargazers_count - a.stargazers_count
      : new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
  }, [language, repositories, sort])
  const shownRepos = showAll ? visibleRepos : visibleRepos.slice(0, 6)

  return (
    <div className="github-content">
      {githubProfile && (
        <div className="github-profile">
          <img src={githubProfile.avatar_url} alt="" loading="lazy" />
          <div className="github-profile-info"><strong>{githubProfile.name?.trim() || githubProfile.login}</strong><span>{githubProfile.bio || 'Building in public.'}</span></div>
          <div className="github-metrics"><span><strong>{githubProfile.public_repos}</strong> public repos</span><span><strong>{githubProfile.followers}</strong> followers</span><span><strong>{githubProfile.following}</strong> following</span></div>
          <ExternalAnchor href={githubProfile.html_url} className="github-profile-link">View profile <ArrowUpRight size={14} /></ExternalAnchor>
        </div>
      )}
      <div className="repo-toolbar">
        <div><span className="repo-count">{loading ? '…' : repositories.length}</span><span>repositories</span></div>
        <div className="repo-filters">
          <label>Language
            <select value={language} onChange={(event) => { setLanguage(event.target.value); setShowAll(false) }} disabled={loading}>
              {languages.map((item) => <option key={item}>{item}</option>)}
            </select>
          </label>
          <label>Sort
            <select value={sort} onChange={(event) => setSort(event.target.value as 'updated' | 'stars')}>
              <option value="updated">Recently updated</option>
              <option value="stars">Most stars</option>
            </select>
          </label>
        </div>
      </div>
      {loading ? (
        <div className="repo-grid" aria-label="Loading repositories">{Array.from({ length: 6 }, (_, index) => <div className="repo-skeleton" key={index}><i /><i /><i /><i /></div>)}</div>
      ) : error ? (
        <div className="github-error" role="alert"><p>{error}</p><button className="button button-outline" onClick={reload}><RefreshCw size={15} /> Try again</button></div>
      ) : shownRepos.length === 0 ? (
        <div className="github-empty">No public repositories match this language yet.</div>
      ) : (
        <>
          <div className="repo-grid">
            {shownRepos.map((repo) => <RepositoryCard key={repo.id} repo={repo} />)}
          </div>
          {visibleRepos.length > 6 && (
            <button className="repo-more" onClick={() => setShowAll((value) => !value)}>
              {showAll ? 'Show fewer repositories' : `Show all ${visibleRepos.length} repositories`} <ArrowDown size={14} className={showAll ? 'rotate-up' : ''} />
            </button>
          )}
        </>
      )}
    </div>
  )
}

function RepositoryCard({ repo }: { repo: GitHubRepository }) {
  const updated = new Date(repo.updated_at).toLocaleDateString('en', { month: 'short', year: 'numeric' })
  return (
    <article className="repo-card">
      <div className="repo-card-top"><Code2 size={17} /><span>UPDATED {updated.toUpperCase()}</span></div>
      <ExternalAnchor href={repo.html_url} className="repo-name">{repo.name}<ArrowUpRight size={14} /></ExternalAnchor>
      <p>{repo.description || 'A public project from my GitHub.'}</p>
      <div className="repo-card-bottom">
        <span className="repo-language">{repo.language && <i className={`language-dot lang-${repo.language.toLowerCase().replace(/[^a-z0-9]/g, '')}`} />}{repo.language || 'No language set'}</span>
        <span><Star size={14} /> {repo.stargazers_count}</span>
        <span><GitFork size={14} /> {repo.forks_count}</span>
      </div>
    </article>
  )
}

export default App
