import React from 'react';
import ProductCard from './products-card';

export default function ProductList({
  data = [], 
  title,
  limit
}: {
  data?: any[]; 
  title?: string;
  limit?: number;
}) {

    const limitedData = limit ? data.slice(0, limit) : data;
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>

      {Array.isArray(data) && data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: any) => (
           <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No products available</p>
        </div>
      )}
    </div>
  );
}
