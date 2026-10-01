import { useEffect, useState } from 'react'
import { Reveal, GeoPattern } from './common'
import { Phone, SCREENS } from './Phone'

export default function Showcase() {
  const keys = Object.keys(SCREENS)
  const [active, setActive] = useState('home')
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const t = setInterval(() => setActive((a) => keys[(keys.indexOf(a) + 1) % keys.length]), 4200)
    return () => clearInterval(t)
  }, [auto])   // eslint-disable-line react-hooks/exhaustive-deps

  const { C, title, text } = SCREENS[active]
  return (
    <section id="screens" className="relative overflow-hidden bg-tiswa-900 px-5 py-24 text-cream-50">
      <div className="text-gold-400/10"><GeoPattern id="geo-show" /></div>
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-tiswa-500/25 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="section-eyebrow !text-gold-400">Take a look</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] sm:text-5xl">Built for thumbs.<br />Clear at a glance.</h2>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {keys.map((k) => (
              <button
                key={k}
                onClick={() => { setActive(k); setAuto(false) }}
                className={`rounded-2xl px-4 py-2.5 text-sm font-medium transition-all ${active === k ? 'bg-gold-400 text-tiswa-950 shadow-lg' : 'border border-white/20 bg-white/5 text-cream-100 hover:bg-white/15'}`}
              >
                <i className={`fa-solid ${SCREENS[k].icon} mr-2`} />{SCREENS[k].label}
              </button>
            ))}
          </div>
          <div key={active} className="mt-8 max-w-md animate-screenIn">
            <h3 className="font-display text-2xl font-bold text-gold-300">{title}</h3>
            <p className="mt-2 leading-relaxed text-cream-100/75">{text}</p>
          </div>
          <div className="mt-8 flex gap-1.5">
            {keys.map((k) => (
              <span key={k} className={`h-1 rounded-full transition-all duration-500 ${active === k ? 'w-10 bg-gold-400' : 'w-4 bg-white/25'}`} />
            ))}
          </div>
          <p className="mt-6 text-xs text-cream-100/45">Screens show sample data.</p>
        </Reveal>
        <Reveal delay={120} className="relative">
          <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/25 blur-[90px]" />
          <Phone><div key={active} className="h-full animate-screenIn"><C /></div></Phone>
        </Reveal>
      </div>
    </section>
  )
}
