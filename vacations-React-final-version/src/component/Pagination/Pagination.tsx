
import {JSX} from 'react';
import './Pagination.css';

interface PaginationProps {
    totalVacations: number;
    handlePaginationChange: (page: number) => Promise<void>;
}

function Pagination({totalVacations, handlePaginationChange}: PaginationProps): JSX.Element {

    const pagesNumbers: number[] = [];
    const limit: number = 10;
    const pages: number = Math.ceil(totalVacations / limit) || 1;

    for (let i: number = 1; i <= pages; i++) {
        pagesNumbers.push(i);
    }

    return (
        <div className="pagination">
            <ul className="pagination-ul">
                {pagesNumbers.map((pageNumber: number) => (
                    <li className="pagination-li" key={pageNumber}>
                        <button
                            className="pagination-page-number-button"
                            onClick={() => void handlePaginationChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;