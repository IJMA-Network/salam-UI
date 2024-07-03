import React from 'react'
import './Murabaha.css'
import MurbanState from './MurbahaState.json'

export default function Murabaha() {


    MurbanState.map((v, i) => { console.log(v, "MurbanState") })




    return (
        <div class="card card-cascade narrower">
            <div
                class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center">

                <div>
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
                </div>

            </div>
            <div class="container mt-3">
                <h2 className='text-center'>Murabaha Contact</h2>
                {MurbanState.map((v, i) => {
                    return (


                        <table class="table table-hover">
                            <thead class="bg-light">
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
                                    <td>{v.agreementDate}</td>
                                    <td>{v.internalReference}</td>
                                    <td>{v.bankAccountInfo.name}</td>
                                    <td>{v.bankAccountInfo.name}</td>
                                    {/* <td>Buyer 1</td> */}
                                    <td>{v.term}</td>
                                    <td>{v.costPrice}</td>
                                  
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
            </div>

            <div class="modal" id="myModal">
                <div class="modal-dialog modal-dialog-scrollable-sm">
                    <div class="modal-content" style={{ width: "115%" }}>

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h3 class="modal-title">Murabaha Agreement Details</h3>
                            <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        {MurbanState.map((v, i) => {
                            return (
                                <div class="modal-body">
                                    <table id="customers">

                                        <tr>
                                            <th>Company</th>
                                            <th>Contact</th>
                                        </tr>
                                        <tr>
                                            <td>Date</td>
                                            <td>{v.agreementDate}</td>
                                        </tr>
                                        <tr>
                                            <td>Refrence No.</td>
                                            <td>{v.internalReference}</td>
                                        </tr>
                                        <tr>
                                            <td>Bank</td>
                                            <td>{v.bankAccountInfo.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Applicant</td>
                                            <td>{v.borrowerAccountInfo.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Cost Price</td>
                                            <td>{v.costPrice}</td>
                                        </tr>
                                        <tr>
                                            <td>Tenor</td>
                                            <td>{v.term}</td>
                                        </tr>
                                        <tr>
                                            <td>Selling Price</td>
                                            <td>{v.sellingprice}</td>
                                        </tr>
                                        <tr>
                                            <td>Profile Rate</td>
                                            <td>{v.profitrate}</td>
                                        </tr>
                                        <tr>
                                            <td>Item</td>
                                            <td>to change</td>
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
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}
