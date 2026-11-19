import React from 'react';
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import TrustMetrics from '../components/home/TrustMetrics';
import BookingStepsStrip from '../components/home/BookingStepsStrip';
import ServicesCatalog from '../components/home/ServicesCatalog';
import TeamSection from '../components/home/TeamSection';
import SocialProofSection from '../components/home/SocialProofSection.jsx';
import LocationSection from '../components/home/LocationSection';
import ProductsCatalog from '../components/home/ProductsCatalog';
import Footer from '../components/home/Footer';
import {
  BarberProduct,
  DEFAULT_TRUST_METRICS,
  ExecutiveBarber,
  fetchPublicBarbers,
  fetchPublicProducts,
  fetchPublicServices,
  fetchTrustMetrics,
  PublicServiceRecord,
  PublicTrustMetrics,
} from '../lib/barberCatalog';
import { getGooglePlaceReviews } from '../lib/googleReviews.js';

// Next.js App Router ISR revalidation (60 seconds)
export const revalidate = 60;

export function HomePageView({
  metrics = DEFAULT_TRUST_METRICS,
  services = [],
  products = [],
  barbers = [],
  googleReviewsData = null,
}: {
  metrics?: PublicTrustMetrics;
  services?: PublicServiceRecord[];
  products?: BarberProduct[];
  barbers?: ExecutiveBarber[];
  googleReviewsData?: unknown;
}) {
  return (
    <div className="min-h-screen pb-28 bg-black text-white selection:bg-red-600/30 selection:text-white">
      <Header />
      <main>
        <Hero />
        <TrustMetrics metrics={metrics} />
        <BookingStepsStrip />
        <ServicesCatalog services={services} />
        <TeamSection barbers={barbers} />
        <SocialProofSection initialData={googleReviewsData} />
        <LocationSection />
        <ProductsCatalog products={products} />
      </main>
      <Footer />
    </div>
  );
}

export default async function HomePage() {
  const [metrics, services, products, barbers, googleReviewsData] =
    await Promise.all([
      fetchTrustMetrics(),
      fetchPublicServices(),
      fetchPublicProducts(),
      fetchPublicBarbers(),
      getGooglePlaceReviews(),
    ]);

  return (
    <HomePageView
      metrics={metrics}
      services={services}
      products={products}
      barbers={barbers}
      googleReviewsData={googleReviewsData}
    />
  );
}
