import { MeowProvider } from '@/contexts/MeowContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { PhotoGallery } from '@/components/PhotoGallery';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Camera, Heart } from 'lucide-react';

const Gallery = () => {
  return (
    <LanguageProvider>
      <MeowProvider>
      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <main className="pt-24">
          {/* Header */}
          <section className="py-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="container mx-auto px-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-foreground mb-6">
                <Camera className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">貓咪相片集</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-gradient-kawaii">可愛貓咪</span> 相片館
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                探索我們收藏的最可愛貓咪照片，點擊愛心按鈕來表達你的喜愛！
              </p>
            </motion.div>
          </section>

          {/* Gallery */}
          <PhotoGallery />

          {/* Call to Action */}
          <section className="py-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="container mx-auto px-4"
            >
              <div className="glass-card p-8 rounded-3xl max-w-xl mx-auto">
                <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">分享你的貓咪照片</h2>
                <p className="text-muted-foreground mb-6">
                  想讓你的毛孩也出現在這裡嗎？加入我們的社群，分享你的可愛貓咪！
                </p>
                <a 
                  href="/#newsletter" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  立即加入
                </a>
              </div>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
      </MeowProvider>
    </LanguageProvider>
  );
};

export default Gallery;
