import type { FormEvent } from 'react'
import './SearchBar.css'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  placeholder?: string
  isLoading?: boolean
}

const SearchBar = ({ value, onChange, onSubmit, placeholder, isLoading }: SearchBarProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(value.trim())
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label="Buscar películas"
      />
      <button type="submit" disabled={!value.trim() || isLoading}>
        {isLoading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  )
}

export default SearchBar
