/* import api from "@/api" */
import api from "@/api"
import Categories from "@/components/Categories"
import Header from "@/components/Header"
import ProductSection from "@/components/ProductSection"
import TResponse from "@/types/InitialDataResponse"
/* import { useCallback, useEffect, useState } from "react" */

async function getInitialData(): Promise<ApiResponse<TResponse>> {
  try {
    const request = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/product/initialData"
    )
    const response: ApiResponse<TResponse> = await request.json()
    console.log(response)
    return response
  } catch (err) {
    console.log("error getting initialData", err)
    return {
      data: [],
      error: [],
      result: "error",
    }
  }
}

async function Home() {
  /* const [initialData, setinitialData] = useState<TResponse[]>([]) */

  /* const getInitialData = useCallback(() => {
    console.log("making initial data request")
    api.get<ApiResponse<TResponse>>("/product/initialData").then((response) => {
      setinitialData(response.data.data)
    })
  }, [])

  useEffect(() => {
    getInitialData()
  }, [getInitialData]) */

  const initialData = await getInitialData()
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
