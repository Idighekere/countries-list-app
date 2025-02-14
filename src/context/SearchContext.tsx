import { useState, createContext, useContext, ReactNode } from "react"
type SearchContextProp = {
    searchTerm: string;
    setSearchTerm: (text: string) => void
}
const SearchContext = createContext<SearchContextProp | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {

    const [searchTerm, setSearchTerm] = useState('')

    return <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
        {children}
    </SearchContext.Provider>
}

export const useSearch = () => {

    const context = useContext(SearchContext)

    if (!context) throw new Error("useSearch must be used within SearchProvider")
    return context
}
