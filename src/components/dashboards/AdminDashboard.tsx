import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, DollarSign, Activity, TrendingUp, FileText } from 'lucide-react';
import { FileUpload } from '@/components/FileUpload';

export const AdminDashboard = () => {
  const stats = [
    { title: 'Total de Pacientes', value: '284', change: '+12%', icon: Users },
    { title: 'Cuidadores Ativos', value: '45', change: '+3%', icon: Activity },
    { title: 'Consultas Hoje', value: '28', change: '+8%', icon: Calendar },
    { title: 'Receita Mensal', value: 'R$ 125.000', change: '+15%', icon: DollarSign },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Administrativo</h1>
        <p className="text-slate-600 mt-2">Visão geral completa do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} vs mês anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Métricas de Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Taxa de Satisfação</span>
                <span className="font-medium">94%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Tempo Médio de Resposta</span>
                <span className="font-medium">15 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Taxa de Ocupação</span>
                <span className="font-medium">87%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Novo paciente cadastrado</p>
                  <p className="text-xs text-slate-500">há 2 minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Agendamento confirmado</p>
                  <p className="text-xs text-slate-500">há 5 minutos</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Relatório gerado</p>
                  <p className="text-xs text-slate-500">há 10 minutos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <FileUpload 
        title="Documentos Administrativos e Relatórios" 
        userType="admin"
      />
    </div>
  );
};
