import { createContext, useContext, useState, useCallback } from "react";

const FavouritesContext = createContext(null);

export const FavouritesProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    const toggleFavourite = useCallback((match) => {
        setFavourites(prev => {
            const exists = prev.some(m => m.id === match.id);
            return exists
                ? prev.filter(m => m.id !== match.id)
                : [...prev, match];
        });
    }, []);

    const isFavourite = useCallback((id) => {
        return favourites.some(m => m.id === id);
    }, [favourites]);

    return (
        <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
            {children}
        </FavouritesContext.Provider>
    );
};

export const useFavourites = () => useContext(FavouritesContext);