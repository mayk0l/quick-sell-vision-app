
import { useState } from 'react';
import SalesHistory from './SalesHistory';
import StockAlerts from './StockAlerts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const AdminDashboard = ({ currentView, setCurrentView }) => {
  // Mock data
  const [salesData] = useState([
    {
      id: 1,
      date: '2024-06-02',
      time: '10:30',
      worker: 'Trabajador A',
      total: 15600,
      items: [
        { name: 'Coca-Cola 350ml', quantity: 2, price: 1200, subtotal: 2400 },
        { name: 'Pan de molde', quantity: 1, price: 2500, subtotal: 2500 }
      ]
    },
    {
      id: 2,
      date: '2024-06-02',
      time: '11:15',
      worker: 'Trabajador B',
      total: 8900,
      items: [
        { name: 'Leche descremada 1L', quantity: 2, price: 1800, subtotal: 3600 },
        { name: 'Yogurt natural', quantity: 3, price: 800, subtotal: 2400 }
      ]
    }
  ]);

  const [stockAlerts] = useState([
    { name: 'Coca-Cola 350ml', currentStock: 3, minStock: 5, alertSent: true },
    { name: 'Pan de molde', currentStock: 2, minStock: 5, alertSent: false },
    { name: 'Yogurt natural', currentStock: 1, minStock: 5, alertSent: true }
  ]);

  if (currentView === 'sales-history') {
    return <SalesHistory salesData={salesData} onBack={() => setCurrentView('main')} />;
  }

  if (currentView === 'stock-alerts') {
    return <StockAlerts stockAlerts={stockAlerts} onBack={() => setCurrentView('main')} />;
  }

  const todayTotal = salesData
    .filter(sale => sale.date === '2024-06-02')
    .reduce((sum, sale) => sum + sale.total, 0);

  const pendingAlerts = stockAlerts.filter(item => !item.alertSent).length;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-blue-100 text-sm">Ventas hoy</p>
              <p className="text-2xl font-bold">${todayTotal.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-red-100 text-sm">Stock bajo</p>
              <p className="text-2xl font-bold">{stockAlerts.length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Alerts */}
      {pendingAlerts > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-orange-800 font-medium">
                {pendingAlerts} producto{pendingAlerts > 1 ? 's' : ''} con stock bajo pendiente{pendingAlerts > 1 ? 's' : ''} de alerta
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Actions */}
      <div className="grid grid-cols-1 gap-4">
        <Button
          onClick={() => setCurrentView('sales-history')}
          variant="outline"
          className="h-16 text-lg font-medium border-2 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span>Historial de Ventas</span>
          </div>
        </Button>

        <Button
          onClick={() => setCurrentView('stock-alerts')}
          variant="outline"
          className="h-16 text-lg font-medium border-2 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span>Alertas de Stock</span>
          </div>
        </Button>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Actividad reciente</h3>
          <div className="space-y-3">
            {salesData.slice(-3).map((sale) => (
              <div key={sale.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium">{sale.worker}</p>
                  <p className="text-sm text-gray-500">{sale.time}</p>
                </div>
                <span className="font-semibold">${sale.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
