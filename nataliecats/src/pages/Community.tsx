import { MeowProvider } from '@/contexts/MeowContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Heart, Share2, Trophy, Star } from 'lucide-react';

const communityFeatures = [
  {
    icon: MessageCircle,
    title: '貓咪討論區',
    description: '與其他貓奴分享養貓心得，交流經驗，互相學習。',
  },
  {
    icon: Share2,
    title: '照片分享',
    description: '上傳你的貓咪照片，展示毛孩的可愛瞬間。',
  },
  {
    icon: Trophy,
    title: '每月最萌',
    description: '參加每月最萌貓咪評選，贏取豐富獎品。',
  },
  {
    icon: Star,
    title: '專家問答',
    description: '獸醫和專家定期在線解答貓咪健康問題。',
  },
];

const testimonials = [
  {
    name: '小美',
    avatar: '🐱',
    text: '自從加入Natalie貓咪樂園，學到了好多照顧貓咪的知識！我的布偶貓現在超健康的～',
  },
  {
    name: '阿明',
    avatar: '😺',
    text: '這裡的貓奴們都超友善！每次分享我家橘貓的照片都收到很多愛心，超開心！',
  },
  {
    name: '小花',
    avatar: '🐈',
    text: '推薦給所有愛貓的人！專家問答真的很有用，解決了我很多養貓的疑問。',
  },
];

const Community = () => {
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
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">貓奴大家庭</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                加入我們的 <span className="text-gradient-kawaii">貓咪社群</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                與超過10,000位貓咪愛好者一起分享、學習、成長！
              </p>
            </motion.div>
          </section>

          {/* Community Features */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {communityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-3xl text-center hover:shadow-lg transition-shadow"
                  >
                    <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold text-center mb-8"
              >
                貓奴們的 <span className="text-gradient-kawaii">真心話</span>
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-3xl"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-4xl">{testimonial.avatar}</span>
                      <span className="font-bold">{testimonial.name}</span>
                    </div>
                    <p className="text-muted-foreground">{testimonial.text}</p>
                    <div className="flex gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-accent fill-accent" />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <Newsletter />
        </main>
        <Footer />
      </div>
    </MeowProvider>
    </LanguageProvider>
  );
};

export default Community;
