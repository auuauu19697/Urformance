import { API_URL, API_KEY } from '../config'

/**
 * Submit an order to the NestJS backend.
 *
 * @param {object} customer  - { name, phone, address }
 * @param {Array}  items     - [{ sku, model, color, size, qty, unitPrice }]
 * @param {File}   slip      - payment slip image file
 * @param {string} [note]    - optional note
 * @returns {Promise<{ orderId: string, total: number }>}
 */
export async function submitOrder({ customer, items, slip, note = '' }) {
  const formData = new FormData()
  formData.append('slip', slip)
  formData.append(
    'order',
    JSON.stringify({ customer, items, note }),
  )

  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'X-API-Key': API_KEY,
    },
    body: formData,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong.')
  return data
}
