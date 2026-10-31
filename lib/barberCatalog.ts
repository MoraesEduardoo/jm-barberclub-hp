import { supabase } from './supabase';

export const OFFICIAL_LOGO_URL = '/logo-preta.png';
export const CHATBOT_PWA_BASE_URL = 'https://chat.inbarberapp.com/jmbarberclub';

export const OFFICIAL_ADDRESS =
  'R. Diogo da Costa, 252 - Monte Santo, Campina Grande - PB, 58400-733';
export const OFFICIAL_GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/JM+Barberclub/@-7.2119184,-35.9003798,17z/data=!4m14!1m7!3m6!1s0x7ac1fccc3c55f51:0x8626bf0f934d1954!2sR.+Diogo+da+Costa,+252+-+Monte+Santo,+Campina+Grande+-+PB,+58400-733!3b1!8m2!3d-7.2119184!4d-35.9003798!3m5!1s0x7ac1f001746841f:0xee46df8375c7ba18!8m2!3d-7.2124517!4d-35.9006183!16s%2Fg%2F11nv04mbwt?entry=ttu';

export const MATHEUS_WHATSAPP_NUMBER = '(83) 99664-6306';
export const MATHEUS_WHATSAPP_URL =
  'https://wa.me/5583996646306?text=Ol%C3%A1%20Matheus%2C%20vim%20pelo%20site%20do%20JM%20Barberclub%20e%20gostaria%20de%20falar%20com%20a%20ger%C3%AAncia.';

export interface PublicTrustMetrics {
  clientsCount: number;
  clientsDisplay: string;
  googleRating: string;
  punctualityDisplay: string;
  specialistsCount: number;
}

export interface PublicServiceRecord {
  id: string;
  name: string;
  description: string | null;
  duration_minutes: number;
  price: number;
  price_cents: number;
  price_formatted: string;
  category: string;
  image_url: string;
  display_order: number;
}

export interface ExecutiveBarber {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image_url: string;
}

