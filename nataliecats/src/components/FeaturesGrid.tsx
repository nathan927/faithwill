import { motion } from 'framer-motion';
import { Newspaper, ShoppingBag, Stethoscope, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Newspaper,
    title: '每日喵喵',
    subtitle: 'Daily Meows',
    description: '獲取最新的貓咪資訊、有趣故事和社群動態更新。',
    color: 'bg-primary',
    hoverColor: 'group-hover:bg-primary/80',
  },
  {
    icon: ShoppingBag,
    title: '貓薄荷商店',
    subtitle: 'Catnip Shop',
    description: '精選優質貓咪用品,從玩具到零食,應有盡有。',
    color: 'bg-secondary',
    hoverColor: 'group-hover:bg-secondary/80',
  },
  {
    icon: Stethoscope,
    title: '獸醫建議',
    subtitle: 'Vet Advice',
    description: '專業獸醫團隊提供健康照顧貼士和常見問題解答。',
    color: 'bg-accent',
    hoverColor: 'group-hover:bg-accent/80',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

export const FeaturesGrid = () => {
  return (
    <section id="features" className="py-20 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/30 text-foreground text-sm font-medium mb-4">
            探索功能
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            為貓奴們準備的
            <span className="text-gradient-kawaii"> 精彩內容</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            無論你是新手貓奴還是資深鏟屎官,我們都有適合你的內容和服務
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="card-kawaii h-full flex flex-col items-center text-center p-8 cursor-pointer">
                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 rounded-3xl ${feature.color} flex items-center justify-center mb-6 shadow-lg transition-all duration-300 ${feature.hoverColor}`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <feature.icon className="w-10 h-10 text-foreground/80" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{feature.subtitle}</p>
                <p className="text-muted-foreground mb-6 flex-grow">{feature.description}</p>

                {/* Button */}
                <Button
                  variant="ghost"
                  className="group/btn hover:bg-primary/20 rounded-full"
                >
                  了解更多
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
