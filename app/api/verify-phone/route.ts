import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { phone } = await req.json();

  if (!phone || typeof phone !== "string") {
    return NextResponse.json({ valid: false, error: "missing_phone" }, { status: 400 });
  }

  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;

  if (!sid || !token) {
    console.error("[verify-phone] TWILIO_ACCOUNT_SID/TWILIO_AUTH_TOKEN não configurados");
    return NextResponse.json({ valid: true, skipped: true }); // fail-open
  }

  try {
    const url = `https://lookups.twilio.com/v2/PhoneNumbers/${encodeURIComponent(phone)}`;
    const auth = Buffer.from(`${sid}:${token}`).toString("base64");
    const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });

    if (!res.ok) {
      console.error(`[verify-phone] Twilio retornou ${res.status}`);
      return NextResponse.json({ valid: true, skipped: true }); // fail-open
    }

    const data = await res.json();
    return NextResponse.json({ valid: Boolean(data.valid) });
  } catch (err) {
    console.error("[verify-phone] Erro ao consultar Twilio:", err);
    return NextResponse.json({ valid: true, skipped: true }); // fail-open
  }
}