export interface ScheduleDay {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface BarberProduct {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  price_formatted: string;
  stock_quantity: number;
  image_url: string;
  display_order: number;
}

export interface ProductCartItem {
  product: BarberProduct;
  quantity: number;
}


/**
 * Generates clean, minimalist OLED SVG fallback illustrations strictly using the official
 * JM BarberClub palette: OLED Black (#000000), Ice White (#F4F4F5), Vibrant Red (#DC2626),
 * and Deep Blue (#1D4ED8). Zero yellow or gold tones.
 */
export function createMinimalistBarberSvg(
  title: string,
  subtitle: string,
  primaryHex: '#DC2626' | '#1D4ED8',
  motif: 'combo' | 'fade' | 'beard' | 'social' | 'barber-m' | 'barber-w'
): string {
  const secondaryHex = primaryHex === '#DC2626' ? '#1D4ED8' : '#DC2626';

  const motifPaths =
    motif === 'combo'
      ? `
        <circle cx="300" cy="185" r="74" fill="#050507" stroke="${primaryHex}" stroke-width="2" />
        <circle cx="300" cy="185" r="86" fill="none" stroke="${secondaryHex}" stroke-width="1.2" stroke-opacity="0.55" />
        <path d="M266 155 L334 215 M334 155 L266 215" stroke="#FFFFFF" stroke-width="2.8" stroke-linecap="round" />
        <circle cx="260" cy="221" r="11" fill="none" stroke="${primaryHex}" stroke-width="2.2" />
        <circle cx="340" cy="221" r="11" fill="none" stroke="${primaryHex}" stroke-width="2.2" />
      `
      : motif === 'fade'
      ? `
        <rect x="232" y="118" width="136" height="134" rx="20" fill="#050507" stroke="${primaryHex}" stroke-width="1.8" />
        <path d="M256 218 C256 156, 344 156, 344 218" fill="none" stroke="#FFFFFF" stroke-width="2.5" />
        <line x1="248" y1="154" x2="352" y2="154" stroke="${secondaryHex}" stroke-width="1.5" stroke-dasharray="4 4" />
        <line x1="244" y1="178" x2="356" y2="178" stroke="${primaryHex}" stroke-width="1.5" stroke-dasharray="3 3" />
      `
      : motif === 'beard'
      ? `
        <polygon points="300,112 366,150 366,220 300,258 234,220 234,150" fill="#050507" stroke="${primaryHex}" stroke-width="1.8" />
        <path d="M260 174 Q300 234 340 174" fill="none" stroke="#FFFFFF" stroke-width="2.8" />
        <path d="M274 160 Q300 175 326 160" fill="none" stroke="${secondaryHex}" stroke-width="2.2" />
      `
      : motif === 'social'
      ? `
        <rect x="228" y="120" width="144" height="130" rx="18" fill="#050507" stroke="${primaryHex}" stroke-width="1.8" />
        <path d="M256 212 L278 150 L300 190 L322 150 L344 212" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round" />
        <line x1="256" y1="226" x2="344" y2="226" stroke="${secondaryHex}" stroke-width="2" />
      `
      : motif === 'barber-m'
      ? `
        <circle cx="300" cy="182" r="70" fill="#050507" stroke="${primaryHex}" stroke-width="2.2" />
        <circle cx="300" cy="182" r="82" fill="none" stroke="${secondaryHex}" stroke-width="1.2" stroke-opacity="0.6" />
        <text x="300" y="198" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="700" font-size="44">M</text>
      `
      : `
        <circle cx="300" cy="182" r="70" fill="#050507" stroke="${primaryHex}" stroke-width="2.2" />
        <circle cx="300" cy="182" r="82" fill="none" stroke="${secondaryHex}" stroke-width="1.2" stroke-opacity="0.6" />
        <text x="300" y="198" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="700" font-size="44">W</text>
      `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
    <defs>
      <radialGradient id="bgGlow" cx="50%" cy="42%" r="62%">
        <stop offset="0%" stop-color="${primaryHex}" stop-opacity="0.24"/>
        <stop offset="55%" stop-color="${secondaryHex}" stop-opacity="0.10"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="barAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#DC2626"/>
        <stop offset="50%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#1D4ED8"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="#000000"/>
    <rect width="600" height="400" fill="url(#bgGlow)"/>
    <rect x="24" y="24" width="552" height="352" rx="20" fill="none" stroke="#18181B" stroke-width="1.5"/>
    <rect x="24" y="24" width="552" height="3" fill="url(#barAccent)" opacity="0.9"/>
    <text x="48" y="58" fill="#A1A1AA" font-family="monospace" font-size="11" letter-spacing="2">JM BARBERCLUB · MONTE SANTO</text>
    ${motifPaths}
    <text x="48" y="334" fill="#FFFFFF" font-family="sans-serif" font-weight="700" font-size="20">${title}</text>
    <text x="48" y="356" fill="#E4E4E7" font-family="monospace" font-size="12" opacity="0.8">${subtitle}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const CAMPINA_GRANDE_SCHEDULE: ScheduleDay[] = [
  { day: 'Terça a Sábado', hours: '09:00 às 19:00', isOpen: true },
  { day: 'Domingo', hours: '09:00 às 12:30', isOpen: true },
  { day: 'Segunda-feira (William)', hours: '14:30 às 19:00', isOpen: true },
];

export const DEFAULT_TRUST_METRICS: PublicTrustMetrics = {
  clientsCount: 0,
  clientsDisplay: '0',
  googleRating: '4.9 ★',
  punctualityDisplay: '100%',
  specialistsCount: 2,
};

/**
 * Pure helper to calculate real client count from `public.clients` records or count metadata.
 */
export function computeClientsCount(
  rows: Array<Record<string, unknown>> | null | undefined,
  exactCount?: number | null
): number {
  if (typeof exactCount === 'number' && exactCount >= 0) {
    return exactCount;
  }
  if (Array.isArray(rows)) {
    return rows.length;
  }
  return 0;
}

/**
 * Queries real-time metrics directly from `public.clients` and `public.barbers` in Supabase.
 */
export async function fetchTrustMetrics(): Promise<PublicTrustMetrics> {
  try {
    const [clientsRes, barbersRes] = await Promise.all([
      supabase.from('clients').select('id', { count: 'exact' }),
      supabase.from('barbers').select('id, is_active, active'),
    ]);

    const clientsCount = computeClientsCount(
      clientsRes.data as Array<Record<string, unknown>> | null,
      clientsRes.count
    );

    const activeBarbers = Array.isArray(barbersRes.data)
      ? barbersRes.data.filter(
          (b: Record<string, unknown>) => b.is_active !== false && b.active !== false
        )
      : [];
    const specialistsCount = activeBarbers.length > 0 ? activeBarbers.length : 2;

    return {
      clientsCount,
      clientsDisplay: clientsCount.toLocaleString('pt-BR'),
      googleRating: '4.9 ★',
      punctualityDisplay: '100%',
      specialistsCount,
    };
  } catch {
    return DEFAULT_TRUST_METRICS;
  }
}

export function formatPriceBRL(
  rawPrice: unknown,
  rawPriceInCents?: unknown
): {
  price: number;
  cents: number;
  formatted: string;
} {
  if (typeof rawPrice === 'number' && rawPrice > 0) {
    const reais = rawPrice;
    return {
      price: reais,
      cents: Math.round(reais * 100),
      formatted: `R$ ${reais % 1 === 0 ? reais.toFixed(0) : reais.toFixed(2).replace('.', ',')}`,
    };
  }
  if (typeof rawPriceInCents === 'number' && rawPriceInCents > 0) {
    const reais = rawPriceInCents / 100;
    return {
      price: reais,
      cents: rawPriceInCents,
      formatted: `R$ ${reais % 1 === 0 ? reais.toFixed(0) : reais.toFixed(2).replace('.', ',')}`,
    };
  }
  if (typeof rawPrice === 'string' && rawPrice.trim()) {
    const parsed = Number(rawPrice.replace(/[^0-9.,]/g, '').replace(',', '.'));
    if (!Number.isNaN(parsed) && parsed > 0) {
      return {
        price: parsed,
        cents: Math.round(parsed * 100),
        formatted: `R$ ${parsed % 1 === 0 ? parsed.toFixed(0) : parsed.toFixed(2).replace('.', ',')}`,
      };
    }
  }
  return { price: 0, cents: 0, formatted: 'R$ 0' };
}

function formatCategoryLabel(rawCategory: unknown, name: string): string {
  const cat = String(rawCategory || '').toLowerCase();
  const lowerName = name.toLowerCase();
  if (cat === 'combo' || lowerName.includes('combo') || lowerName.includes('+')) {
    return 'Combo';
  }
  if (cat === 'barba' || lowerName.includes('barba') || lowerName.includes('barboterapia')) {
    return 'Barba';
  }
  return 'Cabelo';
}

/**
 * Fetches the 100% dynamic service catalog directly from `public.services` in Supabase.
 */
export async function fetchPublicServices(): Promise<PublicServiceRecord[]> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('display_order', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data
        .filter((row: Record<string, unknown>) => row.is_active !== false && row.active !== false)
        .map((row: Record<string, unknown>, idx: number) => {
          const id = String(row.id);
          const name = String(row.name || '').trim();
          const description =
            typeof row.description === 'string' && row.description.trim().length > 0
              ? row.description.trim()
              : null;
          const duration = Number(
            row.duration_minutes ?? row.default_duration_minutes ?? 30
          );
          const { price, cents, formatted } = formatPriceBRL(
            row.price,
            row.price_in_cents ?? row.price_cents
          );
          const category = formatCategoryLabel(row.category, name);
          const imageUrl = String(
            row.image_url ||
              row.storage_url ||
              createMinimalistBarberSvg(
                name.toUpperCase().slice(0, 22),
                `${duration} MIN · ${formatted}`,
                idx % 2 === 0 ? '#DC2626' : '#1D4ED8',
                category === 'Combo' ? 'combo' : category === 'Barba' ? 'beard' : 'fade'
              )
          );

          return {
            id,
            name,
            description,
            duration_minutes: duration,
            price,
            price_cents: cents,
            price_formatted: formatted,
            category,
            image_url: imageUrl,
            display_order: Number(row.display_order ?? idx),
          };
        });
    }
  } catch {
    // Handled gracefully
  }

