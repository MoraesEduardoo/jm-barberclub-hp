import { supabase } from './supabase';

export type GalleryCategory = 'Todos' | 'Fade' | 'Barba' | 'Social' | 'Combos';

export const OFFICIAL_LOGO_URL = '/logo-preta.png';
export const CHATBOT_PWA_BASE_URL = 'https://chatbot-jmbarberclub.vercel.app/';

export const OFFICIAL_ADDRESS =
  'R. Diogo da Costa, 252 - Monte Santo, Campina Grande - PB, 58400-733';
export const MATHEUS_WHATSAPP_NUMBER = '(83) 99912-4800';
export const MATHEUS_WHATSAPP_URL =
  'https://wa.me/5583999124800?text=Ol%C3%A1%20Matheus%2C%20vim%20pelo%20site%20do%20JM%20BarberClub%20e%20gostaria%20de%20falar%20com%20a%20ger%C3%AAncia.';

export interface PublicServiceRecord {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  duration_minutes: number;
  price_cents: number;
  price_formatted: string;
  category: 'Combos' | 'Corte' | 'Barba';
  is_featured_combo: boolean;
  image_url: string;
}

export interface GalleryStyleItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'Todos'>;
  barberName: string;
  serviceSlug: string;
  image_url: string;
}

export interface ExecutiveBarber {
  id: string;
  slug: string;
  name: string;
  role: string;
  specialty: string;
  signatureServiceSlug: string;
  image_url: string;
}

export interface ScheduleDay {
  day: string;
  hours: string;
  isOpen: boolean;
}

