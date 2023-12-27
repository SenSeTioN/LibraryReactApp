import { v4 as uuidv4 } from 'uuid'

interface IBook {
  title: string
  author: string
  source?: string
}

const createBookWithId = (book: IBook, source: string) => {
  return { ...book, isFavorite: false, id: uuidv4(), source }
}

export default createBookWithId
