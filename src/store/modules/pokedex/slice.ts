'use client';

import { RootState } from '@/store';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { pokedexAsync } from './thunks';

type Pokemon = {
  id: number;
  name: string;
  img: string;
}

type InitialStateProps = {
  pokemonList: Pokemon[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialStateProps = {
  pokemonList: [
    {
      id: 1,
      name: 'bulbasaur',
      img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    }
  ],
  isLoading: false,
  isError: false
};

export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    resetPokedex: (state) => {
      state.pokemonList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(pokedexAsync.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    }).addCase(pokedexAsync.fulfilled, (state, action: PayloadAction<any[]>) => {
      const pokemonList = action.payload.map((pokemon: any) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          img: pokemon.sprites.other['official-artwork'].front_default
        };
      });
      state.isLoading = false;
      state.isError = false;
      state.pokemonList = pokemonList;
    }).addCase(pokedexAsync.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { resetPokedex } = pokedexSlice.actions;
export const pokedexReducer = pokedexSlice.reducer;

export const usePokedex = () => useSelector((state: RootState) => state.pokedex);

