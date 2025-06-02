
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CashRegister = ({ dailySales, onBack }) => {
  const [cashCount, setCashCount] = useState('');
  const [transbankTotal, setTransbankTotal] = useState('');
  const [observations, setObservations] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const salesTotal = dailySales.reduce((sum, sale) => sum + sale.total, 0);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Cierre de caja guardado exitosamente');
      onBack();
    }, 1500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <h2 className="text-xl font-semibold">Cuadrar Caja</h2>
        <div></div>
      </div>

      {/* Sales Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resumen del día</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Total de ventas registradas:</span>
            <span className="text-xl font-bold text-blue-600">
              ${salesTotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600">Número de transacciones:</span>
            <span className="font-semibold">{dailySales.length}</span>
          </div>
        </CardContent>
      </Card>

      {/* Cash Count Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Conteo de caja</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total dinero en efectivo
            </label>
            <Input
              type="number"
              value={cashCount}
              onChange={(e) => setCashCount(e.target.value)}
              placeholder="0"
              className="h-12 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total ventas Transbank
            </label>
            <Input
              type="number"
              value={transbankTotal}
              onChange={(e) => setTransbankTotal(e.target.value)}
              placeholder="0"
              className="h-12 text-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Observaciones
            </label>
            <Textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              placeholder="Notas adicionales sobre el cierre de caja..."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Difference Calculation */}
      {(cashCount || transbankTotal) && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Efectivo contado:</span>
                <span>${(parseInt(cashCount) || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Transbank:</span>
                <span>${(parseInt(transbankTotal) || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Total contado:</span>
                <span className="font-bold">
                  ${((parseInt(cashCount) || 0) + (parseInt(transbankTotal) || 0)).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total sistema:</span>
                <span className="font-bold">${salesTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-bold">Diferencia:</span>
                <span className={`font-bold ${
                  ((parseInt(cashCount) || 0) + (parseInt(transbankTotal) || 0)) - salesTotal === 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  ${(((parseInt(cashCount) || 0) + (parseInt(transbankTotal) || 0)) - salesTotal).toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || !cashCount}
        className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Guardando cierre...
          </>
        ) : (
          'Guardar Cierre de Caja'
        )}
      </Button>
    </div>
  );
};

export default CashRegister;
