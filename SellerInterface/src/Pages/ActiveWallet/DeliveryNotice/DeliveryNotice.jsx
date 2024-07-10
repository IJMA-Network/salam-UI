import { React, useState, useEffect, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { getData, postData } from '../../../Api/Api';
import { Spin } from 'antd';
import './DeliveryNotice.css';
// import JsonData from './DeliveryNoticeState.json';
import StoreContext from '../../../ContextApi';
import Filter from "./filter";
import Modal from 'react-bootstrap/Modal';
// pagination import here
import DeliveryNoticePagination from "../../Pagination";

import DeliveryNoticeData from './deliveryNote.json';


let itemsPerPage = 5;

export default function DeliveryNotice() {

    const [user, setUser] = useState({ accountName: "seller1" });
    // const [pOrders, setpOrders] = useState(PurchesOrder);
    const [item, setItem] = useState(null);
    const [loading, setloading] = useState(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [filterItem, setfilterItem] = useState(DeliveryNoticeData);


     //    new state pagination here
     const [page, setPage] = useState(1);
     const totalPages = Math.ceil(filterItem?.length / itemsPerPage);
 
    const contextData = useContext(StoreContext);
    console.log(contextData.SignInData, "DeliveryNotice Context Data");


    const notify = () => toast.success('🦄 Successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });


    useEffect(() => {
        setUser(contextData.SignInData);
        let payload = {
            account: user.UserAccountNo,
            consumable: ""
        }
        getData("received-POs", payload, setfilterItem);
        // console.log("POs in seller PO",pOrders);
    }, [user])



    const handleDeliver = async () => {

        setloading(false)
        setTimeout(() => {
            setloading(true)//1
            handleClose() // 2
            notify() // 3
        }, 2000);


        let api ="purchaseOrder/deliverToAgent"; //"purchaseOrder/deliver";
        let payload = {
            stateId: item.processId,
            account: user.UserAccountNo
        }
        console.log("In PO deliver", payload);
        const resp = await postData(api, payload);
    }

    // pagination function here
    const handlePageChange = (event, value) => {
        setPage(value);
      };
    
      const displayedData = filterItem.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
      );

    return (
        <div class="card card-cascade narrower">
            <Filter data={{ DeliveryNoticeData, setfilterItem }} />
            <ToastContainer />
            <div
                class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 d-flex justify-content-between align-items-center"
            >
            </div>
            <h2 className='text-center'>Delivery Notice</h2>
            <div class="container mt-3">
                <table class="table table-hover">
                    <thead class="bg-light">
                        <tr>
                            <th >Date</th>
                            <th>Refrence Id</th>
                            <th>Bank</th>
                            <th>Supplier</th>
                            <th>Item</th>
                            <th>Delivery Date</th>
                            <th>Delivery Place</th>
                            <th></th>
                        </tr>
                    </thead>
                    {displayedData?.map((v, i) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{v?.date}</td>
                                    <td>{v?.referenceId}</td>
                                    <td>{v?.bankAccountInfo.name}</td>
                                    <td>{v?.supplierAccount.name}</td>
                                    <td>{v?.goods.asset}</td>
                                    <td>{v?.deliveryDate}</td>
                                    <td>{v?.placeOfDelivery}</td>
                                    <td>
                                        <span type="button" class="btn btn-warning btn-rounded" data-toggle="modal" data-target="#myModal"
                                            onClick={() => handleShow(setItem(v))}
                                        >View</span>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
                <div style={{display:'flex',justifyContent:"center",alignItems:'center'}}>
                    <DeliveryNoticePagination count={totalPages} page={page} onChange={handlePageChange} data={filterItem}/>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delivery Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* <!-- Modal body --> */}

                    {(item != null) ?
                        <div class="modal-body">
                            <table id="customers">

                                <tr>
                                    <th>Company</th>
                                    <th>Contact</th>
                                </tr>
                                <tr>
                                    <td>Date</td>
                                    <td>{item.date}</td>
                                </tr>
                                <tr>
                                    <td>Refrence No.</td>
                                    <td>{item.referenceId}</td>
                                </tr>
                                <tr>
                                    <td>Bank</td>
                                    <td>{item.bankAccountInfo.name}</td>
                                </tr>
                                {/* <tr>
                                    <td>Client</td>
                                    <td>{item.bankAccountInfo.name}</td>
                                    <td>Buyer 1</td>
                                </tr> */}
                                   <tr>
                                    <td>Supplier</td>
                                    <td>{item.supplierAccount.name}</td>
                                </tr>
                                <tr>
                                    <td>Process Id</td>
                                    <td>{item.goods.processId}</td>
                                </tr>
                                <tr>
                                    <td>Item</td>
                                    <td>{item.goods.asset}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>{item.description}</td>
                                </tr>
                                <tr>
                                    <td>Quantity</td>
                                    <td>{item.goods.quantity.value + " " + item.goods.quantity.unit}</td>
                                </tr>
                                {/* <tr>
                                    <td>Amount</td>
                                    <td>{item.amount}</td>
                                </tr> */}
                                <tr>
                                    <td>Delivery Date</td>
                                    <td>{item.deliveryDate}</td>
                                </tr>

                                <tr>
                                    <td>Delivery Place</td>
                                    <td>{item.placeOfDelivery}</td>
                                </tr>

                            </table>

                        </div>
                        : <></>
                    }
                </Modal.Body>
                <div class="modal-footer">
                    {loading ? <button type="button" class="btn btn-success close" data-dismiss={show} onClick={handleDeliver} >Deliver</button> : <Spin size="large" />}
                </div>
            </Modal>


        </div >
    )
}