  return [];
}

/**
 * Fetches the 100% dynamic team of barbers directly from `public.barbers` in Supabase,
 * enriched with their active specialties from `public.barber_services` and `public.services`.
 */
export async function fetchPublicBarbers(): Promise<ExecutiveBarber[]> {
  try {
    const [barbersRes, linksRes, servicesRes] = await Promise.all([
      supabase.from('barbers').select('*').order('display_order', { ascending: true }),
      supabase.from('barber_services').select('barber_id, service_id, is_active'),
      supabase
        .from('services')
        .select('id, name, barber_id, display_order, is_active')
        .order('display_order', { ascending: true }),
    ]);

    const barberRows =
      !barbersRes.error && Array.isArray(barbersRes.data)
        ? barbersRes.data.filter(
            (row: Record<string, unknown>) => row.is_active !== false && row.active !== false
          )
        : [];

    const serviceRows = Array.isArray(servicesRes.data)
      ? (servicesRes.data as Array<Record<string, unknown>>)
      : [];
    const linkRows = Array.isArray(linksRes.data)
      ? (linksRes.data as Array<Record<string, unknown>>)
      : [];

    if (barberRows.length > 0) {
      return barberRows.map((row: Record<string, unknown>, idx: number) => {
        const barberId = String(row.id);
        const name = String(row.name || '').trim();
        const rawRole = String(row.role || '').toLowerCase();
        const role =
          rawRole === 'admin'
            ? 'Barbeiro Especialista · Gestão'
            : 'Barbeiro Especialista';

        const explicitSpecialty =
          row.specialty || row.especialidade || row.specialties;

        let specialtyText = '';
        if (typeof explicitSpecialty === 'string' && explicitSpecialty.trim()) {
          specialtyText = explicitSpecialty.trim();
        } else {
          const activeServiceIds = new Set(
            linkRows
              .filter(
                (l) =>
                  String(l.barber_id) === barberId && l.is_active !== false
              )
              .map((l) => String(l.service_id))
          );

          const barberServiceNames = serviceRows
            .filter(
              (s) =>
                s.is_active !== false &&
                (activeServiceIds.has(String(s.id)) ||
                  String(s.barber_id || '') === barberId)
            )
            .map((s) => String(s.name))
            .slice(0, 5);

          specialtyText =
            barberServiceNames.length > 0
              ? `Especialista em ${barberServiceNames.join(', ')}`
              : 'Cortes de Precisão, Degradê & Barboterapia';
        }

        const imageUrl = String(
          row.avatar_url ||
            row.image_url ||
            row.photo_url ||
            createMinimalistBarberSvg(
              name.toUpperCase(),
              `CADEIRA 0${idx + 1} · ESPECIALISTA`,
              idx % 2 === 0 ? '#DC2626' : '#1D4ED8',
              idx % 2 === 0 ? 'barber-m' : 'barber-w'
            )
        );

        return {
          id: barberId,
          name,
          role,
          specialty: specialtyText,
          image_url: imageUrl,
        };
      });
    }
  } catch {
    // Handled gracefully
  }

  return [];
}

