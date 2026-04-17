const nodemailer = require('nodemailer');

function escapeHtml(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatMoney(n) {
  const x = typeof n === 'number' ? n : Number(n);
  return `$${Number.isFinite(x) ? x.toFixed(2) : '0.00'}`;
}

function formatDate(d) {
  if (!d) return '';
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function buildInvoiceHtml(booking, payment) {
  const svc = booking.service;
  const invoiceNo = payment.transactionId || String(payment._id);
  const paidAt = payment.updatedAt || new Date();

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family: Georgia, serif; color: #222; line-height: 1.5; max-width: 560px; margin: 0 auto; padding: 24px;">
  <p style="color: #7a4e30; font-size: 14px; letter-spacing: 2px; text-transform: uppercase; margin: 0;">LuxeHair</p>
  <h1 style="font-size: 22px; margin: 8px 0 16px;">Booking confirmed</h1>
  <p>Hi ${escapeHtml(booking.name)},</p>
  <p>Thank you for your payment. Your appointment is confirmed.</p>

  <div style="background: #f7f3ee; border: 2px dashed #b5845a; padding: 16px; margin: 20px 0; text-align: center;">
    <div style="font-size: 12px; color: #666;">Confirmation code</div>
    <div style="font-size: 20px; font-weight: bold; letter-spacing: 1px;">${escapeHtml(booking.confirmationCode)}</div>
  </div>

  <h2 style="font-size: 16px; border-bottom: 1px solid #ddd; padding-bottom: 8px;">Invoice</h2>
  <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
    <tr><td style="padding: 4px 0; color: #666;">Invoice #</td><td style="padding: 4px 0; text-align: right;">${escapeHtml(invoiceNo)}</td></tr>
    <tr><td style="padding: 4px 0; color: #666;">Date</td><td style="padding: 4px 0; text-align: right;">${escapeHtml(formatDate(paidAt))}</td></tr>
  </table>

  <table style="width: 100%; font-size: 14px; border-collapse: collapse; margin-top: 16px;">
    <thead>
      <tr style="border-bottom: 1px solid #ccc;">
        <th style="text-align: left; padding: 8px 0;">Description</th>
        <th style="text-align: right; padding: 8px 0;">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 10px 0; vertical-align: top;">
          <strong>${escapeHtml(svc?.name || 'Service')}</strong><br/>
          <span style="color: #666; font-size: 13px;">${escapeHtml(formatDate(booking.date))} · ${escapeHtml(booking.time)} · ${svc?.duration || '—'} min</span>
        </td>
        <td style="padding: 10px 0; text-align: right; vertical-align: top;">${formatMoney(payment.amount)}</td>
      </tr>
    </tbody>
  </table>

  <table style="width: 100%; font-size: 15px; margin-top: 8px;">
    <tr>
      <td style="padding: 12px 0; font-weight: bold;">Total paid</td>
      <td style="padding: 12px 0; text-align: right; font-weight: bold; color: #2d6a4f;">${formatMoney(payment.amount)}</td>
    </tr>
  </table>

  <p style="font-size: 14px; color: #444; margin-top: 20px;">
    <strong>Payment</strong><br/>
    Method: ${escapeHtml(payment.method)}<br/>
    ${payment.cardLast4 ? `Card ending in ${escapeHtml(payment.cardLast4)}<br/>` : ''}
    Transaction: ${escapeHtml(payment.transactionId || '—')}
  </p>

  <p style="font-size: 13px; color: #666; margin-top: 24px;">
    Questions? Call <strong>(555) 123-4567</strong>. Free cancellation up to 24 hours before your appointment.
  </p>
  <p style="font-size: 12px; color: #999;">This message was sent because you completed a booking at LuxeHair.</p>
</body>
</html>`;
}

function buildInvoiceText(booking, payment) {
  const svc = booking.service;
  const lines = [
    'LuxeHair — Booking confirmed',
    '',
    `Hi ${booking.name},`,
    '',
    `Confirmation code: ${booking.confirmationCode}`,
    '',
    `Invoice # ${payment.transactionId || payment._id}`,
    `Service: ${svc?.name || 'Service'}`,
    `Date: ${formatDate(booking.date)}`,
    `Time: ${booking.time}`,
    `Duration: ${svc?.duration || '—'} min`,
    '',
    `Total paid: ${formatMoney(payment.amount)}`,
    `Method: ${payment.method}`,
    payment.cardLast4 ? `Card: ****${payment.cardLast4}` : '',
    `Transaction: ${payment.transactionId || '—'}`,
    '',
    'Thank you for choosing LuxeHair.',
  ];
  return lines.filter(Boolean).join('\n');
}

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user, pass },
  });
}

/**
 * Sends confirmation email with code + invoice. Returns true if sent, false if SMTP not configured or send skipped.
 */
async function sendBookingConfirmationEmail(booking, payment) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('[email] SMTP_USER / SMTP_PASS (or SMTP_PASSWORD) not set — skipping confirmation email');
    return false;
  }

  const from = process.env.MAIL_FROM || `"LuxeHair" <${process.env.SMTP_USER}>`;
  const to = booking.email;

  await transporter.sendMail({
    from,
    to,
    subject: `Booking confirmed — ${booking.confirmationCode} | LuxeHair`,
    text: buildInvoiceText(booking, payment),
    html: buildInvoiceHtml(booking, payment),
  });

  return true;
}

module.exports = { sendBookingConfirmationEmail };
