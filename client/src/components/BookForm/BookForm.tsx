import { ChangeEvent, FormEvent, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import booksData from '../../data/books.json'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks'
import { addBook, fetchBook, selectIsLoadingViaAPI } from '../../redux/slices/booksSlice'
import { setError } from '../../redux/slices/errorSlice'
import createBookWithId from '../../utils/createBookWithId'
import './BookForm.css'

const BookForm = () => {
  const [title, setTitle] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const isLoadingViaAPI = useAppSelector(selectIsLoadingViaAPI)
  const dispatch = useAppDispatch()

  const handleRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length)
    const randomBook = booksData[randomIndex]

    dispatch(addBook(createBookWithId(randomBook, 'random')))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (title && author) {
      dispatch(addBook(createBookWithId({ title, author }, 'manual')))

      setTitle('')
      setAuthor('')
    } else {
      dispatch(setError('You must enter a title and author!'))
    }
  }

  const handleRandomBookViaApi = () => {
    dispatch(fetchBook('http://localhost:4000/random-book-delayed'))
  }

  return (
    <div className='app-block book-form'>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <input
            type='text'
            id='author'
            value={author}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
          />
        </div>
        <div className='book-form-btn'>
          <button type='submit'>Add Book</button>
          <button type='button' onClick={handleRandomBook}>
            Add Random
          </button>

          <button type='button' onClick={handleRandomBookViaApi} disabled={isLoadingViaAPI}>
            {isLoadingViaAPI ? (
              <>
                <span>Loading...</span>
                <FaSpinner className='spinner' />
              </>
            ) : (
              <span>Add Random via API</span>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default BookForm
