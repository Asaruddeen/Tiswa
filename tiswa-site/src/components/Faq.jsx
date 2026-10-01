import { useState } from 'react'
import { Reveal } from './common'
import { MIN_ANDROID } from '../config'

const Q = [
  ['Why does Android show a warning when I install?', 'TISWA is shared as an APK file directly from this website instead of the Play Store, so Android shows its standard “unknown source” notice for every app installed this way. Only install APKs from sources you trust.'],
  ['Which phones does it work on?', `Android phones running ${MIN_ANDROID}. There is no iPhone version at the moment.`],
  ['Does it cost anything?', 'No. The app is free to install and use.'],
  ['Where does the data come from?', 'The app loads the community’s members, payments, expenses and events live from the TISWA server. Pull down on any screen to refresh. The server can take a few seconds to wake up the first time you open the app.'],
  ['Can I pay inside the app?', 'The Pay screen opens your UPI app (GPay, PhonePe, Paytm and others) with the community UPI ID filled in. You enter the amount and your full name there, and the payment shows in History afterwards.'],
  ['How do I update the app?', 'Download the newest APK from this page and install it over the old one. Your data stays on the server, so nothing is lost.'],
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="px-5 pb-24 pt-8">
      <div className="mx-auto max-w-3xl">
        <Reveal className="text-center">
          <p className="section-eyebrow">Questions</p>
          <h2 className="section-title mt-3">Good to know.</h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {Q.map(([q, a], i) => (
            <Reveal key={q} delay={i * 50}>
              <div className={`overflow-hidden rounded-2xl border transition-colors ${open === i ? 'border-gold-500/60 bg-cream-50 shadow-lg' : 'border-tiswa-800/10 bg-cream-50/60'}`}>
                <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" aria-expanded={open === i}>
                  <span className="font-semibold text-tiswa-900">{q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-tiswa-800 text-gold-300 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}><i className="fa-solid fa-plus text-xs" /></span>
                </button>
                <div className={`grid transition-all duration-300 ${open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden"><p className="px-6 pb-5 leading-relaxed text-tiswa-900/70">{a}</p></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
