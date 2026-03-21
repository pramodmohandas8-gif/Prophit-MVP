import { NextResponse } from 'next/server';

// Payment verification request payload
interface PaymentVerificationPayload {
  propertyId: string;
  paymentMethod: 'UPI' | 'NEFT';
  amount: number;
  reference: string;
  units: number;
}

// Generate a unique transaction ID
function generateTransactionId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TXN-${timestamp}-${random}`;
}

export async function POST(request: Request) {
  try {
    const body: PaymentVerificationPayload = await request.json();

    // Validate required fields
    if (!body.propertyId || !body.paymentMethod || !body.amount || !body.reference || !body.units) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate payment method
    if (body.paymentMethod !== 'UPI' && body.paymentMethod !== 'NEFT') {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Validate amount
    if (body.amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Validate units
    if (body.units <= 0 || !Number.isInteger(body.units)) {
      return NextResponse.json(
        { error: 'Invalid units' },
        { status: 400 }
      );
    }

    // Generate transaction ID
    const transactionId = generateTransactionId();

    // Simulate payment verification based on payment method
    // UPI: Instant success (simulated)
    // NEFT: Pending verification (bank transfer takes time)
    if (body.paymentMethod === 'UPI') {
      // Simulate instant UPI verification
      return NextResponse.json({
        status: 'success',
        transactionId,
        message: 'Payment verified successfully',
      });
    } else {
      // NEFT/Bank transfer - mark as pending
      return NextResponse.json({
        status: 'pending',
        transactionId,
        message: 'Bank transfer is being verified. This usually takes 1-2 business days.',
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
