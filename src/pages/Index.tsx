
import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboard } from "@/components/dashboards/AdminDashboard";
import { DoctorDashboard } from "@/components/dashboards/DoctorDashboard";
import { CaregiverDashboard } from "@/components/dashboards/CaregiverDashboard";
import { PatientDashboard } from "@/components/dashboards/PatientDashboard";

const Index = () => {
  console.log('Index component rendering...');
  const { user } = useAuth();

  console.log('User in Index:', user);

  if (!user) {
    console.log('No user in Index, this should not happen');
    return null;
  }

  console.log('Rendering dashboard for role:', user.role);

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
      console.log('Unknown role, defaulting to AdminDashboard');
      return <AdminDashboard />;
  }
};

export default Index;
