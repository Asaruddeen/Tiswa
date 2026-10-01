import { COMPANY, SUPPORT_EMAIL, APP_VERSION } from '../config'
import { GeoPattern } from './common'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-tiswa-950 px-5 pb-28 pt-14 text-cream-100/70 md:pb-12">
      <div className="text-gold-400/[.07]"><GeoPattern id="geo-foot" /></div>
      <div className="relative mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="" className="h-11 w-11 rounded-xl" />
          <div>
            <p className="font-display text-lg font-extrabold text-cream-50">TISWA</p>
            <p className="text-xs">Smart Community Finance</p>
          </div>
        </div>
        <div className="text-sm">
          <p>Powered by <span className="font-semibold text-gold-300">{COMPANY}</span> · v{APP_VERSION}</p>
          {SUPPORT_EMAIL && <p className="mt-1"><a className="underline decoration-gold-400/50 underline-offset-4 hover:text-gold-300" href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>}
        </div>
      </div>
    </footer>
  )
}
