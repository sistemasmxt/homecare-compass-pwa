
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Plus, Search, TrendingUp, TrendingDown, Edit, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: 'receita' | 'despesa';
  categoria: string;
  data: string;
  status: 'pago' | 'pendente' | 'vencido';
}

const mockTransacoes: Transacao[] = [
  {
    id: '1',
    descricao: 'Consulta - Maria Silva',
    valor: 250.00,
    tipo: 'receita',
    categoria: 'Consultas',
    data: '2024-01-15',
    status: 'pago'
  },
  {
    id: '2',
    descricao: 'Aluguel da clínica',
    valor: 3500.00,
    tipo: 'despesa',
    categoria: 'Infraestrutura',
    data: '2024-01-10',
    status: 'pago'
  },
  {
    id: '3',
    descricao: 'Home Care - José Santos',
    valor: 800.00,
    tipo: 'receita',
    categoria: 'Home Care',
    data: '2024-01-20',
    status: 'pendente'
  }
];

export default function Financeiro() {
  const [transacoes, setTransacoes] = useState<Transacao[]>(mockTransacoes);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTransacao, setEditingTransacao] = useState<Transacao | null>(null);
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    tipo: 'receita' as const,
    categoria: '',
    data: '',
    status: 'pendente' as const
  });

  const filteredTransacoes = transacoes.filter(transacao =>
    transacao.descricao.toLowerCase().includes(search.toLowerCase()) ||
    transacao.categoria.toLowerCase().includes(search.toLowerCase())
  );

  const totalReceitas = transacoes
    .filter(t => t.tipo === 'receita' && t.status === 'pago')
    .reduce((sum, t) => sum + t.valor, 0);

  const totalDespesas = transacoes
    .filter(t => t.tipo === 'despesa' && t.status === 'pago')
    .reduce((sum, t) => sum + t.valor, 0);

  const saldo = totalReceitas - totalDespesas;

  const handleSubmit = () => {
    if (editingTransacao) {
      setTransacoes(prev => prev.map(transacao =>
        transacao.id === editingTransacao.id
          ? { ...transacao, ...formData, valor: parseFloat(formData.valor) }
          : transacao
      ));
    } else {
      const newTransacao: Transacao = {
        id: Date.now().toString(),
        ...formData,
        valor: parseFloat(formData.valor)
      };
      setTransacoes(prev => [...prev, newTransacao]);
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (transacao: Transacao) => {
    setEditingTransacao(transacao);
    setFormData({
      descricao: transacao.descricao,
      valor: transacao.valor.toString(),
      tipo: transacao.tipo,
      categoria: transacao.categoria,
      data: transacao.data,
      status: transacao.status
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTransacoes(prev => prev.filter(transacao => transacao.id !== id));
  };

  const resetForm = () => {
    setFormData({
      descricao: '',
      valor: '',
      tipo: 'receita',
      categoria: '',
      data: '',
      status: 'pendente'
    });
    setEditingTransacao(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pago': return 'bg-green-100 text-green-800';
      case 'pendente': return 'bg-yellow-100 text-yellow-800';
      case 'vencido': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Financeiro</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Nova Transação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingTransacao ? 'Editar Transação' : 'Nova Transação'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="descricao">Descrição</Label>
                <Input
                  id="descricao"
                  value={formData.descricao}
                  onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                  placeholder="Descrição da transação"
                />
              </div>
              <div>
                <Label htmlFor="valor">Valor</Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({...formData, valor: e.target.value})}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value: any) => setFormData({...formData, tipo: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="receita">Receita</SelectItem>
                    <SelectItem value="despesa">Despesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="categoria">Categoria</Label>
                <Input
                  id="categoria"
                  value={formData.categoria}
                  onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                  placeholder="Ex: Consultas, Infraestrutura"
                />
              </div>
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
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pago">Pago</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="vencido">Vencido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {editingTransacao ? 'Atualizar' : 'Criar'} Transação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receitas</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {totalReceitas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Despesas</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar transações..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredTransacoes.map((transacao) => (
          <Card key={transacao.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    transacao.tipo === 'receita' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {transacao.tipo === 'receita' ? (
                      <TrendingUp className="h-6 w-6 text-green-600" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{transacao.descricao}</h3>
                    <p className="text-sm text-slate-600">{transacao.categoria}</p>
                    <p className="text-sm text-slate-600">{transacao.data}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      transacao.tipo === 'receita' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transacao.tipo === 'receita' ? '+' : '-'} R$ {transacao.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <Badge className={getStatusColor(transacao.status)}>
                      {transacao.status}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(transacao)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(transacao.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTransacoes.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhuma transação encontrada
            </h3>
            <p className="text-gray-500">
              {search ? 'Tente ajustar sua busca' : 'Clique em "Nova Transação" para começar'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
