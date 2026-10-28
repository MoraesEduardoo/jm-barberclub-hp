import React from 'react';
import '../src/index.css';

export const metadata = {
  title: 'JM Barberclub | Barbearia Premium em Campina Grande, PB',
  description:
    'O padrão que define o homem de Campina Grande. Corte executivo, degradê de precisão, barboterapia com toalha quente e Combo JM com os especialistas Matheus e William.',
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
