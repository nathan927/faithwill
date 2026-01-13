import { MeowProvider } from '@/contexts/MeowContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { motion } from 'framer-motion';
import { HeartHandshake, Utensils, Stethoscope, Scissors, Heart, Moon, Droplets, Gamepad2 } from 'lucide-react';

const careTopics = [
  {
    icon: Utensils,
    title: '健康飲食',
    description: '了解貓咪的營養需求，選擇優質貓糧，控制餵食份量，確保毛孩健康成長。',
    tips: ['每日定時餵食2-3次', '提供新鮮清水', '避免人類食物'],
    color: 'bg-primary/20',
  },
  {
    icon: Stethoscope,
    title: '定期檢查',
    description: '帶貓咪定期看獸醫，接種疫苗，做身體檢查，預防勝於治療。',
    tips: ['每年體檢一次', '按時接種疫苗', '注意異常行為'],
    color: 'bg-secondary/30',
  },
  {
    icon: Scissors,
    title: '毛髮護理',
    description: '定期梳理毛髮，剪指甲，清潔耳朵，保持貓咪整潔美麗。',
    tips: ['每週梳毛2-3次', '每月剪指甲', '定期清潔耳朵'],
    color: 'bg-accent/40',
  },
  {
    icon: Gamepad2,
    title: '玩耍互動',
    description: '每天抽時間陪貓咪玩耍，提供玩具和攀爬架，滿足好奇心和運動需求。',
    tips: ['每天遊戲15-30分鐘', '提供多種玩具', '設置貓跳台'],
    color: 'bg-primary/20',
  },
  {
    icon: Moon,
    title: '舒適環境',
    description: '為貓咪準備舒適的睡窩，安靜的休息空間，讓牠們有安全感。',
    tips: ['提供溫暖睡窩', '保持環境安靜', '設置躲藏空間'],
    color: 'bg-secondary/30',
  },
  {
    icon: Droplets,
    title: '清潔衛生',
    description: '保持貓砂盆清潔，定期更換貓砂，維護環境衛生。',
    tips: ['每日清理貓砂', '每週徹底更換', '放置在通風處'],
    color: 'bg-accent/40',
  },
];

const CatCare = () => {
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
                <HeartHandshake className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">愛護貓咪指南</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                <span className="text-gradient-kawaii">貓咪護理</span> 小知識
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                學習如何給你的毛孩最好的照顧，讓牠們健康快樂地陪伴你！
              </p>
            </motion.div>
          </section>

          {/* Care Topics Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {careTopics.map((topic, index) => (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 rounded-3xl hover:shadow-lg transition-shadow"
                  >
                    <div className={`w-14 h-14 ${topic.color} rounded-2xl flex items-center justify-center mb-4`}>
                      <topic.icon className="w-7 h-7 text-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                    <p className="text-muted-foreground mb-4">{topic.description}</p>
                    <ul className="space-y-2">
                      {topic.tips.map((tip, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <Heart className="w-4 h-4 text-primary fill-primary" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Expert Advice */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card-strong p-8 md:p-12 rounded-3xl text-center max-w-3xl mx-auto"
              >
                <Stethoscope className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4">需要專業獸醫建議？</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  如果你的貓咪有任何健康問題，請務必諮詢專業獸醫。我們的社群也有經驗豐富的貓奴可以分享經驗！
                </p>
                <a 
                  href="/#newsletter" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  加入社群討論
                </a>
              </motion.div>
            </div>
          </section>
        </main>
          <Footer />
        </div>
      </MeowProvider>
    </LanguageProvider>
  );
};

export default CatCare;
