import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Plus, Search, Clock, User, Edit, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Agendamento {
  id: string;
  paciente: string;
  profissional: string;
  data: string;
  hora: string;
  tipo: 'consulta' | 'visita' | 'exame';
  status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado';
  observacoes?: string;
}

const mockAgendamentos: Agendamento[] = [
  {
    id: '1',
    paciente: 'Maria Silva',
    profissional: 'Dr. João Santos',
    data: '2024-01-15',
    hora: '09:00',
    tipo: 'consulta',
    status: 'confirmado',
    observacoes: 'Consulta de rotina'
  },
  {
    id: '2',
    paciente: 'José Santos',
    profissional: 'Ana Costa',
    data: '2024-01-15',
    hora: '14:00',
    tipo: 'visita',
    status: 'agendado',
    observacoes: 'Cuidados pós-operatórios'
  }
];

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(mockAgendamentos);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null);
  const [formData, setFormData] = useState({
    paciente: '',
    profissional: '',
    data: '',
    hora: '',
    tipo: 'consulta' as 'consulta' | 'visita' | 'exame',
    status: 'agendado' as 'agendado' | 'confirmado' | 'cancelado' | 'realizado',
    observacoes: ''
  });

  const filteredAgendamentos = agendamentos.filter(agendamento =>
    agendamento.paciente.toLowerCase().includes(search.toLowerCase()) ||
    agendamento.profissional.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (editingAgendamento) {
      setAgendamentos(prev => prev.map(agendamento =>
        agendamento.id === editingAgendamento.id
          ? { ...agendamento, ...formData }
          : agendamento
      ));
    } else {
      const newAgendamento: Agendamento = {
        id: Date.now().toString(),
        ...formData
      };
      setAgendamentos(prev => [...prev, newAgendamento]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (agendamento: Agendamento) => {
    setEditingAgendamento(agendamento);
    setFormData({
      paciente: agendamento.paciente,
      profissional: agendamento.profissional,
      data: agendamento.data,
      hora: agendamento.hora,
      tipo: agendamento.tipo,
      status: agendamento.status,
      observacoes: agendamento.observacoes || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setAgendamentos(prev => prev.filter(agendamento => agendamento.id !== id));
  };

  const resetForm = () => {
    setFormData({
      paciente: '',
      profissional: '',
      data: '',
      hora: '',
      tipo: 'consulta',
      status: 'agendado',
      observacoes: ''
    });
    setEditingAgendamento(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-100 text-green-800';
      case 'agendado': return 'bg-blue-100 text-blue-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'realizado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Agendamentos</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Agendamento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAgendamento ? 'Editar Agendamento' : 'Novo Agendamento'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="paciente">Paciente</Label>
                <Input
                  id="paciente"
                  value={formData.paciente}
                  onChange={(e) => setFormData({...formData, paciente: e.target.value})}
                  placeholder="Nome do paciente"
                />
              </div>
              <div>
                <Label htmlFor="profissional">Profissional</Label>
                <Input
                  id="profissional"
                  value={formData.profissional}
                  onChange={(e) => setFormData({...formData, profissional: e.target.value})}
                  placeholder="Nome do profissional"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="data">Data</Label>
                  <Input
                    id="data"
                    type="date"
                    value={formData.data}
                    onChange={(e) => setFormData({...formData, data: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="hora">Hora</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={formData.hora}
                    onChange={(e) => setFormData({...formData, hora: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value: 'consulta' | 'visita' | 'exame') => setFormData({...formData, tipo: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulta">Consulta</SelectItem>
                    <SelectItem value="visita">Visita</SelectItem>
                    <SelectItem value="exame">Exame</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'agendado' | 'confirmado' | 'cancelado' | 'realizado') => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agendado">Agendado</SelectItem>
                    <SelectItem value="confirmado">Confirmado</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                    <SelectItem value="realizado">Realizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="observacoes">Observações</Label>
                <Input
                  id="observacoes"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
                  placeholder="Observações adicionais"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingAgendamento ? 'Atualizar' : 'Criar'} Agendamento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por paciente ou profissional..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredAgendamentos.map((agendamento) => (
          <Card key={agendamento.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{agendamento.paciente}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <User className="h-4 w-4" />
                      <span>{agendamento.profissional}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Clock className="h-4 w-4" />
                      <span>{agendamento.data} às {agendamento.hora}</span>
                    </div>
                    {agendamento.observacoes && (
                      <p className="text-sm text-slate-600 mt-1">{agendamento.observacoes}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(agendamento.status)}>
                    {agendamento.status}
                  </Badge>
                  <Badge variant="outline">
                    {agendamento.tipo}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(agendamento)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(agendamento.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgendamentos.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum agendamento encontrado
            </h3>
            <p className="text-gray-500">
              {search ? 'Tente ajustar sua busca' : 'Clique em "Novo Agendamento" para começar'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
