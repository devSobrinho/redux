import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';
import { pokedexReducer } from './modules/pokedex/slice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import { RTKQueryPokedex } from './modules/pokedex/query';

const persistConfig = {
  key: 'persiste-app',
  storage,
};

const reducers = combineReducers({
  pokedex: pokedexReducer,
  [RTKQueryPokedex.reducerPath]: RTKQueryPokedex.reducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(RTKQueryPokedex.middleware)
});

export const useAppSelector = () => useSelector((state: RootState) => state);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);