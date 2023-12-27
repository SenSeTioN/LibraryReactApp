import { BsBookmarkStar, BsBookmarkStarFill } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../redux/hooks/redux-hooks'
import { deleteBook, selectBooks, toggleFavorite } from '../../redux/slices/booksSlice'
import {
  selectAuthorFilter,
  selectOnlyFavorite,
  selectTitleFilter,
} from '../../redux/slices/filterSlice'
import { highlightMatch } from '../../utils/highlightMatch'
import './BookList.css'

const BookList = () => {
  const books = useAppSelector(selectBooks)
  const titleFilter = useAppSelector(selectTitleFilter)
  const authorFilter = useAppSelector(selectAuthorFilter)
  const onlyFavoriteFilter = useAppSelector(selectOnlyFavorite)
  const dispatch = useAppDispatch()

  const handleDeleteBook = (bookId: string) => {
    dispatch(deleteBook(bookId))
  }

  const handleToggleFavorite = (bookId: string) => {
    dispatch(toggleFavorite(bookId))
  }

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(titleFilter.toLowerCase())
    const matchesAuthor = book.author.toLowerCase().includes(authorFilter.toLowerCase())
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true

    return matchesTitle && matchesAuthor && matchesFavorite
  })

  return (
    <div className='app-block book-list'>
      <h2>Book List</h2>

      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className='book-info'>
                {++i}. {highlightMatch(book.title, titleFilter)} by{' '}
                <strong>{highlightMatch(book.author, authorFilter)}</strong> {` (${book.source})`}
              </div>
              <div className='book-actions'>
                <span onClick={() => handleToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className='star-icon' />
                  ) : (
                    <BsBookmarkStar className='star-icon' />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>Delete book</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default BookList
