import React, { useState } from 'react'
import './VaultMurabaha.css'
import MurbanState from './VaultMurabaha..json';
import Filter from '../../filter/filter';
import VaultMurabahaPagination from "../../Pagination";


let itemsPerPage = 5; //pagination per page here

export default function VaultMurabaha() {
    MurbanState.map((v, i) => { console.log(v, "MurbanState") })

    // new state pagination here
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(MurbanState?.length / itemsPerPage);


    // paginatio function here
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const displayedData = MurbanState.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );



    return (
        <div className="card card-cascade narrower">
            <Filter />
            <div
                className="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 d-flex justify-content-between align-items-center"
                style={{ marginTop: "-4%" }}
            >

                {/* <div>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-th-large mt-0"></i>
                    </button>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-columns mt-0"></i>
                    </button>
                </div>

                <a class="white-text mx-3">Allow Access</a>

                <div>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-pencil-alt mt-0"></i>
                    </button>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="far fa-trash-alt mt-0"></i>
                    </button>
                    <button type="button" class="btn btn-outline-white btn-rounded btn-sm px-2">
                        <i class="fas fa-info-circle mt-0"></i>
                    </button>
                </div> */}

            </div>
            <div className="container mt-3">
                <h2 className='text-center'>Murabaha Contracts</h2>
                {displayedData?.map((v, i) => {
                    return (


                        <table className="table table-hover">
                            <thead className="bg-light">
                                <tr>
                                    <th >Date</th>
                                    <th>Refrence No</th>
                                    <th>Bank</th>
                                    <th>Borrower</th>
                                    <th>Term</th>
                                    <th>Cost Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{v?.agreementDate}</td>
                                    <td>{v?.internalReference}</td>
                                    <td>{v?.bankAccountInfo?.name}</td>
                                    {/* <td>Buyer 1</td> */}
                                    <td>{v?.bankAccountInfo?.name}</td>
                                    <td>{v?.term}</td>
                                    <td>{v?.costPrice}</td>

                                    <td>
                                        <span type="button" class="btn btn-warning btn-rounded" data-toggle="modal" data-target="#myModal"
                                        //  onClick={() => setClinetID(v._id)}
                                        >View</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )
                })}
                <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                    <VaultMurabahaPagination count={totalPages} page={page} onChange={handlePageChange} data={MurbanState} />
                </div>
            </div>

            <div className="modal" id="myModal">
                <div className="modal-dialog modal-dialog-scrollable-sm">
                    <div className="modal-content" style={{ width: "115%" }}>

                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <h3 className="modal-title">Murabaha Agreement Details</h3>
                            <button type="button" className="btn btn-danger close" data-dismiss="modal">X</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        {MurbanState.map((v, i) => {
                            return (
                                <div className="modal-body">
                                    <table id="customers">

                                        <tr>
                                            <th>Company</th>
                                            <th>Contact</th>
                                        </tr>
                                        <tr>
                                            <td>Date</td>
                                            <td>{v?.agreementDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Refrence No.</td>
                                            <td>{v?.internalReference}</td>
                                        </tr>
                                        <tr>
                                            <td>Bank</td>
                                            <td>{v?.bankAccountInfo?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Applicant</td>
                                            <td>{v?.borrowerAccountInfo?.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Cost Price</td>
                                            <td>{v?.costPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>Tenor</td>
                                            <td>{v?.term}</td>
                                        </tr>
                                        <tr>
                                            <td>Selling Price</td>
                                            <td>{v?.sellingprice}</td>
                                        </tr>
                                        <tr>
                                            <td>Profile Rate</td>
                                            <td>{v?.profitrate}</td>
                                        </tr>
                                        <tr>
                                            <td>Item</td>
                                            <td>Medicin</td>
                                        </tr>
                                        <tr>
                                            <td>Bank Signature</td>
                                            <td>Signed</td>
                                        </tr>
                                        <tr>
                                            <td>Brorower Signature</td>
                                            <td>Signed</td>
                                        </tr>

                                    </table>

                                </div>
                            )
                        })}



                        {/* <!-- Modal footer --> */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
