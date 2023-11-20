import { createContext } from "react";

export const UserContext = createContext({
    user: {},
    setUser: (user) => {}
});

export const SearchResultContext = createContext({
    searchResults: [],
    setSearchResultContext: (results) => {}
})