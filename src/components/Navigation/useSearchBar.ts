import useDebounce from "@/hooks/useDebounce"
import SearchResultType from "@/types/SearchResult"
import { useEffect, useState } from "react"

export default function useSearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResult, setSearchResult] = useState<SearchResultType[]>([])

  const debounceSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    const searchProducts = async () => {
      const request = await fetch("/api/product/search/" + debounceSearch)
      const products = await request.json()
      setSearchResult(products.data[0])
    }
    if (debounceSearch) searchProducts()
  }, [debounceSearch])

  return {
    searchQuery,
    setSearchQuery,
    searchResult,
  }
}