/**
 * Generates direct external URLs to the official JM Barberclub booking portal
 * passing the service ID or barber ID.
 */
export function buildAgendarUrl(params?: {
  service?: string;
  barber?: string;
}): string {
  const baseUrl = CHATBOT_PWA_BASE_URL;
  if (!params) return baseUrl;

  const searchParams = new URLSearchParams();
  if (params.service) searchParams.set('service', params.service);
  if (params.barber) searchParams.set('barber', params.barber);
  const query = searchParams.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}

/**
 * Generates studio-style OLED product packaging illustrations strictly using the
 * official JM Barberclub palette: OLED Black (#000000), Ice White (#F4F4F5),
 * Vibrant Brand Red (#DC2626), and Deep Blue (#1D4ED8). Zero yellow or gold tones.
 */
export function createMinimalistProductSvg(
  productName: string,
  badgeText: string,
  primaryHex: '#DC2626' | '#1D4ED8',
  containerType: 'jar' | 'dropper' | 'pump' | 'shampoo'
): string {
  const secondaryHex = primaryHex === '#DC2626' ? '#1D4ED8' : '#DC2626';
  const safeName = productName.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeBadge = badgeText.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const containerArtwork =
    containerType === 'jar'
      ? `
        <!-- Matte Pomade Jar -->
        <ellipse cx="300" cy="252" rx="88" ry="12" fill="${primaryHex}" opacity="0.22" />
        <rect x="216" y="130" width="168" height="28" rx="8" fill="#18181B" stroke="#3F3F46" stroke-width="1.5" />
        <line x1="232" y1="138" x2="368" y2="138" stroke="${primaryHex}" stroke-width="2" />
        <rect x="208" y="156" width="184" height="92" rx="16" fill="#09090B" stroke="${primaryHex}" stroke-width="2" />
        <rect x="224" y="174" width="152" height="56" rx="8" fill="#000000" stroke="#27272A" stroke-width="1.2" />
        <text x="300" y="198" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="800" font-size="14" letter-spacing="2">JM BARBERCLUB</text>
        <text x="300" y="216" text-anchor="middle" fill="${secondaryHex}" font-family="monospace" font-weight="700" font-size="11" letter-spacing="1.5">MATTE POMADE · 120G</text>
      `
      : containerType === 'dropper'
      ? `
        <!-- Beard Oil Dropper Bottle -->
        <ellipse cx="300" cy="264" rx="64" ry="10" fill="${primaryHex}" opacity="0.22" />
        <rect x="288" y="88" width="24" height="26" rx="10" fill="#18181B" stroke="${primaryHex}" stroke-width="1.5" />
        <rect x="280" y="112" width="40" height="16" rx="4" fill="#27272A" stroke="#3F3F46" stroke-width="1.2" />
        <path d="M262 152 C262 134, 280 128, 280 128 L320 128 C320 128, 338 134, 338 152 L338 250 C338 258, 332 262, 324 262 L276 262 C268 262, 262 258, 262 250 Z" fill="#09090B" stroke="${primaryHex}" stroke-width="2" />
        <rect x="270" y="164" width="60" height="74" rx="6" fill="#000000" stroke="#27272A" stroke-width="1.2" />
        <text x="300" y="194" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="800" font-size="12" letter-spacing="1.5">JM CLUB</text>
        <text x="300" y="212" text-anchor="middle" fill="${secondaryHex}" font-family="monospace" font-weight="700" font-size="10">BEARD OIL</text>
        <text x="300" y="228" text-anchor="middle" fill="#A1A1AA" font-family="monospace" font-size="9">30 ML</text>
      `
      : containerType === 'pump'
      ? `
        <!-- Beard Balm Pump Bottle -->
        <ellipse cx="300" cy="264" rx="68" ry="10" fill="${primaryHex}" opacity="0.22" />
        <path d="M292 92 L326 92 L334 100 L308 100 L308 116 L292 116 Z" fill="#27272A" stroke="${primaryHex}" stroke-width="1.4" />
        <rect x="282" y="114" width="36" height="16" rx="4" fill="#18181B" stroke="#3F3F46" stroke-width="1.2" />
        <rect x="254" y="130" width="92" height="132" rx="14" fill="#09090B" stroke="${primaryHex}" stroke-width="2" />
        <rect x="264" y="152" width="72" height="86" rx="8" fill="#000000" stroke="#27272A" stroke-width="1.2" />
        <text x="300" y="186" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="800" font-size="12" letter-spacing="1.5">JM CLUB</text>
        <text x="300" y="204" text-anchor="middle" fill="${secondaryHex}" font-family="monospace" font-weight="700" font-size="10">BALM PÓS</text>
        <text x="300" y="222" text-anchor="middle" fill="#A1A1AA" font-family="monospace" font-size="9">150 ML</text>
      `
      : `
        <!-- Menthol Grooming Shampoo Bottle -->
        <ellipse cx="300" cy="264" rx="72" ry="10" fill="${primaryHex}" opacity="0.22" />
        <rect x="280" y="96" width="40" height="22" rx="5" fill="#18181B" stroke="${primaryHex}" stroke-width="1.6" />
        <path d="M250 144 C250 124, 280 118, 280 118 L320 118 C320 118, 350 124, 350 144 L344 252 C344 259, 338 262, 330 262 L270 262 C262 262, 256 259, 256 252 Z" fill="#09090B" stroke="${primaryHex}" stroke-width="2" />
        <rect x="264" y="154" width="72" height="86" rx="8" fill="#000000" stroke="#27272A" stroke-width="1.2" />
        <text x="300" y="186" text-anchor="middle" fill="#FFFFFF" font-family="sans-serif" font-weight="800" font-size="12" letter-spacing="1.5">JM CLUB</text>
        <text x="300" y="204" text-anchor="middle" fill="${secondaryHex}" font-family="monospace" font-weight="700" font-size="10">SHAMPOO</text>
        <text x="300" y="222" text-anchor="middle" fill="#A1A1AA" font-family="monospace" font-size="9">200 ML</text>
      `;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400" width="600" height="400">
    <defs>
      <radialGradient id="prodGlow" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="${primaryHex}" stop-opacity="0.28"/>
        <stop offset="55%" stop-color="${secondaryHex}" stop-opacity="0.12"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
      </radialGradient>
      <linearGradient id="prodAccent" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#DC2626"/>
        <stop offset="50%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#1D4ED8"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="#000000"/>
    <rect width="600" height="400" fill="url(#prodGlow)"/>
    <rect x="24" y="24" width="552" height="352" rx="20" fill="none" stroke="#18181B" stroke-width="1.5"/>
    <rect x="24" y="24" width="552" height="3" fill="url(#prodAccent)" opacity="0.9"/>
    <text x="48" y="58" fill="#A1A1AA" font-family="monospace" font-size="11" letter-spacing="2">JM BARBERCLUB · LINHA OFICIAL</text>
    ${containerArtwork}
    <text x="48" y="334" fill="#FFFFFF" font-family="sans-serif" font-weight="700" font-size="20">${safeName}</text>
    <text x="48" y="356" fill="#E4E4E7" font-family="monospace" font-size="12" opacity="0.8">${safeBadge}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function formatCurrencyBRL(amount: number): string {
  return `R$ ${amount.toFixed(2).replace('.', ',')}`;
}

function formatProductCategory(rawCategory: unknown, name: string): string {
  const cat = String(rawCategory || '').trim();
  if (cat.length > 0) return cat;
  const lower = name.toLowerCase();
  if (lower.includes('óleo') || lower.includes('oleo') || lower.includes('barba')) {
    return 'Barba';
  }
  if (lower.includes('shampoo')) {
    return 'Limpeza';
  }
  if (
    lower.includes('pomada') ||
    lower.includes('gel') ||
    lower.includes('leave')
  ) {
    return 'Finalização';
  }
  return 'Cuidados';
}

/**
 * Fetches all active products (`is_active = true`) dynamically from `public.products`
 * in Supabase, ordered by `display_order` ascending.
 */
export async function fetchPublicProducts(): Promise<BarberProduct[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      return data
        .filter(
          (row: Record<string, unknown>) =>
            row.is_active !== false && row.active !== false
        )
        .map((row: Record<string, unknown>, idx: number) => {
          const id = String(row.id);
          const name = String(row.name || '').trim();
          const description =
            typeof row.description === 'string' &&
            row.description.trim().length > 0
              ? row.description.trim()
              : null;
          const { price } = formatPriceBRL(
            row.price,
            row.price_in_cents ?? row.price_cents
          );
          const priceFormatted = formatCurrencyBRL(price);
          const stockQuantity = Math.max(
            0,
            Number(row.stock_quantity ?? row.stock ?? 0)
          );
          const category = formatProductCategory(row.category, name);
          const imageUrl = String(
            row.image_url ||
              row.storage_url ||
              createMinimalistProductSvg(
                name.toUpperCase().slice(0, 22),
                `ESTOQUE: ${stockQuantity} · ${priceFormatted}`,
                idx % 2 === 0 ? '#DC2626' : '#1D4ED8',
                idx % 4 === 0
                  ? 'jar'
                  : idx % 4 === 1
                  ? 'dropper'
                  : idx % 4 === 2
                  ? 'pump'
                  : 'shampoo'
              )
          );

          return {
            id,
            name,
            category,
            description,
            price,
            price_formatted: priceFormatted,
            stock_quantity: stockQuantity,
            image_url: imageUrl,
            display_order: Number(row.display_order ?? idx),
          };
        });
    }
  } catch {
    // Handled gracefully
  }

  return [];
}

