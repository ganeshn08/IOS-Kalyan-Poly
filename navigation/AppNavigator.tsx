import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartBar } from '../components/CartBar';
import { CartScreen } from '../components/CartScreen';
import { CategoryList, type CategoryId } from '../components/CategoryList';
import { CheckoutScreen, type CustomerDetails } from '../components/CheckoutScreen';
import { HeroBanner } from '../components/HeroBanner';
import { HomeHeader } from '../components/HomeHeader';
import { OrderConfirmationScreen } from '../components/OrderConfirmationScreen';
import { ProductDetailsScreen } from '../components/ProductDetailsScreen';
import { ProductList } from '../components/ProductList';
import { ReviewOrderScreen } from '../components/ReviewOrderScreen';
import { Screen } from '../components/Screen';
import { SearchBar } from '../components/SearchBar';
import { products, type Product } from '../data/products';
import { useCart } from '../hooks/useCart';

type RootStackParamList = {
  Home: undefined;
  Product: undefined;
  Cart: undefined;
  Checkout: undefined;
  Review: undefined;
  Confirmation: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryId>('all');
  const {
    cart,
    itemCount: cartItemCount,
    total: cartTotal,
    increase: addToCart,
    decrease: removeFromCart,
    clear: clearCart,
    hasLoaded,
    loadError,
    saveError,
    retry,
  } = useCart(products);
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
  function createConfirmedOrder() {
    const order = {
      id: `KP${Date.now().toString().slice(-6)}`,
      itemCount: cartItemCount,
      total: cartTotal,
    };

    setConfirmedOrder(order);
    clearCart();
  }

  if (!hasLoaded) {
    return (
      <Screen>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 }}>
          {loadError ? (
            <>
              <Text accessibilityRole="alert">We couldn't load your saved cart. Please try again.</Text>
              <Pressable accessibilityRole="button" onPress={retry} style={{ padding: 16 }}>
                <Text>Try again</Text>
              </Pressable>
            </>
          ) : (
            <>
              <ActivityIndicator />
              <Text>Loading your cart…</Text>
            </>
          )}
        </View>
      </Screen>
    );
  }

  return (
    <View style={{ flex: 1 }}>
    <Stack.Navigator screenOptions={{ animation: 'slide_from_right', headerShown: false }}>
      <Stack.Screen name="Home">
        {({ navigation }) => (
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
                navigation.navigate('Product');
              }}
              products={visibleProducts}
              quantities={cart}
            />
            <CartBar
              itemCount={cartItemCount}
              onPress={() => navigation.navigate('Cart')}
              total={cartTotal}
            />
          </Screen>
        )}
      </Stack.Screen>

      <Stack.Screen name="Product">
        {({ navigation }) => selectedProduct ? (
          <ProductDetailsScreen
            onBack={navigation.goBack}
            onDecrease={removeFromCart}
            onIncrease={addToCart}
            onViewCart={() => navigation.navigate('Cart')}
            product={selectedProduct}
            quantity={cart[selectedProduct.id] ?? 0}
          />
        ) : null}
      </Stack.Screen>

      <Stack.Screen name="Cart">
        {({ navigation }) => (
          <CartScreen
            onBack={navigation.goBack}
            onCheckout={() => navigation.navigate('Checkout')}
            onDecrease={removeFromCart}
            onIncrease={addToCart}
            products={products}
            quantities={cart}
            total={cartTotal}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Checkout">
        {({ navigation }) => (
          <CheckoutScreen
            itemCount={cartItemCount}
            onBack={navigation.goBack}
            onReview={(details) => {
              setCustomerDetails(details);
              navigation.navigate('Review');
            }}
            total={cartTotal}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Review">
        {({ navigation }) => customerDetails ? (
          <ReviewOrderScreen
            customer={customerDetails}
            onBack={navigation.goBack}
            onPlaceOrder={() => {
              createConfirmedOrder();
              navigation.navigate('Confirmation');
            }}
            products={products}
            quantities={cart}
            total={cartTotal}
          />
        ) : null}
      </Stack.Screen>

      <Stack.Screen name="Confirmation">
        {({ navigation }) => confirmedOrder ? (
          <OrderConfirmationScreen
            itemCount={confirmedOrder.itemCount}
            onContinueShopping={() => {
              setCustomerDetails(null);
              setConfirmedOrder(null);
              navigation.popToTop();
            }}
            orderId={confirmedOrder.id}
            total={confirmedOrder.total}
          />
        ) : null}
      </Stack.Screen>
    </Stack.Navigator>
      {saveError && (
        <View style={{ backgroundColor: '#FFF1E8', padding: 20 }}>
          <Text accessibilityRole="alert">Your cart hasn't been saved on this phone. Keep the app open and try again.</Text>
          <Pressable accessibilityRole="button" onPress={retry} style={{ paddingVertical: 12 }}>
            <Text>Retry saving</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
