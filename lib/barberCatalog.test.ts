import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildAgendarUrl,
  CAMPINA_GRANDE_SCHEDULE,
  CHATBOT_PWA_BASE_URL,
  EXECUTIVE_BARBERS,
  filterGalleryItems,
  GALLERY_ITEMS,
  getHighlightedAndEssentialServices,
  MATHEUS_WHATSAPP_NUMBER,
  MATHEUS_WHATSAPP_URL,
  OFFICIAL_ADDRESS,
  OFFICIAL_LOGO_URL,
  SEED_PUBLIC_SERVICES,
} from './barberCatalog';

test('getHighlightedAndEssentialServices separates Combo JM from essential services', () => {
  const { featuredCombo, essentialServices } =
    getHighlightedAndEssentialServices(SEED_PUBLIC_SERVICES);
  assert.equal(featuredCombo.slug, 'combo-jm');
  assert.equal(featuredCombo.is_featured_combo, true);
  assert.equal(essentialServices.length, SEED_PUBLIC_SERVICES.length - 1);
  assert.ok(essentialServices.every((s) => s.slug !== 'combo-jm'));
});

test('strictly enforces zero yellow or gold colors in generated SVG assets', () => {
  const allUrls = [
    ...SEED_PUBLIC_SERVICES.map((s) => s.image_url),
    ...GALLERY_ITEMS.map((g) => g.image_url),
    ...EXECUTIVE_BARBERS.map((b) => b.image_url),
  ];
  for (const dataUri of allUrls) {
    const decoded = decodeURIComponent(dataUri).toLowerCase();
    assert.equal(decoded.includes('#d4af37'), false, 'Found forbidden gold #d4af37');
    assert.equal(decoded.includes('#f59e0b'), false, 'Found forbidden amber #f59e0b');
    assert.equal(decoded.includes('#fde68a'), false, 'Found forbidden yellow #fde68a');
  }
});

test('filterGalleryItems filters accurately by category', () => {
  const all = filterGalleryItems(GALLERY_ITEMS, 'Todos');
  assert.equal(all.length, GALLERY_ITEMS.length);

  const fadeItems = filterGalleryItems(GALLERY_ITEMS, 'Fade');
  assert.equal(fadeItems.length, 1);
  assert.equal(fadeItems[0].category, 'Fade');
});

test('enforces official logo path, Monte Santo address, hours, WhatsApp, and external Vercel Chatbot URL', () => {
  assert.equal(OFFICIAL_LOGO_URL, '/logo-preta.png');
  assert.equal(CHATBOT_PWA_BASE_URL, 'https://chatbot-jmbarberclub.vercel.app/');
  assert.equal(
    OFFICIAL_ADDRESS,
    'R. Diogo da Costa, 252 - Monte Santo, Campina Grande - PB, 58400-733'
  );
  assert.equal(MATHEUS_WHATSAPP_NUMBER, '(83) 99912-4800');
  assert.ok(MATHEUS_WHATSAPP_URL.startsWith('https://wa.me/5583999124800'));

  assert.equal(CAMPINA_GRANDE_SCHEDULE.length, 3);
  assert.equal(CAMPINA_GRANDE_SCHEDULE[0].hours, '09:00 às 20:00');
  assert.equal(CAMPINA_GRANDE_SCHEDULE[1].hours, '08:30 às 19:00');
  assert.equal(CAMPINA_GRANDE_SCHEDULE[2].hours, 'Fechado');

  const directChatbotUrl = buildAgendarUrl();
  assert.equal(directChatbotUrl, 'https://chatbot-jmbarberclub.vercel.app/');

  const deepLinkUrl = buildAgendarUrl({ service: 'combo-jm', barber: 'matheus' });
  assert.equal(
    deepLinkUrl,
    'https://chatbot-jmbarberclub.vercel.app/?service=combo-jm&barber=matheus'
  );
});
