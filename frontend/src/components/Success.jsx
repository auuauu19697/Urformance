export default function Success({ orderId, total, onReset }) {
  return (
    <div className="flex flex-col items-center text-center py-12 gap-6">
      <div className="text-6xl">🎉</div>
      <div>
        <h2 className="text-3xl font-black italic uppercase leading-none mb-2">Order Placed!</h2>
        <p className="font-semibold text-muted">We'll contact you shortly to confirm.</p>
      </div>

      <div className="card p-6 w-full text-left shadow-sm space-y-3">
        <div className="flex justify-between text-sm font-bold">
          <span className="uppercase tracking-wide text-[10px] text-muted">Order ID</span>
          <span className="font-black">{orderId}</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span className="uppercase tracking-wide text-[10px] text-muted">Total Paid</span>
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