/**
 * Generates clean, minimalist OLED SVG illustrations strictly using the official
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

export const SEED_PUBLIC_SERVICES: PublicServiceRecord[] = [
  {
    id: 'srv-combo-jm',
    slug: 'combo-jm',
    name: 'Combo JM (Corte + Barba + Sobrancelha)',
    shortDesc: 'Assinatura completa: corte de precisão, barboterapia na toalha quente e sobrancelha.',
    duration_minutes: 75,
    price_cents: 9500,
    price_formatted: 'R$ 95',
    category: 'Combos',
    is_featured_combo: true,
    image_url: createMinimalistBarberSvg(
      'COMBO JM COMPLETO',
      '75 MIN · CORTE + BARBA + SOBRANCELHA',
      '#DC2626',
      'combo'
    ),
  },
  {
    id: 'srv-corte-fade',
    slug: 'corte-degrade-fade',
    name: 'Corte Degradê (Skin Fade)',
    shortDesc: 'Transição limpa na navalha/shaver com topo texturizado na tesoura.',
    duration_minutes: 45,
    price_cents: 5500,
    price_formatted: 'R$ 55',
    category: 'Corte',
    is_featured_combo: false,
    image_url: createMinimalistBarberSvg(
      'CORTE DEGRADÊ FADE',
      '45 MIN · ACABAMENTO MILIMÉTRICO',
      '#DC2626',
      'fade'
    ),
  },
  {
    id: 'srv-corte-social',
    slug: 'corte-executivo-social',
    name: 'Corte Executivo (Tesoura)',
    shortDesc: 'Estrutura clássica e alinhada para o dia a dia profissional.',
    duration_minutes: 45,
    price_cents: 5000,
    price_formatted: 'R$ 50',
    category: 'Corte',
    is_featured_combo: false,
    image_url: createMinimalistBarberSvg(
      'CORTE EXECUTIVO',
      '45 MIN · ALFAIATARIA CAPILAR',
      '#1D4ED8',
      'social'
    ),
  },
  {
    id: 'srv-barba-real',
    slug: 'barboterapia-toalha-quente',
    name: 'Barba na Toalha Quente',
    shortDesc: 'Alinhamento geométrico na navalha com vaporização térmica e pós-barba.',
    duration_minutes: 35,
    price_cents: 4500,
    price_formatted: 'R$ 45',
    category: 'Barba',
    is_featured_combo: false,
    image_url: createMinimalistBarberSvg(
      'BARBOTERAPIA',
      '35 MIN · TOALHA QUENTE & NAVALHA',
      '#1D4ED8',
      'beard'
    ),
  },
  {
    id: 'srv-combo-corte-barba',
    slug: 'combo-corte-e-barba',
    name: 'Combo Executivo (Corte + Barba)',
    shortDesc: 'Alinhamento integral de cabelo e barba em sessão única pontual.',
    duration_minutes: 65,
    price_cents: 8500,
    price_formatted: 'R$ 85',
    category: 'Combos',
    is_featured_combo: false,
    image_url: createMinimalistBarberSvg(
      'CORTE + BARBA',
      '65 MIN · COMBO EXECUTIVO',
      '#DC2626',
      'combo'
    ),
  },
];

export const GALLERY_ITEMS: GalleryStyleItem[] = [
  {
    id: 'gal-1',
    title: 'Mid Drop Fade Texturizado',
    category: 'Fade',
    barberName: 'Matheus',
    serviceSlug: 'corte-degrade-fade',
    image_url: createMinimalistBarberSvg(
      'MID DROP FADE',
      'POR MATHEUS · FADE',
      '#DC2626',
      'fade'
    ),
  },
  {
    id: 'gal-2',
    title: 'Barba Esculpida na Navalha',
    category: 'Barba',
    barberName: 'William',
    serviceSlug: 'barboterapia-toalha-quente',
    image_url: createMinimalistBarberSvg(
      'BARBA ESCULPIDA',
      'POR WILLIAM · BARBA',
      '#1D4ED8',
      'beard'
    ),
  },
  {
    id: 'gal-3',
    title: 'Executivo Clássico na Tesoura',
    category: 'Social',
    barberName: 'Matheus',
    serviceSlug: 'corte-executivo-social',
    image_url: createMinimalistBarberSvg(
      'EXECUTIVO SOCIAL',
      'POR MATHEUS · SOCIAL',
      '#1D4ED8',
      'social'
    ),
  },
  {
    id: 'gal-4',
    title: 'Assinatura Combo JM Completo',
    category: 'Combos',
    barberName: 'William',
    serviceSlug: 'combo-jm',
    image_url: createMinimalistBarberSvg(
      'ASSINATURA COMBO JM',
      'POR WILLIAM · COMBOS',
      '#DC2626',
      'combo'
    ),
  },
];

export const EXECUTIVE_BARBERS: ExecutiveBarber[] = [
  {
    id: 'barb-matheus',
    slug: 'matheus',
    name: 'Matheus',
    role: 'Barbeiro Executivo & Gestão',
    specialty: 'Skin Fade de Precisão, Visagismo & Combo JM',
    signatureServiceSlug: 'combo-jm',
    image_url: createMinimalistBarberSvg(
      'MATHEUS',
      'CADEIRA 01 · ESPECIALISTA',
      '#DC2626',
      'barber-m'
    ),
  },
  {
    id: 'barb-william',
    slug: 'william',
    name: 'William',
    role: 'Barbeiro Executivo',
    specialty: 'Barboterapia na Toalha Quente, Taper Fade & Cortes Clássicos',
    signatureServiceSlug: 'combo-jm',
    image_url: createMinimalistBarberSvg(
      'WILLIAM',
      'CADEIRA 02 · ESPECIALISTA',
      '#1D4ED8',
      'barber-w'
    ),
  },
];

export const CAMPINA_GRANDE_SCHEDULE: ScheduleDay[] = [
  { day: 'Terça a Sexta', hours: '09:00 às 20:00', isOpen: true },
  { day: 'Sábado', hours: '08:30 às 19:00', isOpen: true },
  { day: 'Domingo e Segunda', hours: 'Fechado', isOpen: false },
];

function slugifyText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function formatPriceBRL(rawPrice: unknown, rawPriceCents?: unknown): {
  cents: number;
  formatted: string;
} {
  if (typeof rawPriceCents === 'number' && rawPriceCents > 0) {
    const reais = rawPriceCents / 100;
    return {
      cents: rawPriceCents,
      formatted: `R$ ${reais % 1 === 0 ? reais.toFixed(0) : reais.toFixed(2).replace('.', ',')}`,
    };
  }
  if (typeof rawPrice === 'number' && rawPrice > 0) {
    // Handle either cents (> 500) or BRL value
    const reais = rawPrice > 500 ? rawPrice / 100 : rawPrice;
    return {
      cents: Math.round(reais * 100),
      formatted: `R$ ${reais % 1 === 0 ? reais.toFixed(0) : reais.toFixed(2).replace('.', ',')}`,
    };
  }
  if (typeof rawPrice === 'string' && rawPrice.trim()) {
    return {
      cents: 5000,
      formatted: rawPrice.startsWith('R$') ? rawPrice : `R$ ${rawPrice}`,
    };
  }
  return { cents: 5500, formatted: 'R$ 55' };
}

/**
 * Fetches the dynamic service catalog directly from the `services` table in Supabase.
 */
