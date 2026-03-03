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
  title: 'Leandro Tanner',
  description: 'FullStack Developer',
  icons: {
    icon: '/img/logo/_logo-sm.png',
  },
  authors: [{ name: 'Leandro Arantes Tanner' }],    
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
