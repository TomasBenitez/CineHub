import { useState } from "react";

interface SearchBarProps { 
    onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {  
    const [query, setQuery] = useState<string>("");  

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);  
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}  
                placeholder="Buscar películas..."
            />
            <button type="submit">Buscar</button>
        </form>
    );
};