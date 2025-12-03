import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { 
  Crown, 
  Infinity, 
  Star, 
  Zap, 
  Shield, 
  Sparkles, 
  BookOpen, 
  Users, 
  X,
  Check
} from 'lucide-react';

interface PremiumBenefitsScreenProps {
  onClose: () => void;
}

export function PremiumBenefitsScreen({ onClose }: PremiumBenefitsScreenProps) {
  const benefits = [
    {
      icon: Infinity,
      title: 'Cheksiz almashtirish',
      description: 'Kitoblarni cheksiz miqdorda almashishingiz mumkin',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Star,
      title: 'Premium kitoblar',
      description: 'Eksklyuziv premium kitoblarga kirish huquqi',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Birinchi navbat',
      description: 'Yangi kitoblarni birinchi bo\'lib ko\'ring',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Reklama yo\'q',
      description: 'Reklamasiz, toza va qulay tajriba',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Prioritet qo\'llab-quvvatlash',
      description: 'Tezkor yordam va maxsus qo\'llab-quvvatlash',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Sparkles,
      title: 'Maxsus badge',
      description: 'Profilingizda premium badge va noyob dizayn',
      color: 'from-amber-500 to-yellow-500'
    },
    {
      icon: BookOpen,
      title: 'Offline o\'qish',
      description: 'Kitoblarni yuklab olib, internetsiз o\'qing',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Crown,
      title: 'Premium jamiyat',
      description: 'Premium foydalanuvchilar uchun maxsus guruh',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 p-6 pb-12">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex flex-col items-center text-center text-white mt-4">
          <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mb-4">
            <Crown className="w-12 h-12" />
          </div>
          <h1 className="text-3xl mb-2">Premium Imtiyozlar</h1>
          <p className="text-white/90 max-w-xs">
            Safari Book Premium bilan eng yaxshi tajribaga ega bo'ling
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4 -mt-8">
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 gap-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index} 
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4 p-4">
                      <div className={`bg-gradient-to-br ${benefit.color} p-3 rounded-xl shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.description}</p>
                      </div>
                      <Check className="w-5 h-5 text-green-500 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Premium Note */}
          <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="p-6 text-center">
              <Crown className="w-8 h-8 mx-auto mb-3 text-amber-600" />
              <h3 className="mb-2 text-amber-900">Premium qanday olinadi?</h3>
              <p className="text-sm text-gray-700 mb-4">
                Premium status faqat dasturchilar tomonidan beriladi. 
                Volontyorlar va faol foydalanuvchilar uchun maxsus taqdim etiladi.
              </p>
              <div className="space-y-2 text-left text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                  <p>Loyihaga hissa qo'shish orqali</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                  <p>Faol foydalanuvchi bo'lish orqali</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
                  <p>Volontyorlik qilish orqali</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Feature Note */}
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-center">
            <Sparkles className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-sm text-blue-800">
              Tez orada Premium sotib olish imkoniyati qo'shiladi!
            </p>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
