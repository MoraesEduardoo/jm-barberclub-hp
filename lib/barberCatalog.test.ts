import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildAgendarUrl,
  buildProductOrderWhatsAppUrl,
  CAMPINA_GRANDE_SCHEDULE,
  CHATBOT_PWA_BASE_URL,
  computeCartSummary,
  computeClientsCount,
  createMinimalistBarberSvg,
  createMinimalistProductSvg,
  fetchPublicBarbers,
  fetchPublicProducts,
  fetchPublicServices,
  fetchTrustMetrics,
  formatPriceBRL,
  MATHEUS_WHATSAPP_NUMBER,
  MATHEUS_WHATSAPP_URL,
  OFFICIAL_ADDRESS,
  OFFICIAL_GOOGLE_MAPS_URL,
  OFFICIAL_LOGO_URL,
} from './barberCatalog';

test('computeClientsCount calculates client count from public.clients accurately', () => {
  assert.equal(computeClientsCount([], 0), 0);
  assert.equal(computeClientsCount([{ id: '1' }, { id: '2' }], 11), 11);
  assert.equal(computeClientsCount([{ id: '1' }, { id: '2' }, { id: '3' }], null), 3);
});

test('strictly enforces zero yellow or gold colors in generated SVG assets', () => {
  const svgA = createMinimalistBarberSvg('CORTE', '30 MIN', '#DC2626', 'fade');
  const svgB = createMinimalistBarberSvg('BARBA', '30 MIN', '#1D4ED8', 'beard');
  const svgC = createMinimalistProductSvg('PRODUTO', 'ESTOQUE: 5', '#DC2626', 'jar');
  for (const dataUri of [svgA, svgB, svgC]) {
    const decoded = decodeURIComponent(dataUri).toLowerCase();
    assert.equal(decoded.includes('#d4af37'), false, 'Found forbidden gold #d4af37');
    assert.equal(decoded.includes('#f59e0b'), false, 'Found forbidden amber #f59e0b');
    assert.equal(decoded.includes('#fde68a'), false, 'Found forbidden yellow #fde68a');
  }
});

test('formatPriceBRL formats prices accurately', () => {
  assert.equal(formatPriceBRL(30, 3000).formatted, 'R$ 30');
  assert.equal(formatPriceBRL(45, 4500).formatted, 'R$ 45');
  assert.equal(formatPriceBRL(25, 2500).formatted, 'R$ 25');
});

test('fetches active products from public.products in Supabase and formats WhatsApp cart order accurately', async () => {
  const products = await fetchPublicProducts();
  assert.ok(products.length > 0, 'Expected active products from public.products in Supabase');
  assert.ok(
    products.every(
      (p) =>
        p.id &&
        p.name &&
        p.price > 0 &&
        p.stock_quantity >= 0 &&
        p.image_url.startsWith('http')
    ),
    'All dynamic products must have id, name, price, stock_quantity, and Supabase Storage image_url'
  );

  const cartItems = [
    { product: products[0], quantity: 2 },
    { product: products[1], quantity: 1 },
  ];
  const expectedTotal = products[0].price * 2 + products[1].price;
  const summary = computeCartSummary(cartItems);
  assert.equal(summary.totalItems, 3);
  assert.equal(summary.totalPrice, expectedTotal);

  const waUrl = buildProductOrderWhatsAppUrl(cartItems);
  assert.ok(waUrl.startsWith('https://wa.me/5583996646306?text='));
  const decodedText = decodeURIComponent(waUrl.split('text=')[1]);
  assert.ok(decodedText.includes(`2x ${products[0].name}`));
  assert.ok(decodedText.includes(`1x ${products[1].name}`));
  assert.ok(decodedText.includes(summary.totalFormatted));
});

test('fetches real clients count, services, and barbers dynamically from Supabase and enforces official links/hours', async () => {
  assert.equal(OFFICIAL_LOGO_URL, '/logo-preta.png');
  assert.equal(CHATBOT_PWA_BASE_URL, 'https://chat.inbarberapp.com/jmbarberclub');
  assert.equal(
    OFFICIAL_ADDRESS,
    'R. Diogo da Costa, 252 - Monte Santo, Campina Grande - PB, 58400-733'
  );
  assert.equal(
    OFFICIAL_GOOGLE_MAPS_URL,
    'https://www.google.com/maps/place/JM+Barberclub/@-7.2119184,-35.9003798,17z/data=!4m14!1m7!3m6!1s0x7ac1fccc3c55f51:0x8626bf0f934d1954!2sR.+Diogo+da+Costa,+252+-+Monte+Santo,+Campina+Grande+-+PB,+58400-733!3b1!8m2!3d-7.2119184!4d-35.9003798!3m5!1s0x7ac1f001746841f:0xee46df8375c7ba18!8m2!3d-7.2124517!4d-35.9006183!16s%2Fg%2F11nv04mbwt?entry=ttu'
  );
  assert.equal(MATHEUS_WHATSAPP_NUMBER, '(83) 99664-6306');
  assert.ok(MATHEUS_WHATSAPP_URL.startsWith('https://wa.me/5583996646306'));

  assert.equal(CAMPINA_GRANDE_SCHEDULE.length, 3);
  assert.equal(CAMPINA_GRANDE_SCHEDULE[0].day, 'Terça a Sábado');
  assert.equal(CAMPINA_GRANDE_SCHEDULE[0].hours, '09:00 às 19:00');
  assert.equal(CAMPINA_GRANDE_SCHEDULE[1].day, 'Domingo');
  assert.equal(CAMPINA_GRANDE_SCHEDULE[1].hours, '09:00 às 12:30');
  assert.equal(CAMPINA_GRANDE_SCHEDULE[2].day, 'Segunda-feira (William)');
  assert.equal(CAMPINA_GRANDE_SCHEDULE[2].hours, '14:30 às 19:00');

  const [services, barbers, metrics] = await Promise.all([
    fetchPublicServices(),
    fetchPublicBarbers(),
    fetchTrustMetrics(),
  ]);

  assert.ok(services.length > 0, 'Expected real services from public.services');
  assert.ok(
    services.every((s) => s.id && s.name && s.duration_minutes > 0 && s.image_url.startsWith('http')),
    'All services must have dynamic id, name, duration, and real image_url'
  );

  const serviceDeepLink = buildAgendarUrl({ service: services[0].id });
  assert.equal(
    serviceDeepLink,
    `https://chat.inbarberapp.com/jmbarberclub?service=${services[0].id}`
  );

  assert.ok(barbers.length >= 2, 'Expected barbers from public.barbers');
  assert.ok(barbers.some((b) => b.name === 'Matheus'));
  assert.ok(barbers.some((b) => b.name === 'William'));

  assert.equal(metrics.googleRating, '4.9 ★');
  assert.ok(metrics.clientsCount > 0, 'Expected positive client count from public.clients');
});


