import { createApi } from "@reduxjs/toolkit/query/react"

export const RTKQueryPokedex = createApi({
  reducerPath: "pokedexRTK",
  keepUnusedDataFor: 1,
  baseQuery: async (args) => {
    const { size, page } = args;
    const limit = size > 0 ? size : 10;
    const offset = page <= 0 ? 1 : (page - 1) * size;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    const resultados = await Promise.all(data.results.map((pokemon: any) => {
      return fetch(pokemon.url).then((response) => response.json());
    }));
    return {
      data: {
        results: resultados,
        totalItems: data.count
      }, meta: { page, size }
    };
  },
  tagTypes: ["Pokedex"],
  endpoints: (builder) => {
    return {
      listPokedex: builder.query({
        query: (args) => args,
        providesTags: (result, error, arg) => [
          { type: "Pokedex", id: JSON.stringify(arg) },
        ]
      }),
      getPokemon: builder.query({
        query: (id) => ({ url: `https://pokeapi.co/api/v2/pokemon/${id}` }),
        providesTags: (result, error, arg) => [
          { type: "Pokedex", id: arg.id },
        ]
      })
    }
  },
});

export const { useListPokedexQuery, useGetPokemonQuery } = RTKQueryPokedex;