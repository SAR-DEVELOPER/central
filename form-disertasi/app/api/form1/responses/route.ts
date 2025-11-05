import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Use backend service name for internal Docker network communication
        const backendUrl = process.env.BACKEND_URL || 'http://backend:4000';
        const apiUrl = `${backendUrl}/api/form1/responses`;

        console.log('🔄 Fetching responses from backend:', apiUrl);

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store', // Always fetch fresh data
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch responses' }));
            return NextResponse.json(
                { success: false, message: errorData.message || 'Failed to fetch responses' },
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

