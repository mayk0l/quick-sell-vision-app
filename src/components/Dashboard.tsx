
import { useState } from 'react';
import WorkerDashboard from './WorkerDashboard';
import AdminDashboard from './AdminDashboard';
import { Button } from '@/components/ui/button';

const Dashboard = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('main');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                {user.role === 'admin' ? 'Panel Admin' : 'Punto de Venta'}
              </h1>
              <p className="text-sm text-gray-500">{user.name}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onLogout}
            className="text-gray-600"
          >
            Salir
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {user.role === 'admin' ? (
          <AdminDashboard currentView={currentView} setCurrentView={setCurrentView} />
        ) : (
          <WorkerDashboard currentView={currentView} setCurrentView={setCurrentView} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
