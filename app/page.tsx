import React from 'react';
import Header from '../components/home/Header';
import Hero from '../components/home/Hero';
import TrustMetrics from '../components/home/TrustMetrics';
import ServicesCatalog from '../components/home/ServicesCatalog';
import GalleryGrid from '../components/home/GalleryGrid';
import TeamSection from '../components/home/TeamSection';
import LocationSection from '../components/home/LocationSection';
import Footer from '../components/home/Footer';
import {
  EXECUTIVE_BARBERS,
  ExecutiveBarber,
  fetchPublicBarbers,
  fetchPublicServices,
  PublicServiceRecord,
  SEED_PUBLIC_SERVICES,
} from '../lib/barberCatalog';

// Next.js App Router ISR revalidation (60 seconds)
export const revalidate = 60;

export function HomePageView({
  services = SEED_PUBLIC_SERVICES,
  barbers = EXECUTIVE_BARBERS,
}: {
  services?: PublicServiceRecord[];
  barbers?: ExecutiveBarber[];
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600/30 selection:text-white">
      <Header />
      <main>
        <Hero />
        <TrustMetrics />
        <ServicesCatalog services={services} />
        <GalleryGrid />
        <TeamSection barbers={barbers} />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}

export default async function HomePage() {
  const [services, barbers] = await Promise.all([
    fetchPublicServices(),
    fetchPublicBarbers(),
  ]);
  return <HomePageView services={services} barbers={barbers} />;
}
