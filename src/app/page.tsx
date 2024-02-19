import { getInitialData } from "@/actions/product"
import Categories from "@/components/Categories"
import Header from "@/components/Header"
import ProductSection from "@/components/ProductSection"

async function Home() {
  const { categories, products } = await getInitialData()
  return (
    <div>
      <Categories categories={categories} />
      <Header />
      {products.map((element, index) => {
        if (element.category !== "") {
          return (
            <ProductSection
              key={`${element.products[0].name} - ${index}`}
              products={element.products}
              title='Grab the best deal on '
              category={{ label: element.category, catId: element.catId }}
            />
          )
        }
        return null
      })}
    </div>
  )
}
export default Home
