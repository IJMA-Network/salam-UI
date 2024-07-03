import React from 'react'
import './Applications.css'
import ApplictionState from './Application.json'


export default function Applications() {


    ApplictionState.map((v, i) => { console.log(v, "ApplictionState") })

    return (
        // <div>
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
                <h2 className='text-center'>Applications Detail</h2>

                <table class="table table-hover">
                    <thead class="bg-light">
                        <tr>
                            <th>Date</th>
                            <th>Application No</th>
                            <th>Applicant</th>
                            <th>Amount</th>
                            <th>Item</th>
                            <th>Tenor</th>
                            <th>View</th>
                        </tr>
                    </thead>
                    {ApplictionState.map((v, i) => {
                        return (

                            <tbody>
                                <tr>
                                    <td>{v.date}</td>
                                    <td>{v.referenceId}</td>
                                    <td>{v.BankAccount.name}</td>
                                    <td>{v.amount}</td>
                                    <td>{v.description}</td>
                                    <td>{v.tenor}</td>

                                    <td>
                                        <span type="button" class="btn btn-warning btn-rounded" data-toggle="modal" data-target="#myModal"
                                        //  onClick={() => setClinetID(v._id)}
                                        >View</span>
                                    </td>

                                </tr>
                            </tbody>
                        )
                    })}

                </table>
            </div>

            <div class="modal" id="myModal">
                <div class="modal-dialog modal-dialog-scrollable-sm">
                    <div class="modal-content" style={{ width: "115%" }}>

                        {/* <!-- Modal Header --> */}
                        <div class="modal-header">
                            <h3 class="modal-title">Application Details</h3>
                            <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
                        </div>

                        {/* <!-- Modal body --> */}
                        {ApplictionState.map((v, i) => {
                            return (
                                <div class="modal-body">
                                    <table id="customers">

                                        <tr>
                                            <th>Company</th>
                                            <th>Contact</th>
                                        </tr>
                                        <tr>
                                            <td>Date.</td>
                                            <td>{v.date}</td>
                                        </tr>
                                        <tr>
                                            <td>Refrence No.</td>
                                            <td>{v.referenceId}</td>
                                        </tr>
                                        <tr>
                                            <td>Bank</td>
                                            <td>{v.BankAccount.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Applicate</td>
                                            <td>{v.applicantAccount.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Amount</td>
                                            <td>{v.amount}</td>
                                        </tr>
                                        <tr>
                                            <td>Tenor</td>
                                            <td>{v.tenor}</td>
                                        </tr>
                                        <tr>
                                            <td>Item</td>
                                            <td>{v.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Description</td>
                                            <td>{v.description}</td>
                                        </tr>
                                        <tr>
                                            <td>Quantity</td>
                                            <td>{v.amount}</td>
                                        </tr>


                                    </table>

                                </div>
                            )
                        })}



                        {/* <!-- Modal footer --> */}
                        <div class="modal-footer">
                            <button type="button" class="btn btn-succes" data-dismiss="modal">Issue Purchase Order</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>
        // </div>
    )
}
