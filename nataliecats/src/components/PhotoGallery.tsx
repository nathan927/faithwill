import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

import cat1 from '@/assets/cat-1.png';
import cat2 from '@/assets/cat-2.png';
import cat3 from '@/assets/cat-3.png';
import cat4 from '@/assets/cat-4.png';
import cat5 from '@/assets/cat-5.png';
import cat6 from '@/assets/cat-6.png';

// Import cat breed images for more variety
import persian from '@/assets/cats/persian.png';
import britishShorthair from '@/assets/cats/british-shorthair.png';
import siamese from '@/assets/cats/siamese.png';
import maineCoon from '@/assets/cats/maine-coon.png';
import scottishFold from '@/assets/cats/scottish-fold.png';
import ragdoll from '@/assets/cats/ragdoll.png';
import bengal from '@/assets/cats/bengal.png';
import munchkin from '@/assets/cats/munchkin.png';
import russianBlue from '@/assets/cats/russian-blue.png';
import sphynx from '@/assets/cats/sphynx.png';
import abyssinian from '@/assets/cats/abyssinian.png';
import norwegianForest from '@/assets/cats/norwegian-forest.png';
import exoticShorthair from '@/assets/cats/exotic-shorthair.png';
import birman from '@/assets/cats/birman.png';
import americanShorthair from '@/assets/cats/american-shorthair.png';
import bombay from '@/assets/cats/bombay.png';

const galleryImages = [
  { src: cat1, alt: '可愛橘貓', likes: 234 },
  { src: persian, alt: '波斯貓', likes: 567 },
  { src: cat2, alt: '灰色小貓', likes: 456 },
  { src: britishShorthair, alt: '英國短毛貓', likes: 389 },
  { src: cat3, alt: '三花貓咪', likes: 189 },
  { src: siamese, alt: '暹羅貓', likes: 445 },
  { src: maineCoon, alt: '緬因貓', likes: 512 },
  { src: cat4, alt: '黑色貓咪', likes: 321 },
  { src: scottishFold, alt: '蘇格蘭摺耳貓', likes: 623 },
  { src: ragdoll, alt: '布偶貓', likes: 534 },
  { src: cat5, alt: '奶油色貓', likes: 278 },
  { src: bengal, alt: '孟加拉貓', likes: 467 },
  { src: munchkin, alt: '曼赤肯貓', likes: 398 },
  { src: cat6, alt: '暹羅貓咪', likes: 412 },
  { src: russianBlue, alt: '俄羅斯藍貓', likes: 356 },
  { src: sphynx, alt: '斯芬克斯貓', likes: 289 },
  { src: abyssinian, alt: '阿比西尼亞貓', likes: 423 },
  { src: norwegianForest, alt: '挪威森林貓', likes: 501 },
  { src: exoticShorthair, alt: '異國短毛貓', likes: 378 },
  { src: birman, alt: '伯曼貓', likes: 445 },
  { src: americanShorthair, alt: '美國短毛貓', likes: 367 },
  { src: bombay, alt: '孟買貓', likes: 298 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export const PhotoGallery = () => {
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState(galleryImages.map((img) => img.likes));

  const handleLike = (index: number) => {
    const newLiked = new Set(likedImages);
    const newCounts = [...likeCounts];

    if (newLiked.has(index)) {
      newLiked.delete(index);
      newCounts[index]--;
    } else {
      newLiked.add(index);
      newCounts[index]++;
    }

    setLikedImages(newLiked);
    setLikeCounts(newCounts);
  };

  return (
    <section id="gallery" className="py-20 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-accent/30 text-foreground text-sm font-medium mb-4">
            相片畫廊
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            超萌
            <span className="text-gradient-kawaii"> 貓咪時刻</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            來自社群的可愛貓咪照片,點擊愛心為你喜歡的喵喵投票!
          </p>
        </motion.div>

        {/* Masonry Gallery */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="break-inside-avoid group"
            >
              <div className="relative glass-card rounded-3xl overflow-hidden">
                {/* Image */}
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Like Button */}
                <motion.button
                  onClick={() => handleLike(index)}
                  className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 rounded-full glass-card-strong"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={likedImages.has(index) ? 'liked' : 'not-liked'}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Heart
                        className={`w-5 h-5 transition-colors ${
                          likedImages.has(index)
                            ? 'text-red-500 fill-red-500'
                            : 'text-foreground'
                        }`}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <span className="text-sm font-medium">{likeCounts[index]}</span>
                </motion.button>

                {/* Image Label */}
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-3 py-1 rounded-full bg-card/90 text-sm font-medium">
                    {image.alt}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
