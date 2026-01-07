import { useState } from 'react';
import { ShoppingCart as CartIcon, Filter, Tag, TrendingUp } from 'lucide-react';
import { ProductCard, Product } from './components/ProductCard';
import { ShoppingCart } from './components/ShoppingCart';
import { Checkout } from './components/Checkout';

interface CartItem extends Product {
  quantity: number;
}

const PRODUCTS: Product[] = [
  // Batman Products
  {
    id: 'bat-1',
    name: 'Batman Logo T-Shirt',
    character: 'Batman',
    basePrice: 24.99,
    category: 'Apparel',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1759663175814-d274048c9e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRtYW4lMjBtZXJjaGFuZGlzZXxlbnwxfHx8fDE3Njc3NTc2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'bat-2',
    name: 'Batman Cowl Replica',
    character: 'Batman',
    basePrice: 79.99,
    category: 'Collectibles',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1759663175814-d274048c9e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRtYW4lMjBtZXJjaGFuZGlzZXxlbnwxfHx8fDE3Njc3NTc2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'bat-3',
    name: 'Batman 1:1 Batarang Replica',
    character: 'Batman',
    basePrice: 159.99,
    category: 'Collectibles',
    tier: 'premium',
    image: 'https://images.unsplash.com/photo-1759663175814-d274048c9e28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXRtYW4lMjBtZXJjaGFuZGlzZXxlbnwxfHx8fDE3Njc3NTc2ODd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },

  // Iron Man Products
  {
    id: 'iron-1',
    name: 'Iron Man Arc Reactor Keychain',
    character: 'Iron Man',
    basePrice: 12.99,
    category: 'Accessories',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1761961851693-5eead7e84a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcm9uJTIwbWFuJTIwZmlndXJlfGVufDF8fHx8MTc2Nzc1NzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    inStock: true,
  },
  {
    id: 'iron-2',
    name: 'Iron Man Mark LXXXV Action Figure',
    character: 'Iron Man',
    basePrice: 54.99,
    category: 'Toys',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1761961851693-5eead7e84a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcm9uJTIwbWFuJTIwZmlndXJlfGVufDF8fHx8MTc2Nzc1NzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'iron-3',
    name: 'Iron Man Collector\'s Helmet Replica',
    character: 'Iron Man',
    basePrice: 149.99,
    category: 'Collectibles',
    tier: 'premium',
    image: 'https://images.unsplash.com/photo-1761961851693-5eead7e84a89?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpcm9uJTIwbWFuJTIwZmlndXJlfGVufDF8fHx8MTc2Nzc1NzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },

  // Thor Products
  {
    id: 'thor-1',
    name: 'Thor Hammer Bottle Opener',
    character: 'Thor',
    basePrice: 15.99,
    category: 'Accessories',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1680744003456-ef70d02c0737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aG9yJTIwbWFydmVsfGVufDF8fHx8MTc2Nzc1NzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    inStock: true,
  },
  {
    id: 'thor-2',
    name: 'Thor Mjolnir Replica Hammer',
    character: 'Thor',
    basePrice: 89.99,
    category: 'Collectibles',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1680744003456-ef70d02c0737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aG9yJTIwbWFydmVsfGVufDF8fHx8MTc2Nzc1NzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'thor-3',
    name: 'Thor Premium Statue with LED',
    character: 'Thor',
    basePrice: 189.99,
    category: 'Collectibles',
    tier: 'premium',
    image: 'https://images.unsplash.com/photo-1680744003456-ef70d02c0737?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aG9yJTIwbWFydmVsfGVufDF8fHx8MTc2Nzc1NzY4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },

  // Captain America Products
  {
    id: 'cap-1',
    name: 'Captain America Shield Sticker Pack',
    character: 'Captain America',
    basePrice: 7.99,
    category: 'Accessories',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1576819900542-6d9f6d635cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXB0YWluJTIwYW1lcmljYSUyMHNoaWVsZHxlbnwxfHx8fDE3Njc2NzMwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    inStock: true,
  },
  {
    id: 'cap-2',
    name: 'Captain America Shield (Metal)',
    character: 'Captain America',
    basePrice: 64.99,
    category: 'Toys',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1576819900542-6d9f6d635cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXB0YWluJTIwYW1lcmljYSUyMHNoaWVsZHxlbnwxfHx8fDE3Njc2NzMwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'cap-3',
    name: 'Captain America 1:1 Shield Replica',
    character: 'Captain America',
    basePrice: 199.99,
    category: 'Collectibles',
    tier: 'premium',
    image: 'https://images.unsplash.com/photo-1576819900542-6d9f6d635cda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXB0YWluJTIwYW1lcmljYSUyMHNoaWVsZHxlbnwxfHx8fDE3Njc2NzMwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: false,
  },

  // Dr. Doom Products
  {
    id: 'doom-1',
    name: 'Dr. Doom Mask Pin',
    character: 'Dr. Doom',
    basePrice: 9.99,
    category: 'Accessories',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1759863738666-7584248cdf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2Nzc1NzY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    inStock: true,
  },
  {
    id: 'doom-2',
    name: 'Dr. Doom Action Figure Deluxe',
    character: 'Dr. Doom',
    basePrice: 44.99,
    category: 'Toys',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1759863738666-7584248cdf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21pYyUyMGJvb2slMjBjb2xsZWN0aW9ufGVufDF8fHx8MTc2Nzc1NzY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },

  // Superman Products
  {
    id: 'super-1',
    name: 'Superman Cape for Kids',
    character: 'Superman',
    basePrice: 19.99,
    category: 'Apparel',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1632218537886-cd8a6c866d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hbiUyMGxvZ298ZW58MXx8fHwxNzY3NzU3Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'super-2',
    name: 'Superman Vintage Comic Collection',
    character: 'Superman',
    basePrice: 74.99,
    category: 'Comics',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1632218537886-cd8a6c866d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hbiUyMGxvZ298ZW58MXx8fHwxNzY3NzU3Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'super-3',
    name: 'Superman Premium Bust Statue',
    character: 'Superman',
    basePrice: 174.99,
    category: 'Collectibles',
    tier: 'premium',
    image: 'https://images.unsplash.com/photo-1632218537886-cd8a6c866d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hbiUyMGxvZ298ZW58MXx8fHwxNzY3NzU3Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },

  // Spider-Man Products
  {
    id: 'spider-1',
    name: 'Spider-Man Web Shooter Toy',
    character: 'Spider-Man',
    basePrice: 22.99,
    category: 'Toys',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1726669638433-5a2fa8589bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXIlMjBtYW4lMjB0b3l8ZW58MXx8fHwxNzY3NzU3Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    inStock: true,
  },
  {
    id: 'spider-2',
    name: 'Spider-Man Limited Edition Figure',
    character: 'Spider-Man',
    basePrice: 59.99,
    category: 'Toys',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1726669638433-5a2fa8589bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXIlMjBtYW4lMjB0b3l8ZW58MXx8fHwxNzY3NzU3Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'spider-3',
    name: 'Spider-Man Life-Size Mask Display',
    character: 'Spider-Man',
    basePrice: 129.99,
    category: 'Collectibles',
    tier: 'premium',
    image: 'https://images.unsplash.com/photo-1726669638433-5a2fa8589bdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXIlMjBtYW4lMjB0b3l8ZW58MXx8fHwxNzY3NzU3Njg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },

  // Black Panther Products
  {
    id: 'panther-1',
    name: 'Black Panther Wakanda Forever Poster',
    character: 'Black Panther',
    basePrice: 14.99,
    category: 'Apparel',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1574959540245-2a2a574a0375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHBhbnRoZXIlMjBtYXJ2ZWx8ZW58MXx8fHwxNzY3NzU3Njg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'panther-2',
    name: 'Black Panther Vibranium Gauntlets',
    character: 'Black Panther',
    basePrice: 69.99,
    category: 'Toys',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1574959540245-2a2a574a0375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHBhbnRoZXIlMjBtYXJ2ZWx8ZW58MXx8fHwxNzY3NzU3Njg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'panther-3',
    name: 'Black Panther Museum Quality Statue',
    character: 'Black Panther',
    basePrice: 195.99,
    category: 'Collectibles',
    tier: 'premium',
    image: 'https://images.unsplash.com/photo-1574959540245-2a2a574a0375?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHBhbnRoZXIlMjBtYXJ2ZWx8ZW58MXx8fHwxNzY3NzU3Njg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },

  // Joker Products
  {
    id: 'joker-1',
    name: 'Joker Playing Card Deck',
    character: 'Joker',
    basePrice: 11.99,
    category: 'Accessories',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1571244112823-db09c790e924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2tlciUyMGNhcmR8ZW58MXx8fHwxNzY3NzU3NjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    inStock: true,
  },
  {
    id: 'joker-2',
    name: 'Joker Premium Action Figure',
    character: 'Joker',
    basePrice: 49.99,
    category: 'Toys',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1571244112823-db09c790e924?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2tlciUyMGNhcmR8ZW58MXx8fHwxNzY3NzU3NjkwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },

  // Flash Products
  {
    id: 'flash-1',
    name: 'Flash Lightning Bolt Mug',
    character: 'Flash',
    basePrice: 16.99,
    category: 'Accessories',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1587270613291-b5c7042fc104?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFzaCUyMHN1cGVyaGVyb3xlbnwxfHx8fDE3Njc3NTc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4,
    inStock: true,
  },
  {
    id: 'flash-2',
    name: 'Flash Speedster Suit Hoodie',
    character: 'Flash',
    basePrice: 54.99,
    category: 'Apparel',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1587270613291-b5c7042fc104?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFzaCUyMHN1cGVyaGVyb3xlbnwxfHx8fDE3Njc3NTc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'flash-3',
    name: 'Flash Museum Edition Helmet',
    character: 'Flash',
    basePrice: 139.99,
    category: 'Collectibles',
    tier: 'premium',
    image: 'https://images.unsplash.com/photo-1587270613291-b5c7042fc104?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFzaCUyMHN1cGVyaGVyb3xlbnwxfHx8fDE3Njc3NTc2OTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },

  // Wonder Woman Products
  {
    id: 'wonder-1',
    name: 'Wonder Woman Tiara Headband',
    character: 'Wonder Woman',
    basePrice: 18.99,
    category: 'Accessories',
    tier: 'budget',
    image: 'https://images.unsplash.com/photo-1634828221818-503587f33d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b25kZXIlMjB3b21hbiUyMGNvbWljfGVufDF8fHx8MTc2Nzc1NzY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'wonder-2',
    name: 'Wonder Woman Lasso of Truth Replica',
    character: 'Wonder Woman',
    basePrice: 84.99,
    category: 'Collectibles',
    tier: 'mid-range',
    image: 'https://images.unsplash.com/photo-1634828221818-503587f33d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b25kZXIlMjB3b21hbiUyMGNvbWljfGVufDF8fHx8MTc2Nzc1NzY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
  {
    id: 'wonder-3',
    name: 'Wonder Woman Premium Armor Display',
    character: 'Wonder Woman',
    basePrice: 199.99,
    category: 'Collectibles',
    tier: 'premium',
    image: 'https://images.unsplash.com/photo-1634828221818-503587f33d02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b25kZXIlMjB3b21hbiUyMGNvbWljfGVufDF8fHx8MTc2Nzc1NzY5MHww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5,
    inStock: true,
  },
];

const CHARACTERS = [
  'All',
  'Batman',
  'Iron Man',
  'Thor',
  'Captain America',
  'Dr. Doom',
  'Superman',
  'Spider-Man',
  'Black Panther',
  'Joker',
  'Flash',
  'Wonder Woman',
];

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const filteredProducts =
    selectedCharacter === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.character === selectedCharacter);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white sticky top-0 z-30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">⚡ Hero Merch</h1>
              <p className="text-sm text-blue-200 mt-1">Your Ultimate Superhero Store</p>
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white/10 hover:bg-white/20 backdrop-blur px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <CartIcon className="w-5 h-5" />
              <span>Cart</span>
              {cartTotal > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartTotal}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full">
              <Tag className="w-5 h-5 text-orange-600" />
              <span className="font-bold text-gray-800">10% OFF orders over $50</span>
            </div>
            <div className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <span className="font-bold text-gray-800">20% OFF orders over $100</span>
            </div>
            <div className="text-white font-semibold">
              🎁 FREE Shipping on all orders!
            </div>
          </div>
        </div>
      </div>

      {/* Character Filter */}
      <div className="bg-white border-b sticky top-[72px] z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="font-semibold text-gray-800">Filter by Character:</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CHARACTERS.map((character) => (
              <button
                key={character}
                onClick={() => setSelectedCharacter(character)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCharacter === character
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {character}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCharacter === 'All' ? 'All Products' : `${selectedCharacter} Merchandise`}
          </h2>
          <p className="text-gray-600 mt-1">
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4">⚡ Hero Merch</h3>
              <p className="text-gray-400 text-sm">
                Your trusted source for authentic superhero merchandise and collectibles.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                <div className="bg-gray-800 px-3 py-2 rounded text-sm">💳 Visa</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-sm">💳 Mastercard</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-sm">💰 PayPal</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-sm"> Apple Pay</div>
                <div className="bg-gray-800 px-3 py-2 rounded text-sm">🌐 Google Pay</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Discount Tiers</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>💰 Budget: $5 - $30</p>
                <p>⭐ Mid-Range: $30 - $100</p>
                <p>👑 Premium: $100 - $200</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2026 Hero Merch. All rights reserved. Secure payments guaranteed.</p>
          </div>
        </div>
      </footer>

      {/* Shopping Cart */}
      <ShoppingCart
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Checkout */}
      <Checkout
        cartItems={cartItems}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
