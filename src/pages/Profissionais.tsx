
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Star, 
  Calendar, 
  Phone, 
  Mail, 
  Plus, 
  Search, 
  Filter,
  UserCheck,
  Stethoscope,
  Heart
} from 'lucide-react';

interface Profissional {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  tipo: 'medico' | 'cuidador' | 'enfermeiro' | 'fisioterapeuta';
  especialidade: string;
  registro: string;
  avaliacao: number;
  pacientesAtivos: number;
  status: 'ativo' | 'inativo' | 'ferias';
  proximaConsulta?: string;
}

export default function Profissionais() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<string>('');
  
  const profissionais: Profissional[] = [
    {
      id: '1',
      nome: 'Dr. João Silva',
      email: 'joao@healthcare.com',
      telefone: '(11) 99999-9999',
      tipo: 'medico',
      especialidade: 'Cardiologia',
      registro: 'CRM 123456',
      avaliacao: 4.8,
      pacientesAtivos: 45,
      status: 'ativo',
      proximaConsulta: '2024-06-15 09:00'
    },
    {
      id: '2',
      nome: 'Ana Costa',
      email: 'ana@healthcare.com',
      telefone: '(11) 88888-8888',
      tipo: 'cuidador',
      especialidade: 'Cuidados Geriátricos',
      registro: 'COREN 78910',
      avaliacao: 4.9,
      pacientesAtivos: 12,
      status: 'ativo',
      proximaConsulta: '2024-06-15 14:30'
    },
    {
      id: '3',
      nome: 'Dr. Maria Lima',
      email: 'maria.lima@healthcare.com',
      telefone: '(11) 77777-7777',
      tipo: 'fisioterapeuta',
      especialidade: 'Fisioterapia Respiratória',
      registro: 'CREFITO 11223',
      avaliacao: 4.7,
      pacientesAtivos: 28,
      status: 'ativo'
    },
    {
      id: '4',
      nome: 'Carlos Santos',
      email: 'carlos@healthcare.com',
      telefone: '(11) 66666-6666',
      tipo: 'enfermeiro',
      especialidade: 'Enfermagem Domiciliar',
      registro: 'COREN 44556',
      avaliacao: 4.6,
      pacientesAtivos: 18,
      status: 'ferias'
    }
  ];

  const getTipoIcon = (tipo: string) => {
    const icons = {
      medico: Stethoscope,
      cuidador: Heart,
      enfermeiro: User,
      fisioterapeuta: UserCheck
    };
    return icons[tipo as keyof typeof icons] || User;
  };

  const getTipoBadge = (tipo: string) => {
    const config = {
      medico: { color: 'bg-blue-100 text-blue-700', label: 'Médico' },
      cuidador: { color: 'bg-green-100 text-green-700', label: 'Cuidador' },
      enfermeiro: { color: 'bg-purple-100 text-purple-700', label: 'Enfermeiro' },
      fisioterapeuta: { color: 'bg-orange-100 text-orange-700', label: 'Fisioterapeuta' }
    };
    
    const tipoConfig = config[tipo as keyof typeof config];
    return (
      <Badge className={tipoConfig.color}>
        {tipoConfig.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const config = {
      ativo: { color: 'bg-green-100 text-green-700', label: 'Ativo' },
      inativo: { color: 'bg-red-100 text-red-700', label: 'Inativo' },
      ferias: { color: 'bg-yellow-100 text-yellow-700', label: 'Férias' }
    };
    
    const statusConfig = config[status as keyof typeof config];
    return (
      <Badge className={statusConfig.color}>
        {statusConfig.label}
      </Badge>
    );
  };

  const filteredProfissionais = profissionais.filter(
    profissional =>
      (profissional.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
       profissional.especialidade.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filtroTipo === '' || profissional.tipo === filtroTipo)
  );

  const totalProfissionais = profissionais.length;
  const profissionaisAtivos = profissionais.filter(p => p.status === 'ativo').length;
  const mediaPacientes = Math.round(
    profissionais.reduce((sum, p) => sum + p.pacientesAtivos, 0) / totalProfissionais
  );
  const mediaAvaliacao = (
    profissionais.reduce((sum, p) => sum + p.avaliacao, 0) / totalProfissionais
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Profissionais</h1>
        <p className="text-slate-600 mt-2">Gerencie sua equipe de profissionais de saúde</p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total de Profissionais
            </CardTitle>
            <User className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{totalProfissionais}</div>
            <p className="text-xs text-green-600 mt-1">+2 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Profissionais Ativos
            </CardTitle>
            <UserCheck className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{profissionaisAtivos}</div>
            <p className="text-xs text-blue-600 mt-1">{Math.round((profissionaisAtivos/totalProfissionais)*100)}% do total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Média de Pacientes
            </CardTitle>
            <Calendar className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{mediaPacientes}</div>
            <p className="text-xs text-slate-600 mt-1">por profissional</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Avaliação Média
            </CardTitle>
            <Star className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-800">{mediaAvaliacao}</div>
            <p className="text-xs text-yellow-600 mt-1">★★★★★</p>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Buscar profissionais..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm"
          >
            <option value="">Todos os tipos</option>
            <option value="medico">Médicos</option>
            <option value="cuidador">Cuidadores</option>
            <option value="enfermeiro">Enfermeiros</option>
            <option value="fisioterapeuta">Fisioterapeutas</option>
          </select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Profissional
        </Button>
      </div>

      {/* Grid de Profissionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProfissionais.map((profissional) => {
          const TipoIcon = getTipoIcon(profissional.tipo);
          return (
            <Card key={profissional.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {profissional.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{profissional.nome}</h3>
                      <p className="text-sm text-slate-600">{profissional.especialidade}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getTipoBadge(profissional.tipo)}
                    {getStatusBadge(profissional.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Registro:</span>
                  <span className="font-medium">{profissional.registro}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Avaliação:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{profissional.avaliacao}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Pacientes Ativos:</span>
                  <span className="font-medium">{profissional.pacientesAtivos}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4" />
                    <span>{profissional.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone className="h-4 w-4" />
                    <span>{profissional.telefone}</span>
                  </div>
                </div>

                {profissional.proximaConsulta && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <span className="text-blue-800 font-medium">Próxima consulta:</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      {new Date(profissional.proximaConsulta).toLocaleString('pt-BR')}
                    </p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Ver Perfil
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Escalas
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
