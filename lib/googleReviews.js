export const GOOGLE_REVIEWS_REVALIDATE_SECONDS = 86400; // 24 horas
const CACHE_TTL_MS = GOOGLE_REVIEWS_REVALIDATE_SECONDS * 1000;

export const GOOGLE_MAPS_REVIEWS_URL =
  'https://www.google.com/maps/place/JM+Barberclub/@-7.2119184,-35.9003798,17z/data=!4m14!1m7!3m6!1s0x7ac1fccc3c55f51:0x8626bf0f934d1954!2sR.+Diogo+da+Costa,+252+-+Monte+Santo,+Campina+Grande+-+PB,+58400-733!3b1!8m2!3d-7.2119184!4d-35.9003798!3m5!1s0x7ac1f001746841f:0xee46df8375c7ba18!8m2!3d-7.2124517!4d-35.9006183!16s%2Fg%2F11nv04mbwt?entry=ttu';

let cachedReviewsEntry = null;

export function clearGoogleReviewsCache() {
  cachedReviewsEntry = null;
}

export function getAuthorInitial(authorName) {
  const cleanName = typeof authorName === 'string' ? authorName.trim() : '';
  if (!cleanName) return 'C';
  return cleanName.charAt(0).toUpperCase();
}

/**
 * Filters raw Google Places API reviews to keep only entries with non-empty text
 * and rating >= 4 stars, normalizing author details cleanly.
 */
export function filterAndNormalizeGoogleReviews(rawReviews) {
  if (!Array.isArray(rawReviews)) return [];

  return rawReviews
    .filter((review) => {
      if (!review || typeof review !== 'object') return false;
      const numericRating = Number(review.rating);
      const reviewText =
        typeof review.text === 'string' ? review.text.trim() : '';
      return (
        Number.isFinite(numericRating) &&
        numericRating >= 4 &&
        reviewText.length > 0
      );
    })
    .map((review) => {
      const authorName =
        typeof review.author_name === 'string' && review.author_name.trim()
          ? review.author_name.trim()
          : 'Cliente Google';

      return {
        authorName,
        authorInitial: getAuthorInitial(authorName),
        profilePhotoUrl:
          typeof review.profile_photo_url === 'string' &&
          review.profile_photo_url.trim().startsWith('http')
            ? review.profile_photo_url.trim()
            : null,
        rating: Math.min(5, Math.max(4, Math.round(Number(review.rating)))),
        relativeTimeDescription:
          typeof review.relative_time_description === 'string'
            ? review.relative_time_description.trim()
            : '',
        text: String(review.text).trim(),
        time: Number(review.time || 0),
      };
    });
}

function buildFallbackPayload(status) {
  return {
    configured: status !== 'unconfigured',
    status,
    rating: null,
    userRatingsTotal: 0,
    reviews: [],
    googleUrl: GOOGLE_MAPS_REVIEWS_URL,
  };
}

/**
 * Fetches real place rating, user_ratings_total, and filtered reviews from
 * Google Places API (Place Details) with 24h cache/revalidation (`revalidate: 86400`).
 * Never invents fictional reviews on missing credentials or API failures.
 */
export async function getGooglePlaceReviews(options = {}) {
  const resolvedApiKey = String(
    options.apiKey ?? process.env.GOOGLE_PLACES_API_KEY ?? ''
  ).trim();
  const resolvedPlaceId = String(
    options.placeId ?? process.env.GOOGLE_PLACE_ID ?? ''
  ).trim();
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const bypassCache = Boolean(options.bypassCache);

  if (!resolvedApiKey || !resolvedPlaceId) {
    return buildFallbackPayload('unconfigured');
  }

  const now = Date.now();
  if (
    !bypassCache &&
    cachedReviewsEntry &&
    cachedReviewsEntry.cacheKey === `${resolvedPlaceId}` &&
    now - cachedReviewsEntry.cachedAt < CACHE_TTL_MS
  ) {
    return cachedReviewsEntry.payload;
  }

  try {
    const endpoint =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${encodeURIComponent(resolvedPlaceId)}` +
      `&fields=name,rating,user_ratings_total,reviews,url` +
      `&language=pt-BR` +
      `&reviews_sort=newest` +
      `&key=${encodeURIComponent(resolvedApiKey)}`;

    const response = await fetchImpl(endpoint, {
      next: { revalidate: GOOGLE_REVIEWS_REVALIDATE_SECONDS },
    });

    if (!response || !response.ok) {
      return buildFallbackPayload('error');
    }

    const data = await response.json();
    if (!data || data.status !== 'OK' || !data.result) {
      return buildFallbackPayload('error');
    }

    const result = data.result;
    const reviews = filterAndNormalizeGoogleReviews(result.reviews);
    const rating =
      typeof result.rating === 'number' && Number.isFinite(result.rating)
        ? Number(result.rating.toFixed(1))
        : null;
    const userRatingsTotal =
      typeof result.user_ratings_total === 'number' &&
      Number.isFinite(result.user_ratings_total)
        ? result.user_ratings_total
        : 0;

    const payload = {
      configured: true,
      status: 'ok',
      rating,
      userRatingsTotal,
      reviews,
      googleUrl:
        typeof result.url === 'string' && result.url.startsWith('http')
          ? result.url
          : GOOGLE_MAPS_REVIEWS_URL,
    };

    if (!bypassCache) {
      cachedReviewsEntry = {
        cacheKey: `${resolvedPlaceId}`,
        cachedAt: now,
        payload,
      };
    }

    return payload;
  } catch {
    return buildFallbackPayload('error');
  }
}
