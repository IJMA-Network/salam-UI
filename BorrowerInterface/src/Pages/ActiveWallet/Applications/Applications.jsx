import { React, useState, useEffect, useContext } from 'react';
import './Applications.css';
import ApplictionState from './Application.json';
import { getData, postData } from '../../../Api';
import Filter from '../../filter/filter';
import StoreContext from '../../../ContextApi';
// import pagination here
import ApplicationsPagination from "../../Pagination";


// import { Button, message, Space, Spin } from 'antd';
// import Modal from 'react-bootstrap/Modal';


let itemsPerPage = 5;

export default function Applications() {
    const [applications, setApplications] = useState(ApplictionState);
    const contextData = useContext(StoreContext);
    console.log(contextData.SignInData, "Application Context Data");
    const [loading, setloading] = useState(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //   new state pagination here
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(applications?.length / itemsPerPage);
  


    // const Redeem = () => {
    //     setloading(false)
    //     setTimeout(() => {
    //       setloading(true)
    //     }, 2000);
    //   }

    // pagination function here
    const handlePageChange = (event, value) => {
        setPage(value);
      };
    
      const displayedData = applications.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );
    

      displayedData?.map((v, i) => { console.log(v, "ApplictionState") })

    return (
        // <div>
        <div class="card card-cascade narrower">
            <Filter />
            <div
                class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 d-flex justify-content-between align-items-center"
                style={{ marginTop: "-5%" }}
            >

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
                    {displayedData.map((v, i) => {
                        return (

                            <tbody>
                                <tr>
                                    <td>{v?.date}</td>
                                    <td>{v?.referenceId}</td>
                                    <td>{v?.BankAccount?.name}</td>
                                    <td>{v?.amount}</td>
                                    <td>{v?.description}</td>
                                    <td>{v?.tenor}</td>

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
                <div style={{display:"flex",justifyContent:"center",alignItems:'center'}}>
                    <ApplicationsPagination count={totalPages} page={page} onChange={handlePageChange} data={ApplictionState}/>
                </div>
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
                            <button type="button" class="btn btn-danger" data-dismiss="modal" >Close</button>
                        </div>

                    </div>
                </div>
            </div>


        </div>
        // </div>
    )
}
