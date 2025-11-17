import { NextRequest, NextResponse } from 'next/server';

function isValidPhoneNumber(phone: string): boolean {
  return /^\+?[1-9]\d{1,14}$/.test(phone); // E.164 format
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { data, to } = body;

    if (!data) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let phoneNumbers = [to];
    if (!to) {
      phoneNumbers = process.env.ADMIN_PHONES?.split(',').map((p) => p.trim()) || [];

      if (!phoneNumbers || phoneNumbers.length === 0) {
        console.error('❌ Admin Phone Numbers missing. Set ADMIN_PHONES in .env.');
        return NextResponse.json({ error: 'Missing phone number' }, { status: 400 });
      }
    }

    const stromxToken = process.env.STROMX_API_TOKEN!;
    if (!stromxToken) {
      return NextResponse.json({ error: 'StromX token not set' }, { status: 500 });
    }

    const url = `https://api.stromx.io/v1/message/send-message?token=${stromxToken}`;

    const results: {
      to: string;
      status: 'success' | 'error';
      response?: unknown;
      error?: unknown;
    }[] = [];

    for (const phone of phoneNumbers) {
      if (!isValidPhoneNumber(phone)) {
        results.push({
          to: phone,
          status: 'error',
          error: 'Invalid phone number format. Must be in E.164 format like +919876543210'
        });
        continue;
      }

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...data,
            to: phone
          })
        });

        if (!response.ok) {
          const errorData = await response.text(); // optionally parse JSON if API always returns JSON
          throw new Error(`API error ${response.status}: ${errorData}`);
        }

        const responseData = await response.json();
        results.push({ to: phone, status: 'success', response: responseData });
      } catch (error: unknown) {
        let errorMessage = 'Unknown error';

        if (error instanceof Error) {
          errorMessage = error.message;
        } else {
          try {
            errorMessage = JSON.stringify(error);
          } catch {
            errorMessage = 'Non-serializable error';
          }
        }

        console.error(`WhatsApp error for ${phone}:`, errorMessage);
        results.push({ to: phone, status: 'error', error: errorMessage });
      }
    }

    return NextResponse.json({ success: true, results });

  } catch (err: unknown) {
    let errorMessage = 'Unexpected error occurred';

    if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      try {
        errorMessage = JSON.stringify(err);
      } catch {
        errorMessage = 'Non-serializable error';
      }
    }

    console.error('Error:', errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
