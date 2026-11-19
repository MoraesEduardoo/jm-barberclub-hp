import {
  getGooglePlaceReviews,
  GOOGLE_REVIEWS_REVALIDATE_SECONDS,
} from '../../../lib/googleReviews.js';

export const revalidate = 86400;

export async function GET() {
  const payload = await getGooglePlaceReviews();

  return Response.json(payload, {
    status: 200,
    headers: {
      'Cache-Control': `public, s-maxage=${GOOGLE_REVIEWS_REVALIDATE_SECONDS}, stale-while-revalidate=3600`,
    },
  });
}
