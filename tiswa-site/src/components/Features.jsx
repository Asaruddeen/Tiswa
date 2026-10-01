import { Reveal, GeoPattern } from './common'

const F = [
  { icon: 'fa-wallet', t: 'Live fund balance', d: 'Collected minus spent, always up to date the moment you open the app.' },
  { icon: 'fa-qrcode', t: 'Pay by UPI', d: 'One tap opens GPay, PhonePe or Paytm with the community UPI ID ready to go.' },
  { icon: 'fa-clock-rotate-left', t: 'Open ledger', d: 'Every contribution listed by name, date and amount, so nothing is hidden.' },
  { icon: 'fa-cart-shopping', t: 'Expense tracking', d: 'See exactly what the community bought and what it cost.' },
  { icon: 'fa-calendar-days', t: 'Events & updates', d: 'Upcoming, ongoing and completed events with photos, dates and locations.' },
  { icon: 'fa-users', t: 'Member directory', d: 'Know your leadership and members, with roles and contact numbers.' },
]

export default function Features() {
  return (
    <section id="features" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="section-eyebrow">What’s inside</p>
          <h2 className="section-title mt-3">Everything the community needs, nothing it doesn’t.</h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {F.map((f, i) => (
            <Reveal key={f.t} delay={(i % 3) * 90}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-tiswa-800/10 bg-cream-50 p-7 shadow-[0_10px_30px_-18px_rgba(15,76,42,.35)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold-500/50 hover:shadow-[0_24px_40px_-20px_rgba(15,76,42,.5)]">
                <div className="text-tiswa-800/0 transition group-hover:text-tiswa-800/[.07]"><GeoPattern id={`geo-f${i}`} /></div>
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-tiswa-800 to-tiswa-600 text-xl text-gold-300 shadow-lg transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110">
                    <i className={`fa-solid ${f.icon}`} />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-tiswa-900">{f.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-tiswa-900/70">{f.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
