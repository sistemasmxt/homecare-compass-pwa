
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Users, 
  Calendar, 
  DollarSign, 
  Shield, 
  Zap, 
  Heart,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Landing() {
  const features = [
    {
      icon: Users,
      title: 'Gestão de Pacientes',
      description: 'Controle completo do histórico e cuidados de cada paciente'
    },
    {
      icon: Calendar,
      title: 'Agendamentos',
      description: 'Sistema inteligente de agendamento e escalas de profissionais'
    },
    {
      icon: DollarSign,
      title: 'Controle Financeiro',
      description: 'Gestão financeira completa com relatórios detalhados'
    },
    {
      icon: Shield,
      title: 'Segurança LGPD',
      description: 'Proteção total dos dados conforme regulamentações'
    },
    {
      icon: Zap,
      title: 'Relatórios em Tempo Real',
      description: 'Analytics e relatórios instantâneos para tomada de decisão'
    },
    {
      icon: Heart,
      title: 'Cuidado Humanizado',
      description: 'Tecnologia que potencializa o cuidado humano'
    }
  ];

  const plans = [
    {
      name: 'Básico',
      price: 'R$ 299',
      period: '/mês',
      description: 'Ideal para clínicas pequenas',
      features: [
        'Até 50 pacientes',
        'Agendamentos básicos',
        'Relatórios simples',
        'Suporte por email'
      ],
      popular: false
    },
    {
      name: 'Premium',
      price: 'R$ 599',
      period: '/mês',
      description: 'Para empresas em crescimento',
      features: [
        'Até 200 pacientes',
        'Agendamentos avançados',
        'Relatórios completos',
        'Analytics em tempo real',
        'Suporte prioritário',
        'Integração com laboratórios'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Sob consulta',
      period: '',
      description: 'Solução completa personalizada',
      features: [
        'Pacientes ilimitados',
        'Customizações',
        'API dedicada',
        'Suporte 24/7',
        'Treinamento incluso',
        'Implementação assistida'
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-800">HealthCare Manager</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/demo">
                <Button variant="outline">Ver Demonstração</Button>
              </Link>
              <Link to="/auth">
                <Button>Entrar</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-800 mb-6">
            O Futuro da Gestão em <span className="text-blue-600">Home Care</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Plataforma completa para gestão de empresas de home care. 
            Simplifique processos, otimize cuidados e aumente a eficiência da sua equipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo">
              <Button size="lg" className="text-lg px-8 py-4">
                Testar Gratuitamente
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Tudo que você precisa em uma plataforma
            </h2>
            <p className="text-xl text-slate-600">
              Funcionalidades pensadas para otimizar cada aspecto do seu negócio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Planos que se adaptam ao seu negócio
            </h2>
            <p className="text-xl text-slate-600">
              Escolha o plano ideal para o tamanho da sua empresa
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-slate-200'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="h-4 w-4 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-blue-600">{plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </div>
                  <p className="text-slate-600">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                    {plan.name === 'Enterprise' ? 'Entrar em Contato' : 'Começar Agora'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para transformar sua gestão?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Teste gratuitamente por 14 dias. Sem compromisso, sem cartão de crédito.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/demo">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Iniciar Teste Gratuito
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 text-white border-white hover:bg-white hover:text-blue-600">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Activity className="h-6 w-6" />
            <span className="text-lg font-semibold">HealthCare Manager</span>
          </div>
          <p className="text-slate-400">
            © 2024 HealthCare Manager. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
