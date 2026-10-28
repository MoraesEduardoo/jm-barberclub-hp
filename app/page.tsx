import React from 'react';
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import TrustMetrics from '../components/home/TrustMetrics';
import ServicesCatalog from '../components/home/ServicesCatalog';
import TeamSection from '../components/home/TeamSection';
import LocationSection from '../components/home/LocationSection';
import Footer from '../components/home/Footer';
import {
  DEFAULT_TRUST_METRICS,
  ExecutiveBarber,
  fetchPublicBarbers,
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
  barbers = [],
}: {
  metrics?: PublicTrustMetrics;
  services?: PublicServiceRecord[];
  barbers?: ExecutiveBarber[];
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600/30 selection:text-white">
      <Header />
      <main>
        <Hero />
        <TrustMetrics metrics={metrics} />
        <ServicesCatalog services={services} />
        <TeamSection barbers={barbers} />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}

export default async function HomePage() {
  const [metrics, services, barbers] = await Promise.all([
    fetchTrustMetrics(),
    fetchPublicServices(),
    fetchPublicBarbers(),
  ]);

  return (
    <HomePageView
      metrics={metrics}
      services={services}
      barbers={barbers}
    />
  );
}
