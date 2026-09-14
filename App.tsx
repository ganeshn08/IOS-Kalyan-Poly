import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartBar } from './components/CartBar';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen, type CustomerDetails } from './components/CheckoutScreen';
import { CategoryList, type CategoryId } from './components/CategoryList';
import { HeroBanner } from './components/HeroBanner';
import { HomeHeader } from './components/HomeHeader';
import { OrderConfirmationScreen } from './components/OrderConfirmationScreen';
import { ProductList } from './components/ProductList';
import { ProductDetailsScreen } from './components/ProductDetailsScreen';
import { ReviewOrderScreen } from './components/ReviewOrderScreen';
import { Screen } from './components/Screen';
import { SearchBar } from './components/SearchBar';
import { products, type Product } from './data/products';

// Our first component: a function that describes what appears on the screen.
export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryId>('all');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [currentScreen, setCurrentScreen] = useState<'home' | 'product' | 'cart' | 'checkout' | 'review' | 'confirmation'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    id: string;
    itemCount: number;
    total: number;
  } | null>(null);
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });
  const cartItemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const cartTotal = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] ?? 0),
    0,
  );

  function addToCart(product: Product) {
    setCart((currentCart) => ({
      ...currentCart,
      [product.id]: (currentCart[product.id] ?? 0) + 1,
    }));
  }

  function removeFromCart(product: Product) {
    setCart((currentCart) => {
      const nextQuantity = (currentCart[product.id] ?? 0) - 1;
      const nextCart = { ...currentCart };

      if (nextQuantity <= 0) {
        delete nextCart[product.id];
      } else {
        nextCart[product.id] = nextQuantity;
      }

      return nextCart;
    });
  }

  function placeOrder() {
    setConfirmedOrder({
      id: `KP${Date.now().toString().slice(-6)}`,
      itemCount: cartItemCount,
      total: cartTotal,
    });
    setCart({});
    setCurrentScreen('confirmation');
  }

  const content = currentScreen === 'confirmation' && confirmedOrder ? (
    <OrderConfirmationScreen
      itemCount={confirmedOrder.itemCount}
      onContinueShopping={() => {
        setCustomerDetails(null);
        setConfirmedOrder(null);
        setCurrentScreen('home');
      }}
      orderId={confirmedOrder.id}
      total={confirmedOrder.total}
    />
  ) : currentScreen === 'review' && customerDetails ? (
    <ReviewOrderScreen
      customer={customerDetails}
      onBack={() => setCurrentScreen('checkout')}
      onPlaceOrder={placeOrder}
      products={products}
      quantities={cart}
      total={cartTotal}
    />
  ) : currentScreen === 'checkout' ? (
    <CheckoutScreen
      itemCount={cartItemCount}
      onBack={() => setCurrentScreen('cart')}
      onReview={(details) => {
        setCustomerDetails(details);
        setCurrentScreen('review');
      }}
      total={cartTotal}
    />
  ) : currentScreen === 'cart' ? (
    <CartScreen
      onBack={() => setCurrentScreen('home')}
      onCheckout={() => setCurrentScreen('checkout')}
      onDecrease={removeFromCart}
      onIncrease={addToCart}
      products={products}
      quantities={cart}
      total={cartTotal}
    />
  ) : currentScreen === 'product' && selectedProduct ? (
    <ProductDetailsScreen
      onBack={() => setCurrentScreen('home')}
      onDecrease={removeFromCart}
      onIncrease={addToCart}
      onViewCart={() => setCurrentScreen('cart')}
      product={selectedProduct}
      quantity={cart[selectedProduct.id] ?? 0}
    />
  ) : (
    <Screen scroll>
      <HomeHeader />
      <SearchBar value={search} onChangeText={setSearch} />
      <HeroBanner />
      <CategoryList selected={category} onSelect={setCategory} />
      <ProductList
        onDecrease={removeFromCart}
        onIncrease={addToCart}
        onOpen={(product) => {
          setSelectedProduct(product);
          setCurrentScreen('product');
        }}
        products={visibleProducts}
        quantities={cart}
      />
      <CartBar
        itemCount={cartItemCount}
        onPress={() => setCurrentScreen('cart')}
        total={cartTotal}
      />
    </Screen>
  );

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {content}
    </SafeAreaProvider>
  );
}
