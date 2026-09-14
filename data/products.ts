export type ProductCategory = 'drip' | 'pipes' | 'fittings';

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  thicknessMm: number;
  coilLengthM: number;
  price: number;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: 'finolex-f04',
    name: 'Drip Irrigation Pipe F04',
    brand: 'Finolex',
    category: 'drip',
    thicknessMm: 0.4,
    coilLengthM: 1000,
    price: 4800,
    inStock: true,
  },
  {
    id: 'finolex-f03',
    name: 'Drip Irrigation Pipe F03',
    brand: 'Finolex',
    category: 'drip',
    thicknessMm: 0.3,
    coilLengthM: 1500,
    price: 5500,
    inStock: true,
  },
  {
    id: 'finolex-f02',
    name: 'Drip Irrigation Pipe F02',
    brand: 'Finolex',
    category: 'drip',
    thicknessMm: 0.2,
    coilLengthM: 2500,
    price: 7500,
    inStock: true,
  },
];
