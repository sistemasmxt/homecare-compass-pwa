
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Heart, Pills, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const PatientDashboard = () => {
  const nextAppointments = [
    { date: 'Hoje', time: '14:00', professional: 'Dr. João Santos', type: 'Consulta Cardiológica' },
    { date: 'Amanhã', time: '10:00', professional: 'Ana Costa', type: 'Fisioterapia' },
    { date: '15/12', time: '09:00', professional: 'Dr. Maria Silva', type: 'Consulta de Rotina' },
  ];

  const medications = [
    { name: 'Losartana 50mg', frequency: '1x ao dia', time: '08:00', taken: true },
    { name: 'Metformina 850mg', frequency: '2x ao dia', time: '08:00 | 20:00', taken: true },
    { name: 'Sinvastatina 40mg', frequency: '1x ao dia', time: '20:00', taken: false },
  ];

  const vitalSigns = [
    { label: 'Pressão Arterial', value: '120/80 mmHg', status: 'normal' },
    { label: 'Frequência Cardíaca', value: '72 bpm', status: 'normal' },
    { label: 'Glicemia', value: '95 mg/dL', status: 'normal' },
    { label: 'Peso', value: '68 kg', status: 'normal' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Meu Painel de Saúde</h1>
        <p className="text-slate-600 mt-2">Acompanhe seus cuidados e tratamentos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Próxima Consulta
            </CardTitle>
            <Calendar className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">Hoje</div>
            <p className="text-xs text-slate-500">14:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Medicamentos
            </CardTitle>
            <Pills className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">3</div>
            <p className="text-xs text-green-600">2 tomados hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pressão Arterial
            </CardTitle>
            <Heart className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">120/80</div>
            <p className="text-xs text-green-600">Normal</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Atividade
            </CardTitle>
            <Activity className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">85%</div>
            <p className="text-xs text-slate-500">Meta semanal</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {nextAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.date} às {appointment.time}</p>
                    <p className="text-sm text-slate-600">{appointment.professional}</p>
                    <p className="text-xs text-slate-500">{appointment.type}</p>
                  </div>
                  <Button variant="outline" size="sm">Detalhes</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medicamentos de Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {medications.map((med, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${med.taken ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <p className="font-medium">{med.name}</p>
                      <p className="text-sm text-slate-600">{med.frequency}</p>
                      <p className="text-xs text-slate-500">{med.time}</p>
                    </div>
                  </div>
                  {!med.taken && (
                    <Button size="sm">Marcar Tomado</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sinais Vitais Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {vitalSigns.map((vital, index) => (
              <div key={index} className="text-center p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 mb-1">{vital.label}</p>
                <p className="text-xl font-bold text-slate-800">{vital.value}</p>
                <p className={`text-xs ${vital.status === 'normal' ? 'text-green-600' : 'text-red-600'}`}>
                  {vital.status === 'normal' ? 'Normal' : 'Atenção'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
