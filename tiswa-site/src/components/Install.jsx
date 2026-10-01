import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
import { Reveal, DownloadButton, useApkInfo } from './common'
import { APK_URL, APP_VERSION, MIN_ANDROID } from '../config'

function Qr() {
  const [svg, setSvg] = useState('')
  useEffect(() => {
    const url = new URL(APK_URL, window.location.href).href
    QRCode.toString(url, { type: 'svg', margin: 0, color: { dark: '#0f4c2a', light: '#0000' } }).then(setSvg).catch(() => {})
  }, [])
  if (!svg) return null
  return <div className="h-40 w-40 [&>svg]:h-full [&>svg]:w-full" dangerouslySetInnerHTML={{ __html: svg }} />
}

const STEPS = [
  { n: '1', icon: 'fa-download', t: 'Download the APK', d: 'Tap the download button on your Android phone. If your browser warns about the file type, choose “Download anyway”.' },
  { n: '2', icon: 'fa-unlock', t: 'Allow the install', d: 'Open the file. Android asks you to allow installs from your browser. Turn it on for this one install.' },
  { n: '3', icon: 'fa-mosque', t: 'Open TISWA', d: 'Tap Install, then Open. Pull down on any screen to refresh the latest data.' },
]

export default function Install() {
  const { size } = useApkInfo()
  return (
    <section id="install" className="px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">Get started</p>
          <h2 className="section-title mt-3">Three steps to install.</h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110}>
              <div className="relative h-full rounded-3xl bg-cream-50 p-7 shadow-[0_10px_30px_-18px_rgba(15,76,42,.35)]">
                <span className="absolute right-6 top-4 font-display text-7xl font-extrabold text-gold-500/20">{s.n}</span>
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-tiswa-800 text-gold-300"><i className={`fa-solid ${s.icon}`} /></div>
                <h3 className="mt-5 font-display text-xl font-bold text-tiswa-900">{s.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-tiswa-900/70">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100} className="mt-12">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-tiswa-900 to-tiswa-700 p-8 text-cream-50 shadow-2xl sm:p-12">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-400/20 blur-[70px]" />
            <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="font-display text-3xl font-extrabold sm:text-4xl">Download TISWA for Android</h3>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium">
                  {[`Version ${APP_VERSION}`, MIN_ANDROID, size && `${size}`, 'Free'].filter(Boolean).map((b) => (
                    <span key={b} className="rounded-full border border-white/20 bg-white/10 px-3 py-1">{b}</span>
                  ))}
                </div>
                <p className="mt-5 max-w-md text-cream-100/75">On a computer? Scan the code with your phone camera to download straight to your phone.</p>
                <div className="mt-7"><DownloadButton size={size} className="w-full sm:w-auto" /></div>
              </div>
              <div className="mx-auto rounded-3xl bg-cream-50 p-5 shadow-xl">
                <div className="relative">
                  <span className="absolute inset-0 animate-ring rounded-2xl border-2 border-gold-400" />
                  <Qr />
                </div>
                <p className="mt-3 text-center text-[11px] font-medium text-tiswa-800"><i className="fa-solid fa-camera mr-1.5" />Scan to download</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
