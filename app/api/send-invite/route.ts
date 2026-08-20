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

    // Get current date/time formatted in Arabic
    const sentAt = new Date().toLocaleString("ar-EG", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Styled WhatsApp Message utilizing native markdown formatting & borders
    const messageBody =
      `━━━━━ 🌟 *تهنئة جديدة* 🌟 ━━━━━\n\n` +
      `✨ *مبروك للعروسين* *${WEDDING_DETAILS.groomName}* & *${WEDDING_DETAILS.brideName}* ✨\n\n` +
      `💌 *موجهة إلى:* *${recipientLabel}*\n` +
      `👤 *المرسل:* *${guestName || "محب للخير"}*\n\n` +
      `💬 *نص التهنئة:*\n` +
      `> _"${wishMessage}"_\n\n` +
      `📅 *تاريخ المناسبة:* ${WEDDING_DETAILS.displayDateArabic}\n` +
      `⏰ *تاريخ الإرسال:* ${sentAt}\n` +
      `━━━━━━━━━━━━━━━━━━━━`;

    // Construct public URL
    const host = request.headers.get("host") || "";
    const protocol = host.includes("localhost") ? "http" : "https";

    // Twilio CANNOT fetch localhost URLs.
    // Replace extension if your image is .png or .jpg (Note: convert .webp to .png first)
    const isLocalhost =
      host.includes("localhost") || host.includes("127.0.0.1");
    const imageUrl = `${protocol}://${host}/masjed.png`;

    const message = await client.messages.create({
      body: messageBody,
      from: twilioPhone,
      to: formattedTo,
      // Only attach mediaUrl if running on a live public domain (like Vercel) or via ngrok
      mediaUrl: isWhatsApp && !isLocalhost ? [imageUrl] : undefined,
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
