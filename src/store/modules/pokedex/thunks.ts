import { createAsyncThunk } from '@reduxjs/toolkit';

type PokemonFetchPayload = {
  page?: number;
  size?: number;
}

export const pokedexAsync = createAsyncThunk('pokedex/fetchPokedex', async ({
  page = 1,
  size = 10
}: PokemonFetchPayload, thunkAPI) => {
  const limit = size > 0 ? size : 10;
  const offset = page < 0 ? 0 : (page - 1) * size;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  const resultados = await Promise.all(data.results.map((pokemon: any) => {
    return fetch(pokemon.url).then((response) => response.json());
  }));
  return resultados;
});