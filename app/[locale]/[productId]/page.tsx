import React from 'react'
import { type NextPage } from "next";
import { Product } from '@/types';

interface ProductPageProps {
  params: { productId: string };
}

const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
  const { productId } = await  params;
  
  // Replace with your CMS fetching logic, e.g., fetch, axios, graphql, etc.
  const product = await fetch(`https://fakestoreapi.com/products/${productId}`);
  const productData: Product = await product.json();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{productData.title}</h1>
      <img src={productData.image} alt={productData.title} style={{ maxWidth: "200px", marginBottom: "1rem" }} />
      <p><strong>ID:</strong> {productData.id}</p>
      <p><strong>Category:</strong> {productData.category}</p>
      <p><strong>Description:</strong> {productData.description}</p>
      <p><strong>Price:</strong> ${productData.price}</p>
      <p>
        <strong>Rating:</strong> {productData.rating.rate} / 5 ({productData.rating.count} reviews)
      </p>
    </div>
  );
};

export default ProductPage;