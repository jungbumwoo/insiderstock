import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAddInterestAction } from "../../actions/stockAction";
import { interestDeleteAct } from "../../actions";
import Button from 'react-bootstrap/Button';
import "./Interest.css";
import { returnUtil } from "../containerUtils";
import axiosInstance from "../../helpers/axios";

const Interest2 = (props) => {
    console.log(props);
    const [ pager, setPager ] = useState({});
    const [ pageOfItems, setPageOfItems ] = useState([]);
    const stockInterest = useSelector(state => state.stock);
    let { interests } = stockInterest;
    
    useEffect(() => {
        loadData();
    });

    console.log(pager);
    console.log(pageOfItems);

    const loadData = async() => {
        const params = new URLSearchParams(props.location.search);
        const page = parseInt(params.get('page')) || 1;
        if(page !== pager.currentPage){
            console.log("fetch!!");
            let res = await axiosInstance.get(`/addinterest?page=${page}`);
            // fetch(`http://localhost:2000/api/addinterest`, { method: 'GET', })
            // // fetch(`http://localhost:2000/api/addinterest?page=${page}`, { method: 'GET'})
            // .then(response => response.json())
            // .then((data) => {
            //     console.log(data);
            //     let { pager, pageOfItem } = data.paginatedResult;
            //     setPager(pager);
            //     setPageOfItems(pageOfItem);
            // })
            if(res.status === 200){
                let newPager = res.data.pagedResult.pager;
                let newPageOfItems = res.data.pagedResult.pager;
                if (newPager != pager || newPageOfItems != pageOfItems ) {
                    setPageOfItems(pageOfItems);
                    setPager(pager);
                }
            }
        }
    }

    return(
        <>
            <div>
            {pager.pages && pager.pages.length &&
                <ul className="pagination">
                    <li className={`page-item fist-item ${pager.currentPage ===1 ? 'disabled' : ''}`}>
                        <Link to={{search: `?page=1`}}></Link>
                    </li>
                    {pager.pages.map(page =>
                        <li key={page} className={`page-item number-item ${pager.currentPage === page ? 'active' : ''}`}>
                            <Link to={{ search: `?page=${page}`}} className="page-link">{page}</Link>
                        </li>    
                    )}
                </ul>
                
            }
            </div>
        </>
    )
}

export default Interest2;