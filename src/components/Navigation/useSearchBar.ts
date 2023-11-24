import { useCases } from "@/api/useCases"
import useDebounce from "@/hooks/useDebounce"
import SearchResultType from "@/types/SearchResult"
import { useEffect, useState } from "react"

export default function useSearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchResult, setSearchResult] = useState<SearchResultType[]>([])

  const debounceSearch = useDebounce(searchQuery, 500)

  useEffect(() => {
    const searchProducts = async () => {
      useCases.products
        .search({ searchQuery: debounceSearch })
        .then((response) => {
          setSearchResult(response.data.data)
        })
    }
    if (debounceSearch) searchProducts()
  }, [debounceSearch])

  return {
    searchQuery,
    setSearchQuery,
    searchResult,
  }
}
