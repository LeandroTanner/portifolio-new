import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/themes/theme-provider';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Outfit } from 'next/font/google';
import '@/app/globals.css';
import NavBar from '@/components/nav/nav-bar';
import { Metadata } from 'next';
import Footer from '@/components/footer/footer';

const fontSans = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'], 
});

export const metadata: Metadata = {
  title: {
    template: '%s | Leandro Tanner',
    default: 'Leandro Tanner | Desenvolvedor Full Stack',
  },
  description: 'Desenvolvedor Full Stack em Hortolândia, especializado em C#, .NET, SQL Server e ecossistema React/Next.js. Confira meu portfólio.',
  
  keywords: [
    'Leandro Tanner', 
    'Desenvolvedor Full Stack', 
    'Desenvolvedor Junior',
    'C#', 
    '.NET', 
    'SQL Server', 
    'Next.js', 
    'Hortolândia',
    'React',
    'Portfólio de Desenvolvedor',
    'Desenvolvimento Web',
    'Desenvolvimento de Software',
    'Desenvolvedor FullStack Hortolândia',
    'Java',
    'JavaScript',
    'TypeScript',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Docker',
    'Spring Boot',
  ],
  authors: [{ name: 'Leandro Arantes Tanner', url: 'https://ltanner.dev' }],
  
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://ltanner.dev',
    title: 'Leandro Tanner | Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em C#, .NET e Next.js. Veja meus projetos e experiência.',
    siteName: 'Portfólio de Leandro Tanner',
    images: [
      {
        url: '/opengraph-image.png', 
        width: 1200,
        height: 630,
        alt: 'Portfólio Leandro Tanner',
      },
    ],
  },

  // Para exibir o card grande em redes sociais
  twitter: {
    card: 'summary_large_image',
    title: 'Leandro Tanner | Desenvolvedor Full Stack',
    description: 'Desenvolvedor Full Stack especializado em C#, .NET e Next.js. Veja meus projetos e experiência.',
    images: ['/opengraph-image.png'], 
  },
  
  icons: {
    icon: '/img/logo/_logo-sm.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover' as const,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <NavBar />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
