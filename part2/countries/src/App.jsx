import { useEffect, useState, useMemo } from "react"
import countryService from './services/countries'
import Results from "./components/Results";

const queryMatches = (country, query) =>
  country.toLowerCase().includes(query.toLowerCase());

function App() {
  const [query, setQuery] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService
      .getAll()
      .then(res => setCountries(res))
      .catch(console.error)
  }, [])

  const filteredCountries = useMemo(
    () => countries.filter(it => queryMatches(it.name.common, query)),
    [countries, query]
  );
  
  return (
    <div>
      <label htmlFor="search">
        find countries: 
        <input
          id="search"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      {query && <Results countries={filteredCountries} />}
    </div>
  )
}

export default App
