import Categories from "@/components/Categories"
import Header from "@/components/Header"
import ProductSection from "@/components/ProductSection"
import { useCases } from "@/api/useCases"
import TResponse from "@/types/InitialDataResponse"

async function getInitialItems(): Promise<ApiResponse<TResponse>> {
  try {
    const initialDataRequest = await useCases.serverSide.randomProducts()
    const response: ApiResponse<TResponse> = await initialDataRequest.json()
    return response
  } catch (err) {
    console.log("error random products", err)
    return {
      data: [],
      error: [],
      result: "error",
    }
  }
}

async function Home() {
  const initialData: ApiResponse<TResponse> = await getInitialItems()
  return (
    <div>
      <Categories />
      <Header />
      {initialData.data.map((element, index) => {
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
