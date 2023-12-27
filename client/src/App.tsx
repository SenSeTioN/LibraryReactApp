import { FC } from 'react'
import BookForm from './components/BookForm/BookForm'
import BookList from './components/BookList/BookList'
import Error from './components/Error/Error'
import Filter from './components/Filter/Filter'
import './App.css'

const App: FC = () => {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1>Book Library</h1>
      </header>
      <main className='app-main'>
        <div className='app-left-column'>
          <BookForm />
        </div>
        <div className='app-right-column'>
          <Filter />
          <BookList />
        </div>
      </main>
      <Error />
    </div>
  )
}

export default App
