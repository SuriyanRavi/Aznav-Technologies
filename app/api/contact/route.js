import { cookies } from 'next/headers';
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';
import { rateLimit } from '../../../utils/rateLimiter';
import { verifyCsrfToken } from '../../../utils/security';

// Input Validation Schema (rejects script-like names or excessively long strings)
const ContactSchema = z.object({
  name: z.string().min(2).max(100).regex(/^[a-zA-Z\s'-]+$/),
  email: z.string().email().max(254),
  company: z.string().max(100).optional().or(z.literal('')),
  service: z.string().max(100).optional().or(z.literal('')),
  message: z.string().min(10).max(2000),
  form_start_time: z.string().or(z.number()),
  _csrf: z.string(),
  website: z.string().optional().or(z.literal('')),
});

export async function POST(req) {
  // 1. IP extraction & sliding-window rate limiting (max 5 requests per 15 minutes)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 
             req.headers.get('x-real-ip') || 
             '127.0.0.1';

  const limitResult = rateLimit(ip, 5, 15 * 60 * 1000);
  if (!limitResult.success) {
    return new Response(
      JSON.stringify({ error: 'Too many requests, please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(limitResult.retryAfter),
        },
      }
    );
  }

  try {
    const body = await req.json();

    // 2. Honeypot check (Silent reject to bots)
    if (body.website && body.website.length > 0) {
      return Response.json({ success: true, message: 'Message sent successfully.' });
    }

    // 3. Time-check (reject submissions made in under 3 seconds)
    const formStartTime = parseInt(body.form_start_time, 10);
    const elapsed = Date.now() - formStartTime;
    if (isNaN(formStartTime) || elapsed < 3000) {
      return Response.json({ success: true, message: 'Message sent successfully.' });
    }

    // 4. CSRF Token verification against secure httpOnly cookie
    const cookieStore = await cookies();
    const secret = cookieStore.get('csrf_secret')?.value;
    if (!secret || !body._csrf || !verifyCsrfToken(secret, body._csrf)) {
      return new Response(
        JSON.stringify({ error: 'Invalid CSRF token.' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 5. Schema Validation (Zod) - hides details from client
    const parsed = ContactSchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Invalid input.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 6. Input Sanitization (DOMPurify) to prevent XSS
    const sanitizedData = {
      name: DOMPurify.sanitize(parsed.data.name),
      email: DOMPurify.sanitize(parsed.data.email),
      company: DOMPurify.sanitize(parsed.data.company || ''),
      service: DOMPurify.sanitize(parsed.data.service || ''),
      message: DOMPurify.sanitize(parsed.data.message),
    };

    // Business action (e.g. database save or sending mail) would happen here with sanitizedData.
    // For this static site, we return a successful response.
    return Response.json({
      success: true,
      message: 'Message sent successfully.',
    });

  } catch (err) {
    // 7. Generic production error to prevent leaking stack traces or internals
    return new Response(
      JSON.stringify({ error: 'Something went wrong.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
