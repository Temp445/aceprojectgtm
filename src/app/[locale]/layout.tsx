
import { Geist, Geist_Mono, Urbanist } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import 'swiper/css';
import GTM from '@/components/analytics/GTM';
import { GTMTracker } from '@/components/analytics/GTMTracker';
import { GTM_ID } from '@/lib/gtm';

const domainUrl = process.env.NEXT_PUBLIC_API_FRONTEND_URL || 'https://acesoft.in';
const canonicalUrl = 'https://acesoft.in/products/ace-project-management-software'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {  
  title:'ACE Project – Smart Project Management Software & Tools',
  description: 'Manage projects smarter with ACE Project. Gantt charts, team reports, and real-time tracking to boost productivity and deliver results on time.',
  keywords :"project management software, online project management tools, smart project management, Gantt chart project management, project tracking software, project reporting software, real-time project tracking, team performance reports, task management software, project analytics tools, deadline calendar tool, resource management software, ACE Project, ACE Project software, ACE Project management tool, best project management software for teams, project management software with Gantt chart, software for project progress tracking, project reporting and analytics tool, how to track project deadlines and resources",
   alternates: {
    canonical: canonicalUrl,
  },
  robots: 'noindex,follow',
  openGraph: {
    title: 'ACE Project – Smart Project Management Software & Tools',
    description: 'Manage projects smarter with ACE Project. Gantt charts, team reports, and real-time tracking to boost productivity and deliver results on time.',
    url: `${domainUrl}`,
    siteName: 'ACE Project',
    images: [
      {
        url: `${domainUrl}/og-images/AceLogo.png`,
        width: 1200,
        height: 630,
        alt: 'ACE Project',
      },
    ],
    type: 'website',
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Ensure Google Tag Manager ID is set
  if (!GTM_ID) {
    console.error(
      "❌ Missing Google Tag Manager ID. Please set NEXT_PUBLIC_GTM_ID in .env."
    );
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/AceLogo.png" />
        <GTM />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} antialiased`}
      >
        {/* Google Tag Manager Fallback Script */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Google Tag Manager Tracker */}
        <GTMTracker />

        {/* LinkedIn Tracker */}
        {/* <LinkedInTracker partnerId={linkedInPartnerId} /> */}

        <NextIntlClientProvider> {children} </NextIntlClientProvider>
      </body>
    </html>

  );
}
