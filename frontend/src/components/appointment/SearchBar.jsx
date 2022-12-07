import React from 'react'
import "../../App.css"
import { useState } from 'react';

function SearchBar({ data }) {

    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = data.filter((value => {
            return value.full_name.toLowerCase().includes(searchWord.toLowerCase());
        }));

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }

    return (
        <div className="search-box mt-6 px-6" style={{}}>
            <h1 className="has-text-black is-size-2 mb-5">Search For Doctor</h1>
            <div className="field is-grouped">
                <p className="control is-expanded ml-6 pl-6">
                    <input className="input" type="text" placeholder="Find a doctor by name or specialization" onChange={handleFilter} />
                </p>
                <p className="control">
                    <a className="button is-info">
                        Search
                    </a>
                </p>
                {filteredData.length != 0 && (
                    <div className='dataResult'>
                        {filteredData.slice(0, 4).map((value, key) => {
                            return <a className='dataItem' href={`/appointment/doctors/${value.id}`}>
                                <p>{value.full_name}</p>
                            </a>
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SearchBar