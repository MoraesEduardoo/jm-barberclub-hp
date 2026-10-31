import React from 'react';
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import TrustMetrics from '../components/home/TrustMetrics';
import ServicesCatalog from '../components/home/ServicesCatalog';
import ProductsCatalog from '../components/home/ProductsCatalog';
import TeamSection from '../components/home/TeamSection';
import LocationSection from '../components/home/LocationSection';
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

// Next.js App Router ISR revalidation (60 seconds)
export const revalidate = 60;

export function HomePageView({
  metrics = DEFAULT_TRUST_METRICS,
  services = [],
  products = [],
  barbers = [],
}: {
  metrics?: PublicTrustMetrics;
  services?: PublicServiceRecord[];
  products?: BarberProduct[];
  barbers?: ExecutiveBarber[];
}) {
  return (
    <div className="min-h-screen pb-28 bg-black text-white selection:bg-red-600/30 selection:text-white">
      <Header />
      <main>
        <Hero />
        <TrustMetrics metrics={metrics} />
        <ServicesCatalog services={services} />
        <ProductsCatalog products={products} />
        <TeamSection barbers={barbers} />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}

export default async function HomePage() {
  const [metrics, services, products, barbers] = await Promise.all([
    fetchTrustMetrics(),
    fetchPublicServices(),
    fetchPublicProducts(),
    fetchPublicBarbers(),
  ]);

  return (
    <HomePageView
      metrics={metrics}
      services={services}
      products={products}
      barbers={barbers}
    />
  );
}
