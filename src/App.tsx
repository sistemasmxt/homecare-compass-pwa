
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicRoute } from "@/components/PublicRoute";
import { Layout } from "./components/Layout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Demo from "./pages/Demo";
import Auth from "./pages/Auth";
import Pacientes from "./pages/Pacientes";
import Agendamentos from "./pages/Agendamentos";
import Financeiro from "./pages/Financeiro";
import Profissionais from "./pages/Profissionais";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log('App component rendering...');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                {/* Rota inicial */}
                <Route path="/" element={<Home />} />
                
                {/* Rotas públicas */}
                <Route path="/landing" element={
                  <PublicRoute>
                    <Landing />
                  </PublicRoute>
                } />
                <Route path="/demo" element={<Demo />} />
                <Route path="/auth" element={
                  <PublicRoute>
                    <Auth />
                  </PublicRoute>
                } />

                {/* Rotas protegidas com layout */}
                <Route path="/pacientes" element={
                  <ProtectedRoute allowedRoles={['admin', 'doctor', 'caregiver']}>
                    <Layout>
                      <Pacientes />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/agendamentos" element={
                  <ProtectedRoute allowedRoles={['admin', 'doctor', 'caregiver']}>
                    <Layout>
                      <Agendamentos />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/financeiro" element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Layout>
                      <Financeiro />
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/profissionais" element={
                  <ProtectedRoute allowedRoles={['admin', 'doctor']}>
                    <Layout>
                      <Profissionais />
                    </Layout>
                  </ProtectedRoute>
                } />

                {/* Páginas em desenvolvimento */}
                <Route path="/relatorios" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-3xl font-bold">Relatórios</h1>
                        <p className="text-slate-600 mt-2">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/analytics" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-3xl font-bold">Analytics</h1>
                        <p className="text-slate-600 mt-2">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />
                
                <Route path="/configuracoes" element={
                  <ProtectedRoute>
                    <Layout>
                      <div className="p-6">
                        <h1 className="text-3xl font-bold">Configurações</h1>
                        <p className="text-slate-600 mt-2">Página em desenvolvimento</p>
                      </div>
                    </Layout>
                  </ProtectedRoute>
                } />

                {/* Rota catch-all para 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
