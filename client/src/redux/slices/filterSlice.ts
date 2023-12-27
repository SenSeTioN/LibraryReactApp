import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IFilterSlice {
  title: string
  author: string
  onlyFavorite: boolean
}

const initialState: IFilterSlice = {
  title: '',
  author: '',
  onlyFavorite: false,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setTitleFilter: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    setAuthorFilter: (state, action: PayloadAction<string>) => {
      state.author = action.payload
    },
    setOnlyFavorite: (state) => {
      state.onlyFavorite = !state.onlyFavorite
    },
    resetFilters: () => {
      return initialState
    },
  },
})

export const { setTitleFilter, resetFilters, setAuthorFilter, setOnlyFavorite } =
  filterSlice.actions

export const selectTitleFilter = (state: RootState) => state.filter.title
export const selectAuthorFilter = (state: RootState) => state.filter.author
export const selectOnlyFavorite = (state: RootState) => state.filter.onlyFavorite

export default filterSlice.reducer
