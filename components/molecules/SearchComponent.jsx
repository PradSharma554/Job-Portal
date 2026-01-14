import React, { useState, useEffect } from 'react'

const SearchComponent = ({ query, setQuery, handleSearch }) => {
    const [debouncedQuery, setDebouncedQuery] = useState(query)

    useEffect(() => {
        const timer = setTimeout(() => {
            setQuery(debouncedQuery)
        }, 500)
        return () => clearTimeout(timer)
    }, [debouncedQuery])

    return <div className='mt-[1.5rem]'>
        <input
            value={debouncedQuery}
            onChange={(e) => setDebouncedQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className='w-[60%] md:w-[70%] lg:w-[75%] px-5 py-4 outline-none rounded-l-md bg-gray-200'
            placeholder='Search by role or company...'
            title='search box'
            type="text"
        />
        <button
            onClick={handleSearch != undefined ? handleSearch : null}
            title='Press to Search'
            type='button'
            className='px-5 py-4 outline-none rounded-r-md bg-blue-500 text-white'
        >
            Search
        </button>
    </div>
}

export default SearchComponent;