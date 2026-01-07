import { ShoppingCart, Star } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  character: string;
  basePrice: number;
  category: string;
  tier: 'budget' | 'mid-range' | 'premium';
  image: string;
  rating: number;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-semibold">
          {product.tier === 'budget' && '💰 Budget'}
          {product.tier === 'mid-range' && '⭐ Mid-Range'}
          {product.tier === 'premium' && '👑 Premium'}
        </div>
      </div>
      
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.character}</div>
        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.rating}.0)</span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-gray-900">
            ${product.basePrice.toFixed(2)}
          </div>
          {product.inStock ? (
            <span className="text-xs text-green-600 font-medium">In Stock</span>
          ) : (
            <span className="text-xs text-red-600 font-medium">Out of Stock</span>
          )}
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            product.inStock
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
