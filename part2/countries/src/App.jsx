import { useState, useEffect } from 'react'
import axios from 'axios'
import Results from './components/Result'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
    setSelected(null)
  }

  const matches = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )
  console.log(matches)

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <Results matches={matches} selected={selected} setSelected={setSelected} search={search} />
    </div>
  )
}

export default App