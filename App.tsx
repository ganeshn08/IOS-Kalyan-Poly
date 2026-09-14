import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CategoryList, type CategoryId } from './components/CategoryList';
import { HeroBanner } from './components/HeroBanner';
import { HomeHeader } from './components/HomeHeader';
import { ProductList } from './components/ProductList';
import { Screen } from './components/Screen';
import { SearchBar } from './components/SearchBar';
import { products } from './data/products';

// Our first component: a function that describes what appears on the screen.
export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryId>('all');
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category;
    const matchesSearch = product.name.toLowerCase().includes(search.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Screen scroll>
        <HomeHeader />
        <SearchBar value={search} onChangeText={setSearch} />
        <HeroBanner />
        <CategoryList selected={category} onSelect={setCategory} />
        <ProductList products={visibleProducts} />
      </Screen>
    </SafeAreaProvider>
  );
}
