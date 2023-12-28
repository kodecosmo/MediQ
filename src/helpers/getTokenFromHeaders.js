import { headers } from 'next/headers';

// Helper function to extract token from request headers
async function getTokenFromHeaders(request) {
    const authHeader = headers(request).get('Authorization');
    return authHeader?.replace('Bearer ', '') || null;
}

export default getTokenFromHeaders;