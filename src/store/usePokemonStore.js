import { create } from 'zustand';

const usePokemonStore = create((set) => ({
    collection: [],
    addToCollection: (pokemon) =>
        set((state) => {
            if (!state.collection.find((p) => p.name === pokemon.name)) {
                return { collection: [...state.collection, pokemon] };
            }
            return state;
        })
}));

export default usePokemonStore;
