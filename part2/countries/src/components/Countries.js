import React from 'react'

const Countries = ({ filteredCountries }) => {

    if (filteredCountries.length <= 10 && filteredCountries.length > 1 ) {
        return (
            <div>
                <h2>Countries</h2>
                {filteredCountries.map(country =>
                    <li key={country.name}>{country.name}</li>
                )}
            </div>
    
        )   
    } else if (filteredCountries.length === 1 ) {
        return (
            filteredCountries.map(country =>
            <div key={country.name}>
                <h2 >{country.name}</h2>
                <p>Capital: {country.capital}</p>
                <p>Population: {country.population}</p>
                <h3>Languages:</h3>
                <ul>
                    {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
                </ul>
                <div>
                    <img src={country.flag} alt={country.name} width="100" height="100"></img>        
                </div>
            </div>
            )
        )   
    } else {
        return (
            <div>
                <p>Too many matches</p>
            </div>
        )
    }

}

export default Countries