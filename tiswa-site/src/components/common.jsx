import { useEffect, useRef, useState } from 'react'
import { APK_URL } from '../config'

export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.disconnect() } },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</Tag>
}

// Reads the APK size from the server if the file is really there
export function useApkInfo() {
  const [info, setInfo] = useState({ size: null })
  useEffect(() => {
    let off = false
    fetch(APK_URL, { method: 'HEAD' })
      .then((r) => {
        const type = r.headers.get('content-type') || ''
        const len = Number(r.headers.get('content-length'))
        if (!off && r.ok && !type.includes('text/html') && len > 0) {
          setInfo({ size: (len / 1048576).toFixed(0) + ' MB' })
        }
      })
      .catch(() => {})
    return () => { off = true }
  }, [])
  return info
}

export function DownloadButton({ className = '', label = 'Download APK', size }) {
  return (
    <a href={APK_URL} download="TISWA.apk" className={`btn-gold ${className}`}>
      <i className="fa-brands fa-android text-2xl" />
      <span className="text-left leading-tight">
        <span className="block text-[15px]">{label}</span>
        {size && <span className="block text-[11px] font-medium opacity-70">{size} · direct download</span>}
      </span>
    </a>
  )
}

// Repeating eight-point-star lattice
export function GeoPattern({ className = '', id = 'geo' }) {
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
      <defs>
        <pattern id={id} width="88" height="88" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <rect x="24" y="24" width="40" height="40" />
            <rect x="24" y="24" width="40" height="40" transform="rotate(45 44 44)" />
            <circle cx="44" cy="44" r="7" />
            <circle cx="0" cy="0" r="3" /><circle cx="88" cy="0" r="3" />
            <circle cx="0" cy="88" r="3" /><circle cx="88" cy="88" r="3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}

export function Crescent({ className = '' }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M62 8a42 42 0 1 0 30 70A34 34 0 0 1 62 8z" fill="currentColor" />
      <path d="M80 18l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7-5.9-3.7-5.9 3.7 1.7-6.7-5.3-4.5 6.9-.5z" fill="currentColor" />
    </svg>
  )
}
