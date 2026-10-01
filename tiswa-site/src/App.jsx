import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Showcase from './components/Showcase'
import Install from './components/Install'
import Faq from './components/Faq'
import Footer from './components/Footer'
import { APK_URL } from './config'

// Sticky download bar for phones, hidden while the hero is on screen
function MobileBar() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 520)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 p-3 transition-transform duration-300 md:hidden ${show ? 'translate-y-0' : 'translate-y-full'}`} style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}>
      <a href={APK_URL} download="TISWA.apk" className="btn-gold w-full !py-3.5">
        <i className="fa-brands fa-android text-xl" /> Download TISWA APK
      </a>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Install />
        <Faq />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
