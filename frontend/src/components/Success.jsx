import { useTheme } from '../context/ThemeContext'

export default function Success({ orderId, total, onReset }) {
  const theme = useTheme()
  const ig     = theme.closedText?.instagram    ?? '@brand'
  const igUrl  = theme.closedText?.instagramUrl ?? '#'

  return (
    <div className="flex flex-col items-center text-center pt-2 gap-6">
      <div className="text-6xl">🎉</div>
      <div>
        <h2 className="text-3xl font-black italic uppercase leading-none mb-2">Order Placed!</h2>
        <p className="font-semibold text-muted font-secondary">
          Please check your email for a confirmation. If you don't receive one, reach us on Instagram at{' '}
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline"
          >
            {ig}
          </a>
          .
        </p>
      </div>

      <div className="card p-6 w-full text-left shadow-sm space-y-4">
        <div className="flex justify-between text-base">
          <span className="uppercase tracking-wide text-xs font-bold text-muted">Order ID</span>
          <span className="font-black">{orderId}</span>
        </div>
        <div className="flex justify-between text-base">
          <span className="uppercase tracking-wide text-xs font-bold text-muted">Total Paid</span>
          <span className="font-black">{total?.toLocaleString()} THB</span>
        </div>
      </div>

      <button
        id="place-another-btn"
        onClick={onReset}
        className="btn-primary w-full py-5 font-black text-lg shadow-2xl uppercase italic tracking-wider"
      >
        Place Another Order
      </button>
    </div>
  )
}
