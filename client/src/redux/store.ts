import { combineReducers, configureStore } from '@reduxjs/toolkit'
import booksSlice from './slices/booksSlice'
import filterSlice from './slices/filterSlice'
import errorSlice from './slices/errorSlice'

const rootReducer = combineReducers({
  books: booksSlice,
  filter: filterSlice,
  error: errorSlice,
})

const store = configureStore({
  reducer: rootReducer,
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
