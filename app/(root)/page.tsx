import { getLatestProducts } from '@/lib/actions/product.actions'
import ProductList from '@/components/ui/shared/products/product-list'



export default async function HomePage() {
  const latestProducts = await getLatestProducts();
 
  return (
    <>
      <ProductList data={latestProducts} title='Newest Arrivals' limit={4}/>
      
    </>
  )
}
