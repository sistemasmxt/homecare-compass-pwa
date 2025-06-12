import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { User, Plus, Search, Mail, Phone, Edit, Trash2, Activity } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Profissional {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: 'medico' | 'cuidador' | 'enfermeiro' | 'fisioterapeuta';
  especialidade?: string;
  registro: string;
  status: 'ativo' | 'inativo';
}

const mockProfissionais: Profissional[] = [
  {
    id: '1',
    nome: 'Dr. João Santos',
    email: 'joao@healthcare.com',
    telefone: '(11) 99999-9999',
    tipo: 'medico',
    especialidade: 'Cardiologia',
    registro: 'CRM 123456',
    status: 'ativo'
  },
  {
    id: '2',
    nome: 'Ana Costa',
    email: 'ana@healthcare.com',
    telefone: '(11) 88888-8888',
    tipo: 'cuidador',
    registro: 'CRE 12345',
    status: 'ativo'
  },
  {
    id: '3',
    nome: 'Maria Oliveira',
    email: 'maria@healthcare.com',
    telefone: '(11) 77777-7777',
    tipo: 'enfermeiro',
    especialidade: 'Home Care',
    registro: 'COREN 54321',
    status: 'ativo'
  }
];

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState<Profissional[]>(mockProfissionais);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProfissional, setEditingProfissional] = useState<Profissional | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo: 'medico' as 'medico' | 'cuidador' | 'enfermeiro' | 'fisioterapeuta',
    especialidade: '',
    registro: '',
    status: 'ativo' as 'ativo' | 'inativo'
  });

  const filteredProfissionais = profissionais.filter(profissional =>
    profissional.nome.toLowerCase().includes(search.toLowerCase()) ||
    profissional.email.toLowerCase().includes(search.toLowerCase()) ||
    profissional.especialidade?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    if (editingProfissional) {
      setProfissionais(prev => prev.map(profissional =>
        profissional.id === editingProfissional.id
          ? { ...profissional, ...formData }
          : profissional
      ));
    } else {
      const newProfissional: Profissional = {
        id: Date.now().toString(),
        ...formData
      };
      setProfissionais(prev => [...prev, newProfissional]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (profissional: Profissional) => {
    setEditingProfissional(profissional);
    setFormData({
      nome: profissional.nome,
      email: profissional.email,
      telefone: profissional.telefone,
      tipo: profissional.tipo,
      especialidade: profissional.especialidade || '',
      registro: profissional.registro,
      status: profissional.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setProfissionais(prev => prev.filter(profissional => profissional.id !== id));
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      tipo: 'medico',
      especialidade: '',
      registro: '',
      status: 'ativo'
    });
    setEditingProfissional(null);
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'medico': return 'bg-blue-100 text-blue-800';
      case 'cuidador': return 'bg-green-100 text-green-800';
      case 'enfermeiro': return 'bg-purple-100 text-purple-800';
      case 'fisioterapeuta': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Profissionais</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Profissional
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingProfissional ? 'Editar Profissional' : 'Novo Profissional'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="email@exemplo.com"
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={formData.telefone}
                  onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value: 'medico' | 'cuidador' | 'enfermeiro' | 'fisioterapeuta') => setFormData({...formData, tipo: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medico">Médico</SelectItem>
                    <SelectItem value="cuidador">Cuidador</SelectItem>
                    <SelectItem value="enfermeiro">Enfermeiro</SelectItem>
                    <SelectItem value="fisioterapeuta">Fisioterapeuta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="especialidade">Especialidade</Label>
                <Input
                  id="especialidade"
                  value={formData.especialidade}
                  onChange={(e) => setFormData({...formData, especialidade: e.target.value})}
                  placeholder="Ex: Cardiologia, Home Care"
                />
              </div>
              <div>
                <Label htmlFor="registro">Registro Profissional</Label>
                <Input
                  id="registro"
                  value={formData.registro}
                  onChange={(e) => setFormData({...formData, registro: e.target.value})}
                  placeholder="Ex: CRM 123456, COREN 54321"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'ativo' | 'inativo') => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ativo">Ativo</SelectItem>
                    <SelectItem value="inativo">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingProfissional ? 'Atualizar' : 'Criar'} Profissional
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar profissionais..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredProfissionais.map((profissional) => (
          <Card key={profissional.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{profissional.nome}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-4 w-4" />
                      <span>{profissional.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-4 w-4" />
                      <span>{profissional.telefone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Activity className="h-4 w-4" />
                      <span>{profissional.registro}</span>
                    </div>
                    {profissional.especialidade && (
                      <p className="text-sm text-slate-600 mt-1">
                        Especialidade: {profissional.especialidade}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getTipoColor(profissional.tipo)}>
                    {profissional.tipo}
                  </Badge>
                  <Badge className={getStatusColor(profissional.status)}>
                    {profissional.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(profissional)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(profissional.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProfissionais.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhum profissional encontrado
            </h3>
            <p className="text-gray-500">
              {search ? 'Tente ajustar sua busca' : 'Clique em "Novo Profissional" para começar'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
