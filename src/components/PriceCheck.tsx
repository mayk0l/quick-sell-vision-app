
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PriceCheck = ({ onBack }) => {
  const [detectedProduct, setDetectedProduct] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);

  const simulateDetection = () => {
    setIsDetecting(true);
    setTimeout(() => {
      const products = [
        { name: 'Coca-Cola 350ml', price: 1200 },
        { name: 'Pan de molde', price: 2500 },
        { name: 'Leche descremada 1L', price: 1800 },
        { name: 'Yogurt natural', price: 800 },
        { name: 'Manzanas rojas kg', price: 2200 }
      ];
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      setDetectedProduct(randomProduct);
      setIsDetecting(false);
    }, 2000);
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
        <h2 className="text-xl font-semibold">Consultar Precio</h2>
        <div></div>
      </div>

      {/* Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-blue-800 text-sm">
              Solo consulta - no se registra venta
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Camera View */}
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
          <div className="absolute inset-4 border-2 border-white/50 rounded-lg"></div>
          <div className="text-white text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <p className="text-lg">Consulta de precio</p>
            <p className="text-sm opacity-75">Enfoca el producto para ver su precio</p>
          </div>
        </div>
      </Card>

      {/* Detection Button */}
      <Button
        onClick={simulateDetection}
        disabled={isDetecting}
        className="w-full h-14 text-lg font-semibold"
      >
        {isDetecting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Consultando precio...
          </>
        ) : (
          'Consultar Precio'
        )}
      </Button>

      {/* Price Result */}
      {detectedProduct && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-green-800 mb-2">
              {detectedProduct.name}
            </h3>
            <div className="text-4xl font-bold text-green-600 mb-4">
              ${detectedProduct.price.toLocaleString()}
            </div>
            <Button
              onClick={() => setDetectedProduct(null)}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Nueva consulta
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PriceCheck;
