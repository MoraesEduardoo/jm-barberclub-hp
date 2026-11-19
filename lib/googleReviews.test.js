import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clearGoogleReviewsCache,
  filterAndNormalizeGoogleReviews,
  getAuthorInitial,
  getGooglePlaceReviews,
  GOOGLE_MAPS_REVIEWS_URL,
  GOOGLE_REVIEWS_REVALIDATE_SECONDS,
} from './googleReviews.js';

test('filterAndNormalizeGoogleReviews filters out reviews below 4 stars or without text', () => {
  const raw = [
    {
      author_name: 'Carlos Silva',
      rating: 5,
      text: 'Excelente corte e atendimento pontual!',
      relative_time_description: 'há uma semana',
      profile_photo_url: 'https://example.com/photo.jpg',
      time: 1731900000,
    },
    {
      author_name: 'Sem Texto',
      rating: 5,
      text: '   ',
      relative_time_description: 'há 2 semanas',
    },
    {
      author_name: 'Nota Baixa',
      rating: 3,
      text: 'Poderia ser melhor.',
      relative_time_description: 'há um mês',
    },
    {
      author_name: 'João Pedro',
      rating: 4,
      text: 'Muito bom degradê.',
      relative_time_description: 'há 3 dias',
    },
  ];

  const normalized = filterAndNormalizeGoogleReviews(raw);
  assert.equal(normalized.length, 2);
  assert.equal(normalized[0].authorName, 'Carlos Silva');
  assert.equal(normalized[0].authorInitial, 'C');
  assert.equal(normalized[0].rating, 5);
  assert.equal(normalized[0].profilePhotoUrl, 'https://example.com/photo.jpg');
  assert.equal(normalized[1].authorName, 'João Pedro');
  assert.equal(normalized[1].rating, 4);
  assert.equal(normalized[1].profilePhotoUrl, null);
  assert.equal(getAuthorInitial(''), 'C');
});

test('getGooglePlaceReviews returns clean fallback without fictional names when env vars are missing', async () => {
  clearGoogleReviewsCache();
  const res = await getGooglePlaceReviews({ apiKey: '', placeId: '' });
  assert.equal(res.configured, false);
  assert.equal(res.status, 'unconfigured');
  assert.equal(res.reviews.length, 0);
  assert.equal(res.rating, null);
  assert.equal(res.googleUrl, GOOGLE_MAPS_REVIEWS_URL);
});

test('getGooglePlaceReviews fetches real Google Place Details with 24h revalidation and caches result', async () => {
  clearGoogleReviewsCache();
  let fetchCalls = 0;
  let receivedRevalidate = null;

  const mockFetch = async (_url, init) => {
    fetchCalls += 1;
    receivedRevalidate = init?.next?.revalidate ?? null;
    return {
      ok: true,
      async json() {
        return {
          status: 'OK',
          result: {
            rating: 4.9,
            user_ratings_total: 148,
            url: 'https://maps.google.com/?cid=12345',
            reviews: [
              {
                author_name: 'Marcos Oliveira',
                rating: 5,
                text: 'Barbearia top demais no Monte Santo.',
                relative_time_description: 'há 2 dias',
                time: 1731990000,
              },
              {
                author_name: 'Ignorado Sem Texto',
                rating: 5,
                text: '',
              },
            ],
          },
        };
      },
    };
  };

  const first = await getGooglePlaceReviews({
    apiKey: 'test-key',
    placeId: 'test-place-id',
    fetchImpl: mockFetch,
  });

  assert.equal(first.status, 'ok');
  assert.equal(first.rating, 4.9);
  assert.equal(first.userRatingsTotal, 148);
  assert.equal(first.reviews.length, 1);
  assert.equal(first.reviews[0].authorName, 'Marcos Oliveira');
  assert.equal(receivedRevalidate, GOOGLE_REVIEWS_REVALIDATE_SECONDS);
  assert.equal(receivedRevalidate, 86400);

  // Second call within 24h should hit in-memory cache
  const second = await getGooglePlaceReviews({
    apiKey: 'test-key',
    placeId: 'test-place-id',
    fetchImpl: mockFetch,
  });
  assert.equal(fetchCalls, 1);
  assert.equal(second.reviews[0].authorName, 'Marcos Oliveira');
});

test('getGooglePlaceReviews fails safely without throwing or inventing reviews when API fails', async () => {
  clearGoogleReviewsCache();
  const res = await getGooglePlaceReviews({
    apiKey: 'test-key',
    placeId: 'bad-place',
    bypassCache: true,
    fetchImpl: async () => {
      throw new Error('Network down');
    },
  });

  assert.equal(res.status, 'error');
  assert.equal(res.reviews.length, 0);
  assert.equal(res.googleUrl, GOOGLE_MAPS_REVIEWS_URL);
});
