export default function Success({ orderId, total, onReset }) {
  return (
    <div className="flex flex-col items-center text-center py-12 gap-6">
      <div className="text-6xl">🎉</div>
      <div>
        <h2 className="text-3xl font-black italic uppercase leading-none mb-2">Order Placed!</h2>
        <p className="text-slate-400 font-semibold">We'll contact you shortly to confirm.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full text-left shadow-sm space-y-3">
        <div className="flex justify-between text-sm font-bold">
          <span className="text-slate-400 uppercase tracking-wide text-[10px]">Order ID</span>
          <span className="font-black">{orderId}</span>
        </div>
        <div className="flex justify-between text-sm font-bold">
          <span className="text-slate-400 uppercase tracking-wide text-[10px]">Total Paid</span>
          <span className="font-black">{(total).toLocaleString()} THB</span>
        </div>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-black text-white py-5 rounded-3xl font-black text-lg shadow-2xl uppercase italic tracking-wider active:scale-95 transition"
      >
        Place Another Order
      </button>
    </div>
  )
}
