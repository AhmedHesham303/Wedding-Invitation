// app/api/send-invite/route.ts

import { NextResponse } from "next/server";
import twilio from "twilio";
import { WEDDING_DETAILS } from "@/app/_config/constants";

export async function POST(request: Request) {
  try {
    const { recipientType, guestName, wishMessage } = await request.json();

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !twilioPhone) {
      return NextResponse.json(
        { error: "متغيرات البيئة غير مكتملة." },
        { status: 500 },
      );
    }

    // Determine target phone number based on selection
    const targetPhone =
      recipientType === "bride"
        ? WEDDING_DETAILS.phoneNumbers.bride
        : WEDDING_DETAILS.phoneNumbers.groom;

    const client = twilio(accountSid, authToken);
    const isWhatsApp = twilioPhone.startsWith("whatsapp:");

    const formattedTo =
      isWhatsApp && !targetPhone.startsWith("whatsapp:")
        ? `whatsapp:${targetPhone}`
        : targetPhone;

    const recipientLabel =
      recipientType === "bride"
        ? WEDDING_DETAILS.brideName
        : WEDDING_DETAILS.groomName;

    // Styled WhatsApp Message utilizing native markdown formatting & borders
    const messageBody =
      `━━━━━ 🌟 *تهنئة جديدة* 🌟 ━━━━━\n\n` +
      `✨ *مبروك للعروسين* *${WEDDING_DETAILS.groomName}* & *${WEDDING_DETAILS.brideName}* ✨\n\n` +
      `💌 *موجهة إلى:* *${recipientLabel}*\n` +
      `👤 *المرسل:* *${guestName || "محب للخير"}*\n\n` +
      `💬 *نص التهنئة:*\n` +
      `> _"${wishMessage}"_\n\n` +
      `📅 *التاريخ:* ${WEDDING_DETAILS.displayDateArabic}\n` +
      `━━━━━━━━━━━━━━━━━━━━`;

    // Optionally include a public URL for an animated GIF or celebratory image
    const mediaUrl = [
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnZudXdmM2NvdTh0dnZwbXN3MXB5NHZ5NmRsaGprOGxwaThydms4ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26tOZ42Mg6pbTUPHW/giphy.gif",
    ];

    const message = await client.messages.create({
      body: messageBody,
      from: twilioPhone,
      to: formattedTo,
      mediaUrl: isWhatsApp ? mediaUrl : undefined, // Attach animation if using WhatsApp
    });

    return NextResponse.json({ success: true, sid: message.sid });
  } catch (error: any) {
    console.error("Twilio Error:", error);
    return NextResponse.json(
      { error: error.message || "فشل إرسال الرسالة" },
      { status: 500 },
    );
  }
}
