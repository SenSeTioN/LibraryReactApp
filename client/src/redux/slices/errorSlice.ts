import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type TError = {
  error: string | null
}

const initialState: TError = {
  error: null,
}

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    clearError() {
      return initialState
    },
  },
})

export const { setError, clearError } = errorSlice.actions

export const selectError = (state: RootState) => state.error.error

export default errorSlice.reducer
