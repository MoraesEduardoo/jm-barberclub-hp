import React from 'react';
import '../src/index.css';

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'JM Barberclub | Barbearia Premium em Campina Grande, PB',
  description:
    'Corte e barba no mais alto padrão sem esperar na fila. Agende em 30 segundos com Matheus ou William no bairro Monte Santo.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent' as const,
    title: 'JM Barber',
  },
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth">
      <body className="bg-black text-white antialiased selection:bg-red-600/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
