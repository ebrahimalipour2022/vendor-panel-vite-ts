export const OTP_TIMER = 120 //sec

export const getCounterTime = (time: number) => {
  const n = Number(time)
  const d = Math.floor(n / (24 * 3600))
  const h = Math.floor(n / 3600)
  const m = Math.floor((n % 3600) / 60)
  const s = Math.floor((n % 3600) % 60)

  const dDisplay = d > 0 ? (d < 10 ? `0${d}` : `${d}`) : ''
  const hDisplay = h > 0 ? (h < 10 ? `${d ? ':' : ''}0${h}` : `${d ? ':' : ''}${h}`) : ''

  const mDisplay = m > 0 ? (m < 10 ? `${h ? ':' : ''}0${m}` : `${h ? ':' : ''}${m}`) : `${h ? ':' : ''}00`

  const sDisplay = s > 0 ? (s < 10 ? `:0${s}` : `:${s}`) : ':00'

  return `${dDisplay}${hDisplay}${mDisplay}${sDisplay}`
}
