
import { useState } from 'react';
import SalesScreen from './SalesScreen';
import PriceCheck from './PriceCheck';
import CashRegister from './CashRegister';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const WorkerDashboard = ({ currentView, setCurrentView }) => {
  const [cart, setCart] = useState([]);
  const [dailySales, setDailySales] = useState([]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.name === product.name);
      if (existingItem) {
        return prev.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  };

  const removeFromCart = (productName) => {
    setCart(prev => prev.filter(item => item.name !== productName));
  };

  const completeSale = (saleData) => {
    setDailySales(prev => [...prev, saleData]);
    setCart([]);
    setCurrentView('main');
  };

  if (currentView === 'sales') {
    return (
      <SalesScreen
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        onCompleteSale={completeSale}
        onBack={() => setCurrentView('main')}
      />
    );
  }

  if (currentView === 'price-check') {
    return <PriceCheck onBack={() => setCurrentView('main')} />;
  }

  if (currentView === 'cash-register') {
    return (
      <CashRegister
        dailySales={dailySales}
        onBack={() => setCurrentView('main')}
      />
    );
  }

  const todayTotal = dailySales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="space-y-6">
      {/* Stats Card */}
      <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Ventas de hoy</p>
              <p className="text-3xl font-bold">${todayTotal.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Actions */}
      <div className="grid grid-cols-1 gap-4">
        <Button
          onClick={() => setCurrentView('sales')}
          className="h-20 text-lg font-semibold bg-blue-600 hover:bg-blue-700 shadow-lg"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Registrar Venta</span>
          </div>
        </Button>

        <Button
          onClick={() => setCurrentView('price-check')}
          variant="outline"
          className="h-16 text-lg font-medium border-2 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span>Consultar Precio</span>
          </div>
        </Button>

        <Button
          onClick={() => setCurrentView('cash-register')}
          variant="outline"
          className="h-16 text-lg font-medium border-2 hover:bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>Cuadrar Caja</span>
          </div>
        </Button>
      </div>

      {/* Recent Sales Summary */}
      {dailySales.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Últimas ventas</h3>
            <div className="space-y-2">
              {dailySales.slice(-3).map((sale, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-600">{sale.time}</span>
                  <span className="font-medium">${sale.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkerDashboard;
