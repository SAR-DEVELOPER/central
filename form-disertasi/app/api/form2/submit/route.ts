import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Use backend service name for internal Docker network communication
        // The frontend container can access backend via Docker service name
        const backendUrl = process.env.BACKEND_URL || 'http://backend:4000';
        const apiUrl = `${backendUrl}/api/form2/submit`;

        console.log('🔄 Proxying request to backend:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to submit form' }));
            return NextResponse.json(
                { success: false, message: errorData.message || 'Failed to submit form' },
                { status: response.status }
            );
        }

        const result = await response.json();
        return NextResponse.json(result);
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

