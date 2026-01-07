import { X, Minus, Plus, ShoppingBag, Percent } from 'lucide-react';
import { Product } from './ProductCard';

interface CartItem extends Product {
  quantity: number;
}

interface ShoppingCartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ShoppingCart({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  isOpen,
  onClose,
}: ShoppingCartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.basePrice * item.quantity, 0);
  
  const discountRate = subtotal >= 100 ? 0.2 : subtotal >= 50 ? 0.1 : 0;
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6" />
            <h2 className="text-xl font-bold">Shopping Cart ({cartItems.length})</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{item.character}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold">${item.basePrice.toFixed(2)}</div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded h-fit"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Pricing */}
        {cartItems.length > 0 && (
          <div className="border-t p-6 space-y-4">
            {/* Discount Banner */}
            {discountRate > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                <Percent className="w-5 h-5 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  {discountRate === 0.2 ? '20%' : '10%'} discount applied!
                </span>
              </div>
            )}
            
            {/* Pricing Breakdown */}
            <div className="space-y-2">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discountRate * 100}%):</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold pt-2 border-t">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Discount Progress */}
            {subtotal < 100 && (
              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                {subtotal < 50 ? (
                  <p>💡 Add ${(50 - subtotal).toFixed(2)} more for 10% off!</p>
                ) : (
                  <p>💡 Add ${(100 - subtotal).toFixed(2)} more for 20% off!</p>
                )}
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
