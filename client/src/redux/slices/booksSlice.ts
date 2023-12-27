import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import createBookWithId from '../../utils/createBookWithId'
import { RootState } from '../store'
import { setError } from './errorSlice'

interface IBook {
  id: string
  title: string
  author: string
  isFavorite: boolean
  source?: string
}

type TBooks = {
  books: IBook[]
  isLoadingViaAPI: boolean
}

const initialState: TBooks = {
  books: [],
  isLoadingViaAPI: false,
}

export const fetchBook = createAsyncThunk('books/fetchBook', async (url: string, thunkAPI) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch (error) {
    thunkAPI.dispatch(setError((error as Error).message))
    return thunkAPI.rejectWithValue(error)
  }
})

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload)
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      return { ...state, books: state.books.filter((book) => book.id !== action.payload) }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite
        }
      })
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.isLoadingViaAPI = false
        if (action.payload.title && action.payload.author) {
          state.books.push(createBookWithId(action.payload, 'API'))
        }
      })
      .addCase(fetchBook.pending, (state) => {
        state.isLoadingViaAPI = true
      })
      .addCase(fetchBook.rejected, (state) => {
        state.isLoadingViaAPI = false
      })
  },
})

export const { deleteBook, toggleFavorite, addBook } = bookSlice.actions

export const selectBooks = (state: RootState) => state.books.books
export const selectIsLoadingViaAPI = (state: RootState) => state.books.isLoadingViaAPI

export default bookSlice.reducer
