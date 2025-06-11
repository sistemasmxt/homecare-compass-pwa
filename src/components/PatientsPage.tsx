
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  MoreHorizontal
} from "lucide-react";

export const PatientsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const patients = [
    {
      id: 1,
      name: "Maria Silva",
      age: 78,
      condition: "Fisioterapia",
      phone: "(11) 99999-1234",
      address: "Rua das Flores, 123",
      lastVisit: "2024-01-10",
      status: "Ativo",
      priority: "Normal"
    },
    {
      id: 2,
      name: "João Santos",
      age: 65,
      condition: "Enfermagem",
      phone: "(11) 99999-5678",
      address: "Av. Principal, 456",
      lastVisit: "2024-01-09",
      status: "Ativo",
      priority: "Alta"
    },
    {
      id: 3,
      name: "Ana Costa",
      age: 82,
      condition: "Medicação",
      phone: "(11) 99999-9012",
      address: "Rua do Centro, 789",
      lastVisit: "2024-01-08",
      status: "Ativo",
      priority: "Normal"
    },
    {
      id: 4,
      name: "Pedro Lima",
      age: 71,
      condition: "Fisioterapia",
      phone: "(11) 99999-3456",
      address: "Rua Nova, 321",
      lastVisit: "2024-01-07",
      status: "Inativo",
      priority: "Baixa"
    }
  ];

  const getStatusBadge = (status: string) => {
    return status === "Ativo" 
      ? <Badge className="bg-green-100 text-green-700">Ativo</Badge>
      : <Badge variant="secondary" className="bg-gray-100 text-gray-700">Inativo</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <Badge variant="destructive">Alta</Badge>;
      case "Normal":
        return <Badge variant="secondary">Normal</Badge>;
      case "Baixa":
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Gestão de Pacientes</h2>
          <p className="text-slate-600">Gerencie informações e cuidados dos pacientes</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Paciente
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Buscar pacientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filtros</Button>
              <Button variant="outline">Exportar</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-sm text-slate-500">{patient.age} anos</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{patient.condition}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{patient.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span className="text-sm">{patient.address}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-500" />
                <span className="text-sm">Última visita: {new Date(patient.lastVisit).toLocaleDateString('pt-BR')}</span>
              </div>

              <div className="flex justify-between items-center pt-3 border-t">
                <div className="flex gap-2">
                  {getStatusBadge(patient.status)}
                  {getPriorityBadge(patient.priority)}
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1">
                  Ver Perfil
                </Button>
                <Button size="sm" className="flex-1 bg-sky-600 hover:bg-sky-700">
                  Agendar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-sky-600">{patients.length}</div>
            <div className="text-sm text-slate-600">Total de Pacientes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter(p => p.status === "Ativo").length}
            </div>
            <div className="text-sm text-slate-600">Pacientes Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {patients.filter(p => p.priority === "Alta").length}
            </div>
            <div className="text-sm text-slate-600">Prioridade Alta</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Set(patients.map(p => p.condition)).size}
            </div>
            <div className="text-sm text-slate-600">Tipos de Cuidado</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
