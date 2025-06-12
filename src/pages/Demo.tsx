
import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/dashboards/AdminDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Demo() {
  const { user, login } = useAuth();

  useEffect(() => {
    // Auto-login para demonstração
    if (!user) {
      login('maria@healthcare.com', 'demo').catch(() => {
        console.log('Demo auto-login failed');
      });
    }
  }, [user, login]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="w-96">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Carregando demonstração...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/landing">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Crown className="h-4 w-4 mr-1" />
              Modo Demonstração
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm opacity-90">
              Explore todas as funcionalidades gratuitamente
            </span>
            <Button variant="secondary" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
              Contratar Agora
            </Button>
          </div>
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-6">
        <AdminDashboard />
      </div>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 z-50">
        <Card className="shadow-2xl border-blue-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-slate-600 mb-3">
                Gostou da demonstração?
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Criar Minha Conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
