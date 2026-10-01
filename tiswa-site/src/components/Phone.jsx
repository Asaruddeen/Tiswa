import { useEffect, useState } from 'react'

export function Phone({ children, className = '' }) {
  return (
    <div className={`relative mx-auto h-[590px] w-[290px] rounded-[2.9rem] bg-tiswa-950 p-[9px] shadow-[0_50px_90px_-20px_rgba(6,36,20,.65),inset_0_0_0_2px_rgba(255,255,255,.1)] ${className}`}>
      <div className="absolute left-1/2 top-[14px] z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-tiswa-950" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.3rem] bg-[#f0f4f0]">{children}</div>
    </div>
  )
}

const NAV = [
  ['fa-house', 'Home'], ['fa-users', 'Members'], ['fa-qrcode', 'Pay'], ['fa-clock-rotate-left', 'History'],
  ['fa-calendar-days', 'Events'], ['fa-receipt', 'Expense'], ['fa-chart-line', 'Balance'],
]
function MockNav({ active }) {
  return (
    <div className="absolute inset-x-2 bottom-2 flex rounded-[18px] bg-white/95 p-1 shadow-[0_8px_20px_rgba(0,0,0,.15)]">
      {NAV.map(([ic, lb]) => (
        <div key={lb} className={`flex flex-1 flex-col items-center gap-[2px] rounded-xl py-[5px] ${lb === active ? 'bg-tiswa-700 text-white' : 'text-gray-500'}`}>
          <i className={`fa-solid ${ic} text-[10px]`} />
          <span className="text-[6.5px] font-medium">{lb}</span>
        </div>
      ))}
    </div>
  )
}

function Count({ to, duration = 1600 }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    let raf, t0
    const step = (t) => {
      t0 ??= t
      const p = Math.min((t - t0) / duration, 1)
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])
  return <>{v.toLocaleString('en-IN')}</>
}

const grad = 'bg-gradient-to-br from-[#0f4c2a] to-[#1b6b3c]'

export function HomeScreen() {
  return (
    <div className="h-full px-3 pt-9">
      <div className="flex items-center justify-between rounded-2xl bg-white p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${grad}`}><i className="fa-solid fa-mosque text-white text-base" /></div>
          <span className="text-lg font-extrabold text-gray-800">TISWA</span>
        </div>
        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[8px] font-semibold text-green-800"><i className="fa-solid fa-shield-halved mr-1" />Unity</span>
      </div>
      <div className="mt-2.5 rounded-xl border-l-[5px] border-green-700 bg-white p-2.5 text-[8.5px] leading-snug text-gray-600 shadow-sm">
        Serving community with integrity, transparency, and collective growth.
      </div>
      <div className={`mt-2.5 rounded-2xl p-3.5 text-white shadow-lg ${grad}`}>
        <p className="text-[8px] font-medium tracking-widest text-green-100">TOTAL BALANCE</p>
        <p className="mt-0.5 text-[26px] font-bold leading-none">₹ <Count to={48250} /></p>
        <div className="mt-2.5 flex items-center justify-between text-[7.5px] text-green-100">
          <span>Friday, 2 October 2026</span><span className="rounded-full bg-white/20 px-1.5 py-0.5">Verified</span>
        </div>
      </div>
      <div className="mt-2.5 rounded-2xl bg-white p-3 shadow-sm">
        <p className="text-[11px] font-bold text-gray-800"><i className="fa-solid fa-wave-square mr-1.5 text-green-700" />Recent Activity</p>
        {[['💰', 'Haneefa contributed ₹ 2,100'], ['💰', 'Abdul Rahman contributed ₹ 500'], ['🛒', 'Purchased Team Jerseys — ₹ 5,400']].map(([i, t]) => (
          <div key={t} className="mt-1.5 flex items-center gap-2 rounded-lg bg-gray-50 p-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-[9px]">{i}</span>
            <span className="text-[8px] text-gray-700">{t}</span>
          </div>
        ))}
      </div>
      <MockNav active="Home" />
    </div>
  )
}

