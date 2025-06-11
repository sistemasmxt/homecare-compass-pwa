
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Clock, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CaregiverDashboard = () => {
  const todayVisits = [
    { time: '08:00', patient: 'Maria Santos', address: 'Rua das Flores, 123', status: 'pending' },
    { time: '10:00', patient: 'João Silva', address: 'Av. Principal, 456', status: 'completed' },
    { time: '14:00', patient: 'Ana Costa', address: 'Rua do Sol, 789', status: 'pending' },
    { time: '16:00', patient: 'Carlos Oliveira', address: 'Rua da Lua, 321', status: 'pending' },
  ];

  const weekStats = [
    { label: 'Visitas Concluídas', value: '28', total: '32' },
    { label: 'Horas Trabalhadas', value: '42', total: '44' },
    { label: 'Pacientes Atendidos', value: '18', total: '20' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard do Cuidador</h1>
        <p className="text-slate-600 mt-2">Sua agenda e atividades do dia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Visitas Hoje
            </CardTitle>
            <MapPin className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Próxima Visita
            </CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">08:00</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pacientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Concluídas
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">1/4</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Agenda do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayVisits.map((visit, index) => (
                  <div key={index} className={`flex items-center justify-between p-4 rounded-lg border ${
                    visit.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        visit.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="font-medium">{visit.time} - {visit.patient}</p>
                        <p className="text-sm text-slate-600">{visit.address}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {visit.status === 'pending' && (
                        <>
                          <Button variant="outline" size="sm">Check-in</Button>
                          <Button size="sm">Navegar</Button>
                        </>
                      )}
                      {visit.status === 'completed' && (
                        <Button variant="outline" size="sm" disabled>Concluída</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Resumo da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {weekStats.map((stat, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{stat.label}</span>
                    <span className="font-medium">{stat.value}/{stat.total}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-sky-600 h-2 rounded-full" 
                      style={{ width: `${(parseInt(stat.value) / parseInt(stat.total)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
