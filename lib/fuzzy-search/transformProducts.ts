import { Product, SearchRecord } from "@/types";

function transformProducts(products: Product[]): SearchRecord[] {
  return products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    category: product.category,
  }));
}

export default transformProducts;
