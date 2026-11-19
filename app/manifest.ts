export default function manifest() {
  return {
    id: '/',
    name: 'JM Barberclub — Barbearia Premium',
    short_name: 'JM Barber',
    description:
      'Agendamento rápido em 30 segundos, serviços executivos e produtos oficiais do JM Barberclub em Campina Grande, PB.',
    start_url: '/',
    scope: '/',
    display: 'standalone' as const,
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any' as const,
      },
      {
        src: '/pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any' as const,
      },
      {
        src: '/pwa-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable' as const,
      },
    ],
  };
}
