import { useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Product } from '../data/products';

const CART_STORAGE_KEY = 'kalyan-polymers-cart';

export function useCart(products: Product[]) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const saveQueue = useRef(Promise.resolve());

  useEffect(() => {
    if (hasLoaded) return;
    let active = true;
    async function loadCart() {
      setLoadError(false);
      try {
        const savedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
        const parsed: unknown = savedCart === null ? {} : JSON.parse(savedCart);
        if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
          throw new Error('Invalid saved cart');
        }
        const restored: Record<string, number> = {};
        for (const product of products) {
          const quantity = (parsed as Record<string, unknown>)[product.id];
          if (typeof quantity === 'number' && Number.isSafeInteger(quantity) && quantity > 0) {
            restored[product.id] = quantity;
          }
        }
        if (!active) return;
        setCart(restored);
        setHasLoaded(true);
      } catch {
        if (active) setLoadError(true);
      }
    }

    loadCart();
    return () => { active = false; };
  }, [products, hasLoaded, retryCount]);

  useEffect(() => {
    if (!hasLoaded) return;
    let active = true;
    // Preserve write order so a slower old save cannot replace a newer cart.
    saveQueue.current = saveQueue.current.then(async () => {
      try {
        await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        if (active) setSaveError(false);
      } catch {
        if (active) setSaveError(true);
      }
    });
    return () => { active = false; };
  }, [cart, hasLoaded, retryCount]);

  const itemCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const total = products.reduce(
    (sum, product) => sum + product.price * (cart[product.id] ?? 0),
    0,
  );

  function increase(product: Product) {
    if (!hasLoaded) return;
    setCart((currentCart) => ({
      ...currentCart,
      [product.id]: (currentCart[product.id] ?? 0) + 1,
    }));
  }

  function decrease(product: Product) {
    if (!hasLoaded) return;
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

  function clear() {
    if (!hasLoaded) return;
    setCart({});
  }

  function retry() {
    setRetryCount((count) => count + 1);
  }

  return { cart, itemCount, total, increase, decrease, clear, hasLoaded, loadError, saveError, retry };
}