export function computeCartSummary(items: ProductCartItem[]): {
  totalItems: number;
  totalPrice: number;
  totalFormatted: string;
} {
  const validItems = Array.isArray(items)
    ? items.filter((item) => item && item.quantity > 0 && item.product)
    : [];

  const totalItems = validItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = validItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return {
    totalItems,
    totalPrice,
    totalFormatted: formatCurrencyBRL(totalPrice),
  };
}

/**
 * Generates the official WhatsApp checkout link directed to Matheus (5583996646306)
 * with a clean, structured summary of the chosen products, quantities, and total value.
 */
export function buildProductOrderWhatsAppUrl(items: ProductCartItem[]): string {
  const { totalItems, totalFormatted } = computeCartSummary(items);
  const phone = '5583996646306';

  if (totalItems === 0) {
    const fallbackMessage =
      'Olá Matheus! Vim pelo site do JM Barberclub e gostaria de consultar o catálogo de produtos.';
    return `https://wa.me/${phone}?text=${encodeURIComponent(fallbackMessage)}`;
  }

  const lines = items
    .filter((item) => item.quantity > 0)
    .map((item) => {
      const subtotal = formatCurrencyBRL(item.product.price * item.quantity);
      return `• ${item.quantity}x ${item.product.name} (${subtotal})`;
    });

  const message = [
    'Olá Matheus! Gostaria de finalizar meu pedido de produtos no *JM Barberclub*:',
    '',
    ...lines,
    '',
    `*Valor Total:* ${totalFormatted}`,
  ].join('\n');

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}


