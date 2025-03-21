import { NextResponse } from 'next/server';
import { query } from '@/lib/query';

export async function POST(request: Request, { params }: { params: { orderId: string } }) {
  // Only allow in staging environment
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not allowed in production', { status: 403 });
  }

  const { orderId } = params;

  try {
    // 1. Get the order details
    const order = await query(`/orders/${orderId}`);

    if (!order) {
      return new NextResponse('Order not found', { status: 404 });
    }

    // 2. Create artificial balance changes
    const balanceChange = {
      amount: order.amount,
      currency: order.currency,
      type: 'DEPOSIT',
      status: 'COMPLETED',
      orderId: orderId,
      timestamp: new Date().toISOString(),
    };

    // 3. Update order status and add balance change
    await Promise.all([
      query(`/orders/${orderId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: 'COMPLETED' }),
      }),
      query(`/balance-changes`, {
        method: 'POST',
        body: JSON.stringify(balanceChange),
      }),
    ]);

    return new NextResponse('Order completed successfully', { status: 200 });
  } catch (error: any) {
    console.error('Error completing order:', error);
    return new NextResponse(error.message || 'Internal server error', {
      status: error.status || 500,
    });
  }
}
