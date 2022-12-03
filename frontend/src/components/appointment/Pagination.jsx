import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const prevPage = () => {
        if (currentPage != 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage != nPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <nav>
            <ul className='pagination-list'>
                <li>
                    <a className="pagination-link"
                        onClick={prevPage}
                        href='#'>

                        Previous
                    </a>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className={`pagination-link ${currentPage == pgNumber ? 'is-current' : ''}`} >

                        <a onClick={() => setCurrentPage(pgNumber)}
                            className={`${currentPage == pgNumber ? 'has-text-white' : ''}`}
                            href='#'>

                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li>
                    <a className="pagination-link"
                        onClick={nextPage}
                        href='#'>
                        Next
                    </a>
                </li>
            </ul>
        </nav >
    );
};

export default Pagination;
