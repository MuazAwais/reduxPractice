export type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  description: string;
};

function generateProducts(count: number = 50): Product[] {
  const categories = ["Electronics", "Home", "Toys", "Books", "Fashion", "Beauty", "Sports"];
  const products: Product[] = [];
  for (let i = 1; i <= count; i++) {
    const category = categories[i % categories.length];
    products.push({
      id: i,
      title: `Product ${i}`,
      price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
      imageUrl: `https://picsum.photos/seed/product-${i}/400/300`,
      category,
      description: `This is a great ${category.toLowerCase()} product with index ${i}.`
    });
  }
  return products;
}

const FAKE_DB: Product[] = generateProducts(60);

export async function fetchProductsApi(delayMs: number = 500): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return [...FAKE_DB];
}


