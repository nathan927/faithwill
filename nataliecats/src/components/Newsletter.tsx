import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Cat, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export const Newsletter = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: `🎉 ${t.subscribeSuccess}`,
      description: t.subscribeSuccessDesc,
    });
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section id="newsletter" className="py-20 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20" />
      
      {/* Cat Ear Shape - Left */}
      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-40 h-80 bg-primary/30 rounded-full blur-3xl rotate-45" />
      
      {/* Cat Ear Shape - Right */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-40 h-80 bg-secondary/30 rounded-full blur-3xl -rotate-45" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Cat Ears Decoration */}
          <div className="relative inline-block mb-8">
            <motion.div
              className="absolute -top-8 -left-6 w-12 h-16 bg-primary rounded-full origin-bottom"
              style={{ transform: 'rotate(-30deg)' }}
              animate={{ rotate: ['-30deg', '-25deg', '-30deg'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute -top-8 -right-6 w-12 h-16 bg-primary rounded-full origin-bottom"
              style={{ transform: 'rotate(30deg)' }}
              animate={{ rotate: ['30deg', '25deg', '30deg'] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <div className="bg-card glass-card-strong rounded-full p-6">
              <Cat className="w-12 h-12 text-primary" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t.newsletterTitle}
            <span className="text-gradient-kawaii"> {t.newsletterHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            {t.newsletterDescription}
          </p>

          {/* Newsletter Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex-1 relative">
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-14 pl-5 pr-12 rounded-full border-2 border-primary/30 bg-card/80 backdrop-blur-sm focus:border-primary transition-colors"
                required
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50" />
            </div>
            <Button
              type="submit"
              variant="kawaii"
              size="lg"
              disabled={isSubmitting}
              className="h-14 px-8"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Cat className="w-5 h-5" />
                </motion.div>
              ) : (
                <>
                  {t.subscribe}
                  <Send className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </motion.form>

          {/* Trust Note */}
          <motion.p
            className="mt-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {t.privacyNote}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
