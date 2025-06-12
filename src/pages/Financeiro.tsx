
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Plus, 
  Search, 
  Filter,
  Download,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: string;
  status: 'pago' | 'pendente' | 'vencido';
  paciente?: string;
}

export default function Financeiro() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const transacoes: Transacao[] = [
    {
      id: '1',
      descricao: 'Consulta Médica - Maria Santos',
      valor: 250.00,
      tipo: 'receita',
      categoria: 'Consultas',
      data: '2024-06-10',
      status: 'pago',
      paciente: 'Maria Santos'
    },
    {
      id: '2',
      descricao: 'Salário - Dr. João Silva',
      valor: 8500.00,
      tipo: 'despesa',
      categoria: 'Folha de Pagamento',
      data: '2024-06-01',
      status: 'pago'
    },
    {
      id: '3',
      descricao: 'Cuidados Domiciliares - Carlos Oliveira',
      valor: 180.00,
      tipo: 'receita',
      categoria: 'Cuidados',
      data: '2024-06-12',
      status: 'pendente',
      paciente: 'Carlos Oliveira'
    },
    {
      id: '4',
      descricao: 'Material Médico',
      valor: 350.00,
      tipo: 'despesa',
      categoria: 'Materiais',
      data: '2024-06-08',
      status: 'pago'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pago: { color: 'bg-green-100 text-green-700', label: 'Pago' },
      pendente: { color: 'bg-yellow-100 text-yellow-700', label: 'Pendente' },
      vencido: { color: 'bg-red-100 text-red-700', label: 'Vencido' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const totalReceitas = transacoes
    .filter(t => t.tipo === 'receita' && t.status === 'pago')
    .reduce((sum, t) => sum + t.valor, 0);

  const totalDespesas = transacoes
    .filter(t => t.tipo === 'despesa' && t.status === 'pago')
    .reduce((sum, t) => sum + t.valor, 0);

  const saldoLiquido = totalReceitas - totalDespesas;

  const filteredTransacoes = transacoes.filter(
    transacao =>
      transacao.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transacao.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Financeiro</h1>
        <p className="text-slate-600 mt-2">Controle financeiro completo da sua empresa</p>
      </div>

      {/* Métricas Financeiras */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Receitas
            </CardTitle>
            <ArrowUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalReceitas)}</div>
            <p className="text-xs text-green-600 mt-1">+15% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Despesas
            </CardTitle>
            <ArrowDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{formatCurrency(totalDespesas)}</div>
            <p className="text-xs text-red-600 mt-1">+5% vs mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Saldo Líquido
            </CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldoLiquido >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(saldoLiquido)}
            </div>
            <p className="text-xs text-blue-600 mt-1">Lucro do mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Contas Pendentes
            </CardTitle>
            <CreditCard className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formatCurrency(
                transacoes
                  .filter(t => t.status === 'pendente')
                  .reduce((sum, t) => sum + t.valor, 0)
              )}
            </div>
            <p className="text-xs text-yellow-600 mt-1">3 faturas pendentes</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Fluxo de Caixa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Fluxo de Caixa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-800">Receitas Mensais</span>
                <span className="font-bold text-green-600">{formatCurrency(totalReceitas)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium text-red-800">Despesas Mensais</span>
                <span className="font-bold text-red-600">{formatCurrency(totalDespesas)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium text-blue-800">Margem de Lucro</span>
                <span className="font-bold text-blue-600">
                  {((saldoLiquido / totalReceitas) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              Principais Categorias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Consultas</span>
                <span className="font-medium">{formatCurrency(250)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Cuidados</span>
                <span className="font-medium">{formatCurrency(180)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Materiais</span>
                <span className="font-medium">{formatCurrency(350)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Folha de Pagamento</span>
                <span className="font-medium">{formatCurrency(8500)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controles */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Transação
        </Button>
      </div>

      {/* Tabela de Transações */}
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransacoes.map((transacao) => (
                <TableRow key={transacao.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p className="font-semibold">{transacao.descricao}</p>
                      {transacao.paciente && (
                        <p className="text-sm text-slate-500">{transacao.paciente}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transacao.categoria}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {transacao.tipo === 'receita' ? (
                        <ArrowUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`capitalize ${transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                        {transacao.tipo}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`font-bold ${transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(transacao.valor)}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(transacao.data).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{getStatusBadge(transacao.status)}</TableCell>
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
