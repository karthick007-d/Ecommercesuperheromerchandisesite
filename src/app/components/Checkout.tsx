import { useState } from 'react';
import { X, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { Product } from './ProductCard';

interface CartItem extends Product {
  quantity: number;
}

interface CheckoutProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: () => void;
}

export function Checkout({ cartItems, isOpen, onClose, onOrderComplete }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    address: '',
    city: '',
    zipCode: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.basePrice * item.quantity, 0);
  const discountRate = subtotal >= 100 ? 0.2 : subtotal >= 50 ? 0.1 : 0;
  const discountAmount = subtotal * discountRate;
  const total = subtotal - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    setTimeout(() => {
      onOrderComplete();
      setOrderPlaced(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  if (orderPlaced) {
    return (
      <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <div className="mb-4">
              <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="text-sm text-gray-500">
              Order Total: <span className="font-bold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
        <div className="min-h-full flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">Secure Checkout</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Left Column - Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="font-semibold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div>
                  <h3 className="font-semibold mb-4">Shipping Address</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Street Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="font-semibold mb-4">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                        paymentMethod === 'card'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      💳 Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                        paymentMethod === 'paypal'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      PayPal
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple')}
                      className={`p-3 border-2 rounded-lg text-sm font-medium transition-colors ${
                        paymentMethod === 'apple'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Apple Pay
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        required
                        maxLength={19}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                          required
                          maxLength={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                          required
                          maxLength={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Badge */}
                <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                  <Lock className="w-5 h-5 text-green-600" />
                  <div className="text-sm">
                    <div className="font-medium">Secure Payment</div>
                    <div className="text-gray-500">Your payment information is encrypted and secure</div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Complete Order - ${total.toFixed(2)}
                </button>
              </form>

              {/* Right Column - Order Summary */}
              <div>
                <h3 className="font-semibold mb-4">Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.character}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                            <span className="font-medium">
                              ${(item.basePrice * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
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
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping:</span>
                      <span className="text-green-600">FREE</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold pt-2 border-t">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Accepted Payment Methods */}
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-2">We accept:</p>
                    <div className="flex gap-2">
                      <div className="bg-white px-3 py-2 rounded border text-xs font-medium">
                        💳 Visa
                      </div>
                      <div className="bg-white px-3 py-2 rounded border text-xs font-medium">
                        💳 Mastercard
                      </div>
                      <div className="bg-white px-3 py-2 rounded border text-xs font-medium">
                        💰 PayPal
                      </div>
                      <div className="bg-white px-3 py-2 rounded border text-xs font-medium">
                         Apple Pay
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
