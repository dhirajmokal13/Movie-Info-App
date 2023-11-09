import React, { createContext, useState, useContext } from 'react';
const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
    const [filterDetails, setFilterDetails] = useState({
        Type: false,
        Year: false
    });

    return (
        <FilterContext.Provider value={{ filterDetails, setFilterDetails }}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilterContext = () => {
    return useContext(FilterContext);
}