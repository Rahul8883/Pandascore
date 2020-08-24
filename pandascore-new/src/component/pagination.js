import React from 'react'
import _ from 'lodash'

export default function Pagination(props) {
    const {pageSize, dataCount, onPageChange, currentPage}=props;
    console.log("current page"+currentPage)
    const pagesCount=Math.ceil(dataCount/pageSize);
    const pages=_.range(1,pagesCount+1);
    return (
        <div style={{display: "flex",
            justifyContent: "flex-end",
            marginTop: "27px",
            width: "87.7em"}}>
            <nav aria-label="...">
                <ul class="pagination">
                    {pages.map((page)=>{
                        return(
                        <li key={page}class={(page===currentPage)?"page-item active":"page-item"}>
                        <a class="page-link" href="#" onClick={()=>onPageChange(page)}>{page}</a>
                        </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    )
}