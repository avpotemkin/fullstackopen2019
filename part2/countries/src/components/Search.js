import React from 'react'

const Search = (props) => {
    return (
        <div>
            <form>
                <div>Search:
            <input
                        onChange={props.handleSearch}
                    />
                </div>
            </form>
        </div>
    )
}

export default Search