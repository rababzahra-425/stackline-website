/**
 * Transactional Email Service via Resend Mail Service API
 */

const sendEmail = async ({ to, subject, html, text }) => {
  const apiKey = process.env.RESEND_API_KEY;
  // Resend free tier requires onboarding@resend.dev as from sender unless custom domain is verified
  let fromEmail = 'KAJO Studio <onboarding@resend.dev>';
  if (process.env.EMAIL_FROM && !process.env.EMAIL_FROM.includes('gmail.com')) {
    fromEmail = process.env.EMAIL_FROM;
  }

  if (!apiKey) {
    console.warn('⚠️ [emailService] RESEND_API_KEY missing. Email dispatch simulated to console.');
    console.log(`[SIMULATED EMAIL] To: ${to} | Subject: ${subject}`);
    return { success: false, simulated: true };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ [emailService] Resend API Error:', data);
      throw new Error(data.message || 'Email service dispatch failed');
    }

    console.log('✅ [emailService] Email dispatched successfully:', data.id);
    return { success: true, id: data.id };
  } catch (error) {
    console.error('❌ [emailService] Exception:', error.message);
    throw error;
  }
};

/**
 * Send 6-Digit Password Reset Verification OTP Email to Admin
 */
const sendOtpEmail = async ({ to, name, otpCode }) => {
  const subject = '🔑 KAJO Studio Admin - 6-Digit Verification OTP';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0d0d0e; color: #ffffff; border-radius: 12px;">
      <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 16px;">KAJO STUDIO ADMIN</h2>
      <p style="color: #a1a1aa; font-size: 16px;">Hello ${name || 'Admin'},</p>
      <p style="color: #d4d4d8; font-size: 15px; line-height: 1.6;">
        We received a request to reset the password for your KAJO Studio Admin Control Center account. Here is your 6-digit OTP verification code:
      </p>
      <div style="margin: 28px 0; text-align: center;">
        <span style="background-color: #18181b; border: 1px solid #3f3f46; color: #ffffff; padding: 16px 32px; font-weight: bold; font-family: monospace; font-size: 32px; letter-spacing: 8px; border-radius: 8px; display: inline-block;">
          ${otpCode}
        </span>
      </div>
      <p style="color: #71717a; font-size: 13px;">
        This OTP code is valid for 10 minutes. Do not share this code with anyone.
      </p>
    </div>
  `;

  return await sendEmail({ to, subject, html, text: `Your KAJO Admin Password Reset OTP is: ${otpCode}` });
};

/**
 * Send Password Reset Link Email to Admin
 */
const sendPasswordResetEmail = async ({ to, name, resetUrl }) => {
  const subject = '🔐 KAJO Studio Admin - Password Reset Request';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0d0d0e; color: #ffffff; border-radius: 12px;">
      <h2 style="color: #ffffff; font-size: 24px; margin-bottom: 16px;">KAJO STUDIO ADMIN</h2>
      <p style="color: #a1a1aa; font-size: 16px;">Hello ${name || 'Admin'},</p>
      <p style="color: #d4d4d8; font-size: 15px; line-height: 1.6;">
        We received a request to reset the password for your KAJO Studio Admin Control Center account. Click the button below to set a new password:
      </p>
      <div style="margin: 32px 0; text-align: center;">
        <a href="${resetUrl}" style="background-color: #ffffff; color: #000000; padding: 14px 28px; font-weight: bold; text-decoration: none; border-radius: 8px; display: inline-block; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
          Reset Password ↗
        </a>
      </div>
      <p style="color: #71717a; font-size: 13px;">
        If you did not request this password reset, please ignore this email. This link will expire in 1 hour.
      </p>
    </div>
  `;

  return await sendEmail({ to, subject, html });
};

/**
 * Send New Client Inquiry Alert Email to Admin Inbox
 */
const sendInquiryAlertEmail = async ({ adminEmail, inquiry }) => {
  const subject = `📩 New Client Inquiry: ${inquiry.name} (${inquiry.service})`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0d0d0e; color: #ffffff; border-radius: 12px;">
      <h2 style="color: #ffffff; font-size: 20px; border-bottom: 1px solid #27272a; padding-bottom: 12px;">
        New Lead Submission from Let's Talk Page
      </h2>
      <div style="margin: 20px 0; space-y: 12px;">
        <p><strong style="color: #a1a1aa;">Client Name:</strong> ${inquiry.name}</p>
        <p><strong style="color: #a1a1aa;">Email:</strong> ${inquiry.email}</p>
        <p><strong style="color: #a1a1aa;">Service Requested:</strong> ${inquiry.service}</p>
        <p><strong style="color: #a1a1aa;">Budget Range:</strong> ${inquiry.budget}</p>
        <div style="background-color: #18181b; padding: 16px; border-radius: 8px; margin-top: 16px;">
          <p style="color: #a1a1aa; font-size: 12px; text-transform: uppercase; margin-top: 0;">Message:</p>
          <p style="color: #f4f4f5; line-height: 1.6; margin-bottom: 0;">${inquiry.message}</p>
        </div>
      </div>
      <p style="color: #71717a; font-size: 12px; border-top: 1px solid #27272a; pt: 16px;">
        Submitted via KAJO Studio Website • Log into Admin Panel to manage this lead.
      </p>
    </div>
  `;

  return await sendEmail({ to: adminEmail, subject, html });
};

module.exports = {
  sendEmail,
  sendOtpEmail,
  sendPasswordResetEmail,
  sendInquiryAlertEmail,
};
