
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const SalesHistory = ({ salesData, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [expandedSales, setExpandedSales] = useState(new Set());

  const filteredSales = salesData.filter(sale => {
    const matchesSearch = !searchTerm || 
      sale.worker.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || sale.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  const toggleExpanded = (saleId) => {
    const newExpanded = new Set(expandedSales);
    if (newExpanded.has(saleId)) {
      newExpanded.delete(saleId);
    } else {
      newExpanded.add(saleId);
    }
    setExpandedSales(newExpanded);
  };

  const totalSales = filteredSales.reduce((sum, sale) => sum + sale.total, 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <h2 className="text-xl font-semibold">Historial de Ventas</h2>
        <Button variant="ghost" className="text-blue-600">
          Exportar
        </Button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3">
        <Input
          type="text"
          placeholder="Buscar trabajador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-10"
        />
        <Input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="h-10"
        />
      </div>

      {/* Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-blue-800">Total ventas ({filteredSales.length}):</span>
            <span className="text-xl font-bold text-blue-600">
              ${totalSales.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Sales List */}
      <div className="space-y-3">
        {filteredSales.map((sale) => (
          <Collapsible key={sale.id}>
            <Card>
              <CollapsibleTrigger asChild>
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpanded(sale.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{sale.worker}</p>
                      <p className="text-sm text-gray-500">{sale.date} - {sale.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${sale.total.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{sale.items.length} producto{sale.items.length > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Detalle de productos:</h4>
                    <div className="space-y-2">
                      {sale.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 bg-gray-50 px-3 rounded">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              ${item.price.toLocaleString()} x {item.quantity}
                            </p>
                          </div>
                          <span className="font-semibold">${item.subtotal.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      {filteredSales.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-gray-500">No se encontraron ventas</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalesHistory;
