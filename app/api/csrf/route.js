import { cookies } from 'next/headers';
import { generateCsrfToken, generateRandomSecret } from '../../../utils/security';

export async function GET() {
  const cookieStore = await cookies();
  let secret = cookieStore.get('csrf_secret')?.value;

  if (!secret) {
    secret = generateRandomSecret(32);
    cookieStore.set('csrf_secret', secret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 3600, // 1 hour validity
    });
  }

  const csrfToken = generateCsrfToken(secret);
  return Response.json({ csrfToken });
}
