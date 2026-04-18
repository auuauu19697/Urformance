import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_KEY = import.meta.env.VITE_API_KEY || '';

export default function AdminDashboard() {
  const [mode, setMode] = useState('screening');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const url =
        mode === 'id'
          ? `${API_URL}/api/admin/orders/${encodeURIComponent(query.trim())}`
          : `${API_URL}/api/admin/orders/search?screening=${encodeURIComponent(query.trim())}`;

      const res = await fetch(url, {
        headers: { 'X-API-Key': API_KEY },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Search failed');

      if (mode === 'id') {
        setResults(data.order ? [data.order] : []);
      } else {
        setResults(data.results || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-8">
          Internal Tools
        </h1>

        <form onSubmit={handleSearch} className="flex gap-4 mb-10">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="p-4 rounded-xl border-2 border-slate-200 outline-none font-bold uppercase text-sm"
          >
            <option value="screening">By Screening Data</option>
            <option value="id">By Order ID</option>
          </select>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={mode === 'id' ? 'Enter Order ID...' : 'Enter Name, Number...'}
            className="flex-1 p-4 rounded-xl border-2 border-slate-200 outline-none focus:border-black"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-8 rounded-xl font-black uppercase text-sm shadow-xl disabled:bg-slate-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <p className="text-red-500 font-bold mb-4">{error}</p>}

        {!loading && results.length === 0 && query && !error && (
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
            No orders found.
          </p>
        )}

        <div className="space-y-6">
          {results.map((order, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
              <div className="flex justify-between items-start mb-6 pb-6 border-b-2 border-slate-100">
                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">
                    Order ID {order.orderId}
                  </h3>
                  <p className="text-xl font-bold">{order.customer?.fullName}</p>
                  <p className="text-sm text-slate-500">{order.customer?.phone} • {order.customer?.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black">{order.total}</p>
                  <a
                    href={order.slipUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-blue-500 uppercase tracking-wider hover:underline"
                  >
                    View Slip
                  </a>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {order.items?.map((item, i) => (
                  <div key={i} className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                    <div>
                      <p className="font-bold text-sm uppercase">{item.model}</p>
                      <p className="text-xs text-slate-500">
                        {item.color} • {item.size} • Qty {item.qty}
                      </p>
                    </div>
                    {item.screeningData && (
                      <div className="text-right">
                        {Object.entries(item.screeningData).map(([k, v]) => (
                          <div key={k} className="text-[10px] font-black uppercase bg-black text-white px-2 py-1 rounded inline-block ml-1 mb-1">
                            {k}: {v}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
