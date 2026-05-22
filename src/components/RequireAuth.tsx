import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-heading">Loading...</p>
      </div>
    );
  }
  if (!user) return <Navigate to="/blog/auth" replace />;
  return <>{children}</>;
};

export default RequireAuth;
