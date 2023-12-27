export const highlightMatch = (text: string, filter: string) => {
  if (!filter) return text

  const regex = new RegExp(`(${filter})`, 'gi')

  return text.split(regex).map((substring, i) => {
    if (substring.toLowerCase() === filter.toLowerCase()) {
      return (
        <span key={i} className='highlight'>
          {substring}
        </span>
      )
    }

    return substring
  })
}
