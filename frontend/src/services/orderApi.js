import { API_URL, API_KEY } from '../config'

/**
 * Submit an order to the NestJS backend.
 */
export async function submitOrder({ customer, items, paymentDateTime, slip, note = '' }) {
  const formData = new FormData()
  const orderPayload = { customer, items, paymentDateTime, note };
  console.log('Submitting Order Payload:', orderPayload);

  formData.append('slip', slip)
  formData.append(
    'order',
    JSON.stringify(orderPayload),
  )

  const res = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: { 'X-API-Key': API_KEY },
    body: formData,
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Something went wrong.')
  return data
}
