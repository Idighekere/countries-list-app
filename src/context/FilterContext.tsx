import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
    selectedContinents: string[];
    selectedTimezones: string[];
    setSelectedContinents: (continents: string[]) => void;
    setSelectedTimezones: (timezones: string[]) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [selectedContinents, setSelectedContinents] = useState<string[]>([]);
    const [selectedTimezones, setSelectedTimezones] = useState<string[]>([]);

    return (
        <FilterContext.Provider
            value={{
                selectedContinents,
                selectedTimezones,
                setSelectedContinents,
                setSelectedTimezones
            }}
        >
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}
