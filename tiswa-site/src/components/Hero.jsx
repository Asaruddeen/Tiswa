import { GeoPattern, Crescent, DownloadButton, useApkInfo } from './common'
import { Phone, HomeScreen } from './Phone'
import { APP_VERSION, MIN_ANDROID } from '../config'

export default function Hero() {
  const { size } = useApkInfo()
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-br from-tiswa-950 via-tiswa-900 to-tiswa-700 pb-24 pt-32 text-cream-50 sm:pt-36">
      <div className="text-gold-400/[.14]"><GeoPattern id="geo-hero" /></div>
      <div className="absolute -right-40 -top-40 h-[520px] w-[520px] animate-spinSlow rounded-full border border-gold-400/20" />
      <div className="absolute -right-24 -top-24 h-[360px] w-[360px] animate-spinSlow rounded-full border border-dashed border-gold-400/20 [animation-direction:reverse]" />
      <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-tiswa-500/30 blur-[110px]" />
      <Crescent className="absolute left-[6%] top-28 hidden h-14 w-14 animate-floatSlow text-gold-400/70 lg:block" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <div className="inline-flex animate-fadeUp items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-1.5 text-xs font-medium text-gold-300">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400" /><span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" /></span>
            Now on Android · v{APP_VERSION}
          </div>
          <h1 className="mt-6 animate-fadeUp font-display text-5xl font-extrabold leading-[1.02] [animation-delay:.1s] sm:text-6xl lg:text-[4.4rem]">
            Your community’s money,{' '}
            <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-300 bg-[length:200%_100%] bg-clip-text text-transparent animate-shimmer">in plain sight.</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fadeUp text-lg leading-relaxed text-cream-100/80 [animation-delay:.2s]">
            TISWA is the community finance app that keeps every contribution, expense and event transparent. Check the fund, pay by UPI and follow what’s happening, all from your phone.
          </p>
          <div className="mt-9 flex animate-fadeUp flex-wrap items-center gap-4 [animation-delay:.3s]">
            <DownloadButton size={size} />
            <a href="#screens" className="btn-ghost"><i className="fa-regular fa-circle-play" />See the app</a>
          </div>
          <div className="mt-8 flex animate-fadeUp flex-wrap gap-x-7 gap-y-2 text-sm text-cream-100/70 [animation-delay:.4s]">
            <span><i className="fa-solid fa-shield-halved mr-2 text-gold-400" />Free to install</span>
            <span><i className="fa-brands fa-android mr-2 text-gold-400" />{MIN_ANDROID}</span>
            <span><i className="fa-solid fa-bolt mr-2 text-gold-400" />Live data</span>
          </div>
        </div>

        <div className="relative animate-fadeUp [animation-delay:.25s]">
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-400/20 blur-[90px]" />
          <div className="animate-float"><Phone><HomeScreen /></Phone></div>
          <div className="absolute -left-2 top-24 hidden animate-floatSlow rounded-2xl bg-cream-50 px-3.5 py-2.5 text-tiswa-900 shadow-2xl sm:block lg:-left-10">
            <p className="text-[10px] text-gray-500">New contribution</p>
            <p className="text-sm font-bold">💰 ₹ 2,100 received</p>
          </div>
          <div className="absolute -right-2 bottom-28 hidden animate-floatSlow rounded-2xl bg-tiswa-700 px-3.5 py-2.5 text-white shadow-2xl [animation-delay:1.5s] sm:block lg:-right-8">
            <p className="text-sm font-semibold"><i className="fa-solid fa-circle-check mr-1.5 text-gold-300" />Verified ledger</p>
          </div>
        </div>
      </div>
      <svg className="absolute inset-x-0 bottom-[-1px] h-12 w-full text-cream-100" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 48V24c120 22 240 24 360 8s240-30 360-26 240 28 360 32 240-8 360-26v36z" />
      </svg>
    </section>
  )
}