export async function fetchPublicServices(): Promise<PublicServiceRecord[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('services').select('*');
      if (!error && Array.isArray(data) && data.length > 0) {
        return data.map((row: Record<string, unknown>, idx: number) => {
          const name = String(row.name || row.nome || `Serviço JM ${idx + 1}`);
          const slug = String(row.slug || slugifyText(name));
          const shortDesc = String(
            row.shortDesc ||
              row.description ||
              row.descricao ||
              'Atendimento exclusivo JM BarberClub.'
          );
          const duration = Number(
            row.duration_minutes || row.duration || row.duracao || 45
          );
          const { cents, formatted } = formatPriceBRL(
            row.price ?? row.preco ?? row.price_formatted,
            row.price_cents
          );
          const isCombo =
            Boolean(row.is_featured_combo) ||
            name.toLowerCase().includes('combo jm');
          const category: PublicServiceRecord['category'] =
            name.toLowerCase().includes('combo')
              ? 'Combos'
              : name.toLowerCase().includes('barba')
              ? 'Barba'
              : 'Corte';
          const imageUrl = String(
            row.image_url ||
              row.foto_url ||
              row.image ||
              createMinimalistBarberSvg(
                name.toUpperCase().slice(0, 22),
                `${duration} MIN · ${formatted}`,
                isCombo ? '#DC2626' : '#1D4ED8',
                isCombo ? 'combo' : category === 'Barba' ? 'beard' : 'fade'
              )
          );

          return {
            id: String(row.id || `srv-${idx}`),
            slug,
            name,
            shortDesc,
            duration_minutes: duration,
            price_cents: cents,
            price_formatted: formatted,
            category,
            is_featured_combo: isCombo,
            image_url: imageUrl,
          };
        });
      }
    } catch {
      // Fallback if table or network is unreachable
    }
  }

  return SEED_PUBLIC_SERVICES;
}

/**
 * Fetches the dynamic team of barbers directly from the `barbers` table in Supabase.
 */
export async function fetchPublicBarbers(): Promise<ExecutiveBarber[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase.from('barbers').select('*');
      const rows = !error && Array.isArray(data) && data.length > 0 ? data : null;
      if (rows) {
        return rows.map((row: Record<string, unknown>, idx: number) => {
          const name = String(row.name || row.nome || `Especialista ${idx + 1}`);
          const slug = String(row.slug || slugifyText(name));
          const role = String(row.role || row.cargo || 'Barbeiro Executivo');
          const specialty = String(
            row.specialty ||
              row.especialidade ||
              row.specialties ||
              'Cortes de Precisão, Degradê & Barboterapia'
          );
          const imageUrl = String(
            row.image_url ||
              row.avatar_url ||
              row.foto_url ||
              row.photo_url ||
              createMinimalistBarberSvg(
                name.toUpperCase(),
                `CADEIRA 0${idx + 1} · ESPECIALISTA`,
                idx % 2 === 0 ? '#DC2626' : '#1D4ED8',
                idx % 2 === 0 ? 'barber-m' : 'barber-w'
              )
          );

          return {
            id: String(row.id || `barb-${idx}`),
            slug,
            name,
            role,
            specialty,
            signatureServiceSlug: String(row.signature_service_slug || 'combo-jm'),
            image_url: imageUrl,
          };
        });
      }
    } catch {
      // Fallback if table or network is unreachable
    }
  }

  return EXECUTIVE_BARBERS;
}

export function getHighlightedAndEssentialServices(services: PublicServiceRecord[]): {
  featuredCombo: PublicServiceRecord;
  essentialServices: PublicServiceRecord[];
} {
  const featuredCombo =
    services.find((s) => s.is_featured_combo || s.slug === 'combo-jm') || services[0];
  const essentialServices = services.filter((s) => s.id !== featuredCombo.id);
  return { featuredCombo, essentialServices };
}

export function filterGalleryItems(
  items: GalleryStyleItem[],
  category: GalleryCategory
): GalleryStyleItem[] {
  if (category === 'Todos') return items;
  return items.filter((item) => item.category === category);
}

/**
 * Generates direct external URLs to the official JM BarberClub Chatbot PWA
 * (https://chatbot-jmbarberclub.vercel.app/) with optional deep-linking parameters.
 */
export function buildAgendarUrl(params?: {
  service?: string;
  barber?: string;
  style?: string;
}): string {
  const baseUrl = CHATBOT_PWA_BASE_URL;
  if (!params) return baseUrl;

  const searchParams = new URLSearchParams();
  if (params.service) searchParams.set('service', params.service);
  if (params.barber) searchParams.set('barber', params.barber);
  if (params.style) searchParams.set('style', params.style);
  const query = searchParams.toString();
  return query ? `${baseUrl}?${query}` : baseUrl;
}
