import React from 'react'

const Search = (props) => {
    return (
        <div>
            <h2>Search:</h2>
            <form onSubmit={props.applyFilter}>
                <div>Filter:
            <input
                        onChange={props.handleSearch}
                    />
                </div>
                <div>
                    <button onClick={() => props.setShowAll(!props.showAll)}>
                        {props.showAll ? 'Search' : 'Reset'}</button>
                </div>
            </form>
        </div>
    )
}

export default Search