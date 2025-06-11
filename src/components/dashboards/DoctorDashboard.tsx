import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Calendar, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/FileUpload';

export const DoctorDashboard = () => {
  const todayAppointments = [
    { time: '09:00', patient: 'Maria Santos', type: 'Consulta de Rotina' },
    { time: '10:30', patient: 'João Silva', type: 'Teleconsulta' },
    { time: '14:00', patient: 'Ana Costa', type: 'Revisão de Medicação' },
    { time: '15:30', patient: 'Carlos Oliveira', type: 'Consulta de Urgência' },
  ];

  const recentPatients = [
    { name: 'Maria Santos', condition: 'Hipertensão', lastVisit: '2 dias atrás' },
    { name: 'João Silva', condition: 'Diabetes', lastVisit: '1 semana atrás' },
    { name: 'Ana Costa', condition: 'Fisioterapia', lastVisit: '3 dias atrás' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Médico</h1>
        <p className="text-slate-600 mt-2">Gerencie seus pacientes e consultas</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pacientes Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">48</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Consultas Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">4</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Relatórios Pendentes
            </CardTitle>
            <FileText className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">3</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Próxima Consulta
            </CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">09:00</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agenda de Hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium">{appointment.time}</p>
                    <p className="text-sm text-slate-600">{appointment.patient}</p>
                    <p className="text-xs text-slate-500">{appointment.type}</p>
                  </div>
                  <Button variant="outline" size="sm">Ver Detalhes</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pacientes Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <p className="text-sm text-slate-600">{patient.condition}</p>
                    <p className="text-xs text-slate-500">{patient.lastVisit}</p>
                  </div>
                  <Button variant="outline" size="sm">Abrir Prontuário</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <FileUpload 
        title="Documentos Médicos e Prescrições" 
        userType="doctor"
      />
    </div>
  );
};
