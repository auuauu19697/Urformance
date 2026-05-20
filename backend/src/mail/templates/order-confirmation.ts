import { CreateOrderDto } from '../../orders/dto/create-order.dto';

/**
 * Generates an HTML email body for the order confirmation.
 */
export function buildOrderConfirmationHtml(
  orderId: string,
  dto: CreateOrderDto,
  total: number,
  brandName: string,
): string {
  const { customer, items, paymentDateTime, note } = dto;

  // ── Item rows ──────────────────────────────────────────────────────────────
  const itemRows = items
    .map((item) => {
      const subtotal = item.qty * item.unitPrice;
      const screeningInfo = item.screeningData
        ? Object.entries(item.screeningData)
            .map(([k, v]) => `${k}: ${v}`)
            .join(', ')
        : '';
      return `
      <tr>
        <td style="padding:10px 8px; border-bottom:1px solid #eee;">
          <strong>${item.model}</strong><br/>
          <span style="color:#888; font-size:13px;">${item.color} · ${item.size}</span>
          ${screeningInfo ? `<br/><span style="color:#888; font-size:12px;">🏷 ${screeningInfo}</span>` : ''}
        </td>
        <td style="padding:10px 8px; border-bottom:1px solid #eee; text-align:center;">${item.qty}</td>
        <td style="padding:10px 8px; border-bottom:1px solid #eee; text-align:right;">${item.unitPrice.toLocaleString()}</td>
        <td style="padding:10px 8px; border-bottom:1px solid #eee; text-align:right; font-weight:bold;">${subtotal.toLocaleString()}</td>
      </tr>`;
    })
    .join('');

  // ── Full address ───────────────────────────────────────────────────────────
  const address = [
    customer.addressLine1,
    customer.subdistrict,
    customer.district,
    customer.province,
    customer.postalCode,
  ]
    .filter(Boolean)
    .join(', ');

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0; padding:0; background:#f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5; padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

        <!-- Header -->
        <tr>
          <td style="background:#111; color:#fff; padding:28px 32px; text-align:center;">
            <h1 style="margin:0; font-size:22px; letter-spacing:2px; font-weight:900; font-style:italic;">${brandName}</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <h2 style="margin:0 0 4px; font-size:20px;">Order Confirmed 🎉</h2>
            <p style="color:#666; margin:0 0 24px; font-size:14px;">
              Thank you for your order, <strong>${customer.fullName}</strong>!
            </p>

            <!-- Order ID badge -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="background:#f8f8f8; border-radius:6px; padding:12px 16px;">
                  <span style="font-size:12px; color:#888; text-transform:uppercase; letter-spacing:1px;">Order ID</span><br/>
                  <strong style="font-size:16px;">${orderId}</strong>
                </td>
                <td style="background:#f8f8f8; border-radius:6px; padding:12px 16px; text-align:right;">
                  <span style="font-size:12px; color:#888; text-transform:uppercase; letter-spacing:1px;">Payment</span><br/>
                  <strong style="font-size:14px;">${paymentDateTime}</strong>
                </td>
              </tr>
            </table>

            <!-- Items table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse; margin-bottom:16px;">
              <tr style="background:#fafafa;">
                <th style="padding:10px 8px; text-align:left; font-size:12px; text-transform:uppercase; color:#888; letter-spacing:0.5px;">Item</th>
                <th style="padding:10px 8px; text-align:center; font-size:12px; text-transform:uppercase; color:#888;">Qty</th>
                <th style="padding:10px 8px; text-align:right; font-size:12px; text-transform:uppercase; color:#888;">Price</th>
                <th style="padding:10px 8px; text-align:right; font-size:12px; text-transform:uppercase; color:#888;">Subtotal</th>
              </tr>
              ${itemRows}
            </table>

            <!-- Total -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="padding:12px 8px; font-size:18px; font-weight:900;">TOTAL</td>
                <td style="padding:12px 8px; font-size:18px; font-weight:900; text-align:right;">${total.toLocaleString()} THB</td>
              </tr>
            </table>

            <hr style="border:none; border-top:1px solid #eee; margin:0 0 24px;"/>

            <!-- Shipping -->
            <h3 style="margin:0 0 8px; font-size:14px; text-transform:uppercase; letter-spacing:1px; color:#888;">Shipping To</h3>
            <p style="margin:0 0 4px; font-size:14px;"><strong>${customer.fullName}</strong></p>
            <p style="margin:0 0 4px; font-size:14px; color:#555;">${address}</p>
            <p style="margin:0 0 4px; font-size:14px; color:#555;">📞 ${customer.phone}</p>
            <p style="margin:0 0 0; font-size:14px; color:#555;">✉️ ${customer.email}</p>

            ${note ? `<p style="margin:16px 0 0; padding:12px; background:#fffbeb; border-radius:6px; font-size:13px; color:#92400e;">📝 <strong>Note:</strong> ${note}</p>` : ''}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#fafafa; padding:20px 32px; text-align:center; border-top:1px solid #eee;">
            <p style="margin:0; font-size:12px; color:#aaa;">
              This is a pre-order confirmation. Production begins after the order period closes.<br/>
              Please allow 4–6 weeks for delivery.
            </p>
            <p style="margin:8px 0 0; font-size:11px; color:#ccc;">
              © ${new Date().getFullYear()} ${brandName}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
