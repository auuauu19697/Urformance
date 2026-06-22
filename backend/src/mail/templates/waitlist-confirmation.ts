import { CreateWaitlistDto } from '../../waitlist/dto/create-waitlist.dto';

/**
 * Generates an HTML email body for the waitlist confirmation.
 */
export function buildWaitlistConfirmationHtml(
  dto: CreateWaitlistDto,
  brandName: string,
): string {
  // ── Brand Theming ──────────────────────────────────────────────────────────
  let primaryColor = '#111111';
  let primaryFg = '#ffffff';
  let bgOuter = '#f5f5f5';
  let bgInner = '#ffffff';
  let headerFont = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
  let headerFontStyle = 'italic';
  let headerFontWeight = '900';
  let headerLetterSpacing = '2px';

  const brandLower = (brandName || '').toLowerCase();

  if (brandLower.includes('mu-jersey')) {
    primaryColor = '#1e2d4a';
    primaryFg = '#ffffff';
    bgOuter = '#f8f5f0';
    bgInner = '#ffffff';
    headerFont = "Georgia, serif";
    headerFontStyle = 'normal';
    headerFontWeight = '600';
    headerLetterSpacing = '1px';
  } else if (brandLower.includes('ku-outfit') || brandLower.includes('kutee-club') || brandLower.includes('kutee')) {
    primaryColor = '#4C6A4A';
    primaryFg = '#FFFCF4';
    bgOuter = '#f4f1ea';
    bgInner = '#ffffff';
    headerFont = "Georgia, serif";
    headerFontStyle = 'normal';
    headerFontWeight = '600';
    headerLetterSpacing = '1px';
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0; padding:0; background:${bgOuter}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${bgOuter}; padding:24px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:${bgInner}; border-radius:8px; overflow:hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">

        <!-- Header -->
        <tr>
          <td style="background:${primaryColor}; color:${primaryFg}; padding:28px 32px; text-align:center;">
            <h1 style="margin:0; font-family:${headerFont}; font-size:24px; letter-spacing:${headerLetterSpacing}; font-weight:${headerFontWeight}; font-style:${headerFontStyle};">${brandName}</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px;">
            <h2 style="margin:0 0 8px; font-size:20px; color:#111;">You're on the list! 🎉</h2>
            <p style="color:#666; margin:0 0 24px; font-size:14px; line-height: 1.6;">
              Hi <strong>${dto.fullName}</strong>,<br/><br/>
              Thank you for joining the waitlist for the upcoming <strong>${brandName}</strong> drop. We have successfully registered your interest!<br/><br/>
              As a special thank you for signing up early, you've unlocked a <strong>20% discount</strong> on your first order. We will send your 20% discount details as soon as the collection drops.
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="background:#f8f8f8; border-radius:6px; padding:16px;">
                  <span style="font-size:11px; color:#888; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:8px;">Your Registered Details</span>
                  <table width="100%" cellpadding="0" cellspacing="0" style="font-size:13px; color:#333; line-height:1.8;">
                    <tr>
                      <td width="30%" style="color:#888;">Name:</td>
                      <td><strong>${dto.fullName}</strong></td>
                    </tr>
                    <tr>
                      <td style="color:#888;">Email:</td>
                      <td>${dto.email}</td>
                    </tr>
                    <tr>
                      <td style="color:#888;">Phone:</td>
                      <td>${dto.phone}</td>
                    </tr>
                    <tr>
                      <td style="color:#888;">Instagram:</td>
                      <td>${dto.instagram}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <p style="color:#666; font-size:14px; line-height: 1.6; margin-bottom:24px;">
              <strong>What's next?</strong><br/>
              We will notify you directly via email as soon as early-access ordering goes live. Keep an eye on your inbox so you don't miss the window!
            </p>

            <hr style="border:none; border-top:1px solid #eee; margin:24px 0;"/>

            <p style="color:#888; font-size:12px; line-height:1.6; margin:0;">
              You received this email because you signed up to join the ${brandName} waitlist. If you did not sign up or wish to be removed, please contact us.
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#fafafa; padding:20px 32px; text-align:center; border-top:1px solid #eee;">
            <p style="margin:0; font-size:11px; color:#ccc;">
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
