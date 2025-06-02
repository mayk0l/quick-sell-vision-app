
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const SalesScreen = ({ cart, addToCart, removeFromCart, onCompleteSale, onBack }) => {
  const [showCamera, setShowCamera] = useState(true);
  const [detectedProduct, setDetectedProduct] = useState(null);
  const [showQuantityDialog, setShowQuantityDialog] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [isDetecting, setIsDetecting] = useState(false);
  const videoRef = useRef(null);

  // Simulate AI detection
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

  const handleConfirmProduct = () => {
    setShowQuantityDialog(true);
  };

  const handleAddToCart = () => {
    if (detectedProduct && quantity) {
      addToCart({
        ...detectedProduct,
        quantity: parseInt(quantity),
        subtotal: detectedProduct.price * parseInt(quantity)
      });
      setDetectedProduct(null);
      setQuantity('1');
      setShowQuantityDialog(false);
    }
  };

  const handleCompleteSale = () => {
    const total = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const saleData = {
      items: cart,
      total,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString()
    };
    onCompleteSale(saleData);
  };

  if (!showCamera) {
    return (
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack} className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          <h2 className="text-xl font-semibold">Resumen de Venta</h2>
          <Button onClick={() => setShowCamera(true)} variant="ghost" className="text-blue-600">
            Volver a cámara
          </Button>
        </div>

        {/* Cart Items */}
        <Card>
          <CardContent className="p-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No hay productos en el carrito</p>
            ) : (
              <div className="space-y-3">
                {cart.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold">${item.subtotal.toLocaleString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.name)}
                        className="text-red-600 hover:bg-red-50"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Total */}
        {cart.length > 0 && (
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${cart.reduce((sum, item) => sum + item.subtotal, 0).toLocaleString()}
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Complete Sale Button */}
        {cart.length > 0 && (
          <Button
            onClick={handleCompleteSale}
            className="w-full h-14 text-lg font-semibold bg-green-600 hover:bg-green-700"
          >
            Registrar Venta
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack} className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Button>
        <h2 className="text-xl font-semibold">Agregar Producto</h2>
        <Button
          onClick={() => setShowCamera(false)}
          className="bg-red-600 hover:bg-red-700 text-sm px-3 py-1"
        >
          Ver detalle ({cart.length})
        </Button>
      </div>

      {/* Camera View */}
      <Card className="overflow-hidden">
        <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
          <div className="absolute inset-4 border-2 border-white/50 rounded-lg"></div>
          <div className="text-white text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-lg">Vista de cámara</p>
            <p className="text-sm opacity-75">Enfoca el producto en el recuadro</p>
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
            Detectando producto...
          </>
        ) : (
          'Detectar Producto'
        )}
      </Button>

      {/* Detected Product */}
      {detectedProduct && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">{detectedProduct.name}</h3>
                <p className="text-green-600">${detectedProduct.price.toLocaleString()}</p>
              </div>
              <Button
                onClick={handleConfirmProduct}
                className="bg-green-600 hover:bg-green-700"
              >
                Confirmar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quantity Dialog */}
      <Dialog open={showQuantityDialog} onOpenChange={setShowQuantityDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ingresa la cantidad</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Producto: {detectedProduct?.name}</p>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Cantidad"
                className="h-12 text-lg text-center"
                autoFocus
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowQuantityDialog(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Agregar a lista
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SalesScreen;
