import { useEffect, useState } from 'react'
import { APK_URL } from '../config'

export default function Navbar() {
  const [solid, setSolid] = useState(false)
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${solid ? 'bg-tiswa-900/90 py-2.5 shadow-lg backdrop-blur-xl' : 'py-4'}`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2.5">
          <img src="/logo.png" alt="TISWA" className="h-10 w-10 rounded-xl" />
          <span className="font-display text-xl font-extrabold tracking-wide text-cream-50">TISWA</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium text-cream-100/85 md:flex">
          <a href="#features" className="transition hover:text-gold-300">Features</a>
          <a href="#screens" className="transition hover:text-gold-300">Screens</a>
          <a href="#install" className="transition hover:text-gold-300">Install</a>
          <a href="#faq" className="transition hover:text-gold-300">FAQ</a>
        </nav>
        <a href={APK_URL} download="TISWA.apk" className="rounded-xl bg-gold-400 px-4 py-2 text-sm font-semibold text-tiswa-950 shadow transition hover:bg-gold-300 active:scale-95">
          <i className="fa-solid fa-download mr-2" />Get the app
        </a>
      </div>
    </header>
  )
}
