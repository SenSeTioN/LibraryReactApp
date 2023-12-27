import { ChangeEvent } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks'
import {
  resetFilters,
  selectAuthorFilter,
  selectOnlyFavorite,
  selectTitleFilter,
  setAuthorFilter,
  setOnlyFavorite,
  setTitleFilter,
} from '../../redux/slices/filterSlice'
import './Filter.css'

const Filter = () => {
  const tittleFilter = useAppSelector(selectTitleFilter)
  const authorFilter = useAppSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useAppSelector(selectOnlyFavorite)
  const dispatch = useAppDispatch()

  const handleTitleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTitleFilter(e.target.value))
  }

  const handleAuthorFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuthorFilter(e.target.value))
  }

  const handleOnlyFavoriteChange = () => {
    dispatch(setOnlyFavorite())
  }

  const handleResetFilters = () => {
    dispatch(resetFilters())
  }

  return (
    <div className='app-block filter'>
      <div className='filter-row'>
        <div className='filter-group'>
          <input
            type='text'
            value={tittleFilter}
            onChange={handleTitleFilterChange}
            placeholder='Filter by title...'
          />
        </div>
        <div className='filter-group'>
          <input
            type='text'
            value={authorFilter}
            onChange={handleAuthorFilterChange}
            placeholder='Filter by author...'
          />
        </div>
        <div className='filter-group'>
          <label>
            <input
              type='checkbox'
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteChange}
            />
            Only Favorite
          </label>
        </div>
        <button type='button' onClick={handleResetFilters}>
          Reset filters
        </button>
      </div>
    </div>
  )
}

export default Filter