export function PayScreen() {
  return (
    <div className="h-full px-3 pt-9">
      <p className="mb-2 text-[15px] font-bold text-gray-800"><i className="fa-solid fa-qrcode mr-1.5 text-green-700" />Quick Donation</p>
      <div className="rounded-2xl bg-white p-3.5 text-center shadow-sm">
        <div className="mx-auto grid h-28 w-28 place-items-center rounded-xl border-2 border-green-200">
          <div className="grid grid-cols-7 gap-[2px]">
            {Array.from({ length: 49 }).map((_, i) => (
              <span key={i} className={`h-2.5 w-2.5 rounded-[1px] ${[0,1,2,4,5,6,7,13,14,20,21,24,27,28,34,35,41,42,43,44,46,47,48,10,17,31,38].includes(i) ? 'bg-tiswa-800' : 'bg-tiswa-100'}`} />
            ))}
          </div>
        </div>
        <div className="mt-3 flex gap-1.5">
          <div className="flex-[1.6] rounded-lg bg-green-700 py-1.5 text-[8.5px] font-semibold text-white"><i className="fa-solid fa-mobile-screen mr-1" />Pay with UPI app</div>
          <div className="flex-1 rounded-lg border border-green-200 bg-green-50 py-1.5 text-[8.5px] font-semibold text-green-800"><i className="fa-regular fa-copy mr-1" />Copy ID</div>
        </div>
        <div className="mt-3 rounded-xl bg-green-50/70 p-2.5 text-left text-[8px] leading-relaxed text-gray-700">
          <p className="font-bold text-green-800"><i className="fa-solid fa-circle-info mr-1" />Payment Instructions</p>
          <p className="mt-1">• Scan QR using any UPI app</p>
          <p>• Enter amount & mention your <b>Full Name</b></p>
          <p>• Reflects within 2 hours in history</p>
        </div>
      </div>
      <MockNav active="Pay" />
    </div>
  )
}

export function HistoryScreen() {
  const rows = [['Haneefa', '2 Apr 2026', '2,100'], ['Asaruddeen', '14 Mar 2026', '1,250'], ['Shameer M', '8 Mar 2026', '1,200'], ['Udhay K', '11 Feb 2026', '800'], ['Riyas A', '10 Feb 2026', '750'], ['Abdul Rahman', '12 Jan 2026', '500']]
  return (
    <div className="h-full px-3 pt-9">
      <p className="mb-2 text-[15px] font-bold text-gray-800"><i className="fa-solid fa-receipt mr-1.5 text-green-700" />GPay Style Ledger</p>
      <div className="rounded-2xl bg-white p-1 shadow-sm">
        {rows.map(([n, d, a], i) => (
          <div key={n} className={`flex items-center justify-between px-2.5 py-2 ${i < rows.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div><p className="text-[10px] font-medium text-gray-800">{n}</p><p className="text-[7.5px] text-gray-500">{d}</p></div>
            <div className="text-right"><p className="text-[10px] font-bold text-green-700">₹ {a}</p>
              <span className="rounded-full bg-green-100 px-1.5 py-[1px] text-[6.5px] font-semibold text-green-800"><i className="fa-solid fa-circle-check mr-0.5" />Success</span></div>
          </div>
        ))}
      </div>
      <p className="mt-2 text-center text-[7.5px] text-gray-400"><i className="fa-solid fa-shield-halved mr-1" />All transactions verified & immutable</p>
      <MockNav active="History" />
    </div>
  )
}

export function BalanceScreen() {
  return (
    <div className="h-full px-3 pt-9">
      <p className="mb-2 text-[15px] font-bold text-gray-800"><i className="fa-solid fa-chart-line mr-1.5 text-green-700" />Balance Dashboard</p>
      <div className="space-y-2.5">
        <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-sm">
          <div><p className="text-[9px] text-gray-500">Total Collected</p><p className="text-[22px] font-extrabold leading-tight text-green-700">₹ 82,450</p></div>
          <i className="fa-solid fa-hand-holding-dollar text-3xl text-green-200" />
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-white p-3.5 shadow-sm">
          <div><p className="text-[9px] text-gray-500">Total Spent</p><p className="text-[22px] font-extrabold leading-tight text-rose-600">₹ 34,200</p></div>
          <i className="fa-solid fa-chart-simple text-3xl text-rose-200" />
        </div>
        <div className={`rounded-2xl p-3.5 text-white shadow-lg ${grad}`}>
          <p className="text-[8px] tracking-widest text-green-100">REMAINING BALANCE</p>
          <p className="text-[26px] font-black leading-tight">₹ 48,250</p>
          <div className="mt-2.5 h-1.5 rounded-full bg-green-900/40"><div className="h-1.5 w-[58%] rounded-full bg-white" /></div>
          <div className="mt-2 flex justify-between text-[7.5px] text-green-100"><span>💰 Community Fund</span><span>⚡ 59% reserve</span></div>
        </div>
      </div>
      <MockNav active="Balance" />
    </div>
  )
}

export const SCREENS = {
  home: { label: 'Home', icon: 'fa-house', title: 'Your community at a glance', text: 'The live fund balance and the latest contributions and purchases the moment you open the app.', C: HomeScreen },
  pay: { label: 'Pay', icon: 'fa-qrcode', title: 'Pay in two taps', text: 'Open GPay, PhonePe or Paytm straight from the app with the UPI ID filled in, or copy it.', C: PayScreen },
  history: { label: 'History', icon: 'fa-clock-rotate-left', title: 'A ledger anyone can read', text: 'Every contribution listed by name, date and amount, newest first.', C: HistoryScreen },
  balance: { label: 'Balance', icon: 'fa-chart-line', title: 'Collected vs. spent', text: 'See what came in, what went out and how much reserve is left.', C: BalanceScreen },
}
