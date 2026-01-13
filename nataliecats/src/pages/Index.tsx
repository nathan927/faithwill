import { MeowProvider } from '@/contexts/MeowContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { PhotoGallery } from '@/components/PhotoGallery';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <MeowProvider>
        <div className="min-h-screen bg-background overflow-x-hidden">
          <Navbar />
          <main>
            <HeroSection />
            <PhotoGallery />
            <Newsletter />
          </main>
          <Footer />
        </div>
      </MeowProvider>
    </LanguageProvider>
  );
};

export default Index;
