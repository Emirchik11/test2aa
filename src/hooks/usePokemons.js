import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPokemons = async ({ pageParam = 'https://pokeapi.co/api/v2/pokemon?limit=20' }) => {
    const res = await axios.get(pageParam);
    return res.data;
};

export const usePokemons = () => {
    return useInfiniteQuery({
        queryKey: ['pokemons'],
        queryFn: fetchPokemons,
        getNextPageParam: (lastPage) => lastPage.next
    });
};