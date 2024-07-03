import React from 'react'
import { Pagination } from "@mui/material";

// const itemsPerPage = 1;


const PaginationComponent = ({ count, data, page, onChange }) => {
    console.log("props===>", data)
   

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "30px 0px" }}>
            <Pagination count={count} page={page} onChange={onChange} color="primary" />
        </div>
    )
}

export default PaginationComponent
