
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthWrapper } from "@/components/AuthWrapper";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { PublicRoute } from "@/components/PublicRoute";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Demo from "./pages/Demo";
import Auth from "./pages/Auth";
import Pacientes from "./pages/Pacientes";
import Agendamentos from "./pages/Agendamentos";
import Financeiro from "./pages/Financeiro";
import Profissionais from "./pages/Profissionais";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Rota inicial que redireciona baseado no estado de login */}
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

            {/* Rotas protegidas */}
            <Route path="/dashboard" element={
              <AuthWrapper>
                <Layout>
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                </Layout>
              </AuthWrapper>
            } />
            
            <Route path="/pacientes" element={
              <AuthWrapper>
                <Layout>
                  <ProtectedRoute allowedRoles={['admin', 'doctor', 'caregiver']}>
                    <Pacientes />
                  </ProtectedRoute>
                </Layout>
              </AuthWrapper>
            } />
            
            <Route path="/agendamentos" element={
              <AuthWrapper>
                <Layout>
                  <ProtectedRoute allowedRoles={['admin', 'doctor', 'caregiver']}>
                    <Agendamentos />
                  </ProtectedRoute>
                </Layout>
              </AuthWrapper>
            } />
            
            <Route path="/financeiro" element={
              <AuthWrapper>
                <Layout>
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Financeiro />
                  </ProtectedRoute>
                </Layout>
              </AuthWrapper>
            } />
            
            <Route path="/profissionais" element={
              <AuthWrapper>
                <Layout>
                  <ProtectedRoute allowedRoles={['admin', 'doctor']}>
                    <Profissionais />
                  </ProtectedRoute>
                </Layout>
              </AuthWrapper>
            } />

            {/* Páginas em desenvolvimento */}
            <Route path="/relatorios" element={
              <AuthWrapper>
                <Layout>
                  <ProtectedRoute>
                    <div className="p-6">
                      <h1 className="text-3xl font-bold">Relatórios</h1>
                      <p className="text-slate-600 mt-2">Página em desenvolvimento</p>
                    </div>
                  </ProtectedRoute>
                </Layout>
              </AuthWrapper>
            } />
            
            <Route path="/analytics" element={
              <AuthWrapper>
                <Layout>
                  <ProtectedRoute>
                    <div className="p-6">
                      <h1 className="text-3xl font-bold">Analytics</h1>
                      <p className="text-slate-600 mt-2">Página em desenvolvimento</p>
                    </div>
                  </ProtectedRoute>
                </Layout>
              </AuthWrapper>
            } />
            
            <Route path="/configuracoes" element={
              <AuthWrapper>
                <Layout>
                  <ProtectedRoute>
                    <div className="p-6">
                      <h1 className="text-3xl font-bold">Configurações</h1>
                      <p className="text-slate-600 mt-2">Página em desenvolvimento</p>
                    </div>
                  </ProtectedRoute>
                </Layout>
              </AuthWrapper>
            } />

            {/* Rota catch-all para 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
