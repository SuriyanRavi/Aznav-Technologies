import './globals.css';

export const metadata = {
  title: 'Aznav Technologies | Future-Ready Digital Solutions',
  description: 'Aznav Technologies delivers innovative digital solutions — software development, AI, cloud, cybersecurity, and web development — empowering businesses to scale and lead in the digital era.',
  keywords: 'software development, AI solutions, cloud computing, cybersecurity, web development, mobile apps, digital transformation, Bengaluru, IT consulting India, enterprise app development, software agency Bengaluru',
  alternates: {
    canonical: 'https://aznavtechnologies.in',
  },
  openGraph: {
    title: 'Aznav Technologies | Future-Ready Digital Solutions',
    description: 'Empowering businesses through innovation, intelligence, and digital transformation.',
    url: 'https://aznavtechnologies.in',
    siteName: 'Aznav Technologies',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aznav Technologies",
    "url": "https://aznavtechnologies.in",
    "logo": "https://aznavtechnologies.in/favicon.ico",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-96293-04353",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": "en"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "797, 8th Cross Street, AECS Layout, Singasandra",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560068",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://linkedin.com",
      "https://twitter.com",
      "https://github.com"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          suppressHydrationWarning
        />
      </head>
      <body>{children}</body>
    </html>

  );
}
