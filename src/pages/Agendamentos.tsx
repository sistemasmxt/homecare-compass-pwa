
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  User, 
  Plus, 
  Search, 
  Filter,
  MapPin,
  Phone
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Agendamento {
  id: string;
  paciente: string;
  profissional: string;
  tipo: string;
  data: string;
  hora: string;
  endereco: string;
  telefone: string;
  status: 'confirmado' | 'pendente' | 'cancelado' | 'concluido';
}

export default function Agendamentos() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const agendamentos: Agendamento[] = [
    {
      id: '1',
      paciente: 'Maria Santos',
      profissional: 'Dr. João Silva',
      tipo: 'Consulta Médica',
      data: '2024-06-15',
      hora: '09:00',
      endereco: 'Rua das Flores, 123',
      telefone: '(11) 99999-9999',
      status: 'confirmado'
    },
    {
      id: '2',
      paciente: 'Carlos Oliveira',
      profissional: 'Ana Costa',
      tipo: 'Cuidados de Enfermagem',
      data: '2024-06-15',
      hora: '14:30',
      endereco: 'Av. Paulista, 456',
      telefone: '(11) 88888-8888',
      status: 'pendente'
    },
    {
      id: '3',
      paciente: 'José Pedro',
      profissional: 'Dr. Maria Lima',
      tipo: 'Fisioterapia',
      data: '2024-06-16',
      hora: '10:00',
      endereco: 'Rua da Consolação, 789',
      telefone: '(11) 77777-7777',
      status: 'confirmado'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmado: { color: 'bg-green-100 text-green-700', label: 'Confirmado' },
      pendente: { color: 'bg-yellow-100 text-yellow-700', label: 'Pendente' },
      cancelado: { color: 'bg-red-100 text-red-700', label: 'Cancelado' },
      concluido: { color: 'bg-blue-100 text-blue-700', label: 'Concluído' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const filteredAgendamentos = agendamentos.filter(
    agendamento =>
      agendamento.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agendamento.profissional.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agendamento.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Agendamentos</h1>
        <p className="text-slate-600 mt-2">Gerencie todos os agendamentos e consultas</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Hoje
            </CardTitle>
            <Calendar className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">8</div>
            <p className="text-xs text-green-600 mt-1">+2 vs ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Esta Semana
            </CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">42</div>
            <p className="text-xs text-green-600 mt-1">+12% vs semana anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Confirmados
            </CardTitle>
            <User className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">35</div>
            <p className="text-xs text-blue-600 mt-1">83% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pendentes
            </CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">7</div>
            <p className="text-xs text-yellow-600 mt-1">Aguardando confirmação</p>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Buscar agendamentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      {/* Tabela de Agendamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Agendamentos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Paciente</TableHead>
                <TableHead>Profissional</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Contato</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAgendamentos.map((agendamento) => (
                <TableRow key={agendamento.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold">{agendamento.paciente}</p>
                      <p className="text-sm text-slate-500 flex items-center mt-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {agendamento.endereco}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{agendamento.profissional}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{agendamento.tipo}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{new Date(agendamento.data).toLocaleDateString('pt-BR')}</p>
                      <p className="text-sm text-slate-500">{agendamento.hora}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="h-3 w-3 mr-1" />
                      {agendamento.telefone}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(agendamento.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      <Button variant="outline" size="sm">
                        Ver
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
