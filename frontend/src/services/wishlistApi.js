import { API_URL, API_KEY } from '../config'

export async function submitWishlist(data) {
  const res = await fetch(`${API_URL}/api/wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify(data),
  })

  const json = await res.json()
  if (!res.ok) throw new Error(json.message || 'Something went wrong.')
  return json
}
