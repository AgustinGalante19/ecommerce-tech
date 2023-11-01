import Categories from "@/components/Categories"
import Header from "@/components/Header"
import ProductSection from "@/components/ProductSection"
import { useCases } from "@/api/useCases"

async function getInitialItems() {
  const gpusResponse = await useCases.products.getByCatId(
    "653a8233bc572e1c316fde01"
  )
  const phonesResponse = await useCases.products.getByCatId(
    "653c42b7a2181dc2e5da291d"
  )
  return {
    phones: phonesResponse.data,
    gpus: gpusResponse.data,
  }
}

async function Home() {
  const { gpus, phones } = await getInitialItems()
  return (
    <div>
      <Categories />
      <Header />
      <ProductSection
        products={phones.data}
        title='Grab the best deal on '
        category='Smartphones'
      />
      <ProductSection
        products={gpus.data}
        title='Make a gift to yourself buying a '
        category='GPU'
      />
    </div>
  )
}
export default Home
