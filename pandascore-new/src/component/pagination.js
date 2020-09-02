import React from 'react'
import _ from 'lodash'

export default function Pagination(props) {
    const {pageSize, dataCount, onPageChange, currentPage}=props;
    const pagesCount=Math.ceil(dataCount/pageSize);
    const pages=_.range(1,pagesCount+1);
    return (
        <div style={{display: "flex",
            justifyContent: "center",
            marginTop: "27px"}}>
            <nav aria-label="...">
                <ul className="pagination">
                    {pages.map((page)=>{
                        return(
                        <li key={page} className={(page===currentPage)?"page-item active":"page-item"}>
                        <a className="page-link" href="#" onClick={()=>onPageChange(page)}>{page}</a>
                        </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}