import { NextResponse } from 'next/server';

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || '';

interface FeedbackPayload {
  feedback: string;
  page: string;
  pageName: string;
  userAgent: string;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const body: FeedbackPayload = await request.json();

    if (!body.feedback || body.feedback.trim().length === 0) {
      return NextResponse.json(
        { error: 'Feedback text is required' },
        { status: 400 }
      );
    }

    if (body.feedback.length > 500) {
      return NextResponse.json(
        { error: 'Feedback must be 500 characters or less' },
        { status: 400 }
      );
    }

    if (GOOGLE_SCRIPT_URL) {
      // Use GET with data param to avoid Google Apps Script redirect issues
      const payload = JSON.stringify({
        timestamp: body.timestamp,
        page: body.page,
        pageName: body.pageName,
        feedback: body.feedback,
        userAgent: body.userAgent,
      });

      const url = `${GOOGLE_SCRIPT_URL}?data=${encodeURIComponent(payload)}`;
      await fetch(url, { redirect: 'follow' });
    } else {
      console.log('FEEDBACK RECEIVED:', {
        timestamp: body.timestamp,
        page: body.page,
        pageName: body.pageName,
        feedback: body.feedback,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
