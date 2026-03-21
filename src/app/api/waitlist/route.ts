import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

interface WaitlistPayload {
  email: string;
  timestamp: string;
  source: string;
  userAgent: string;
}

export async function POST(request: Request) {
  try {
    const body: WaitlistPayload = await request.json();

    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    if (GOOGLE_SCRIPT_URL) {
      const payload = JSON.stringify({
        timestamp: body.timestamp,
        email: body.email,
        source: body.source || 'vault-landing',
        userAgent: body.userAgent,
        type: 'waitlist',
      });

      const initialResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: payload,
        redirect: 'manual',
      });

      if (initialResponse.status === 302) {
        const redirectUrl = initialResponse.headers.get('location');
        if (redirectUrl) {
          await fetch(redirectUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: payload,
          });
        }
      }
    } else {
      console.log('WAITLIST SIGNUP:', {
        timestamp: body.timestamp,
        email: body.email,
        source: body.source,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
