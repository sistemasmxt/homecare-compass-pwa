
import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { DoctorDashboard } from "@/components/dashboards/DoctorDashboard";
import { CaregiverDashboard } from "@/components/dashboards/CaregiverDashboard";
import { PatientDashboard } from "@/components/dashboards/PatientDashboard";

const Index = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'caregiver':
      return <CaregiverDashboard />;
    case 'patient':
      return <PatientDashboard />;
    default:
      return <AdminDashboard />;
  }
};

export default Index;
