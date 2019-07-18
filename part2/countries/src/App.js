import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Search from './components/Search';
import Countries from './components/Countries';

function App() {

  const [countries, setCountires] = useState([]) 
  const [searchItem, setSearchItem] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountires(response.data)
      })
  }

  useEffect(hook, [])

  const filteredCountries = countries.filter(name => name.name.toLowerCase().includes(searchItem.toLowerCase()))

  const handleSearch = (event) => {
    setSearchItem(event.target.value)
  }

  return (
    <div>
      <h1>Countries info</h1>
      <Search 
        handleSearch={handleSearch} 
      />
      <Countries 
        filteredCountries={filteredCountries}
        />
    </div>
  )
}

export default App;
