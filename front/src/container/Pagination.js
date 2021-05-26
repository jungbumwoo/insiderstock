import React, { useState } from "react";

const Pagination = (props) => {
    const [ pager, setPager] = useState({});
    const [ pageOfItems, setPageOfItems] = useState({});

    const loadPage = () => {
        // get page of items from api
        const params = new URLSearchParams(location.search);
        const page = parseInt(params.get('page')) || 1;
        if (page !== pager.currentPage) {
            fetch(`/api/items?page=${page}`, { method: Get})
                .then(response => response.json())
                .then(({pager, pageOfItems}) => {
                    setPager(pager);
                    setPageOfItems(pageOfItems);
                });
        }
    }

    return (
        <div className="card text-center m-3">
            <h3 className="card-header">React + Node Pagination</h3>
            <div className="card-body">
                {pageOfItems.map(item => 
                    <div key={item.id}>{item.name}</div>
                )}
            </div>
            <div className="card-footer pd-0 pt-3">
                {pager.pages && pager.pages.length &&
                    <ul className="pagination">
                        <li className={`page-item first-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=1` }} className="page-link">First</Link>
                        </li>
                        <li className={`page-item previous-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${pager.currentPage -1}`}} className="page-link">Previous</Link>
                        </li>
                        {pager.pages.map(page =>
                            <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                                <Link to={{ search: `?page=${page}`}} className="page-link">{page}</Link>
                            </li>
                        )}
                        <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${pager.currentPage + 1}`}} className="page-link">Next</Link>
                        </li>
                        <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                            <Link to={{ search: `?page=${pager.totalPages}`}} className="page-link">Last</Link>
                        </li>
                    </ul>
                }
            </div>
        </div>
    )
}

export default Pagination;