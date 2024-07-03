import { React, useState, useEffect, useContext } from 'react';
import './Proformas.css'
import { Spin } from 'antd';
import { getData, postData } from '../../../Api'
import Filter from './filter';
import StoreContext from '../../../ContextApi';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import JsonData from './ProformaState.json';
// Pagination import here
import PaginationProformas from "../../Pagination";

let itemsPerPage = 5;


export default function Proformas() {
    const contextData = useContext(StoreContext);
    const [user, setUser] = useState({ accountName: "Buyer1" });
    const [bank, setBank] = useState('');
    const [value, setValue] = useState('');
    const [item, setItem] = useState(null);
    const [loading, setloading] = useState(true);
    const [show, setShow] = useState(false);
    // const [proformas, setProformas] = useState(JsonData);
    const [filterItem, setfilterItem] = useState(JsonData);

    // new State pagination here
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(filterItem.length / itemsPerPage);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(contextData.SignInData, "Proformas Context Data");

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
        console.log("user in proformas", user);
        let payload = {
            account: contextData.SignInData.UserAccountNo,
            consumable: true
        }
        getData("received-Proformas", payload, setfilterItem);
    }, [contextData.SignInData])

    const handleRequestMurabaha = async () => {
        let api = "apply/murabaha";
        setloading(false);


        setTimeout(() => {
            setloading(true) // 1
            handleClose() // 2
            notify() // 3
        }, 2000);


        let payload = {
            bank: bank,
            proformaId: item.processId,
            "term": value,
            borrower: contextData.SignInData.UserAccountNo,
        }
        console.log("In request Murabaha", payload);
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

    console.log("alidata", displayedData);

    return (
        <div className="card card-cascade narrower">
            <Filter data={{ JsonData, setfilterItem }} />
            <ToastContainer />
            <div className="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center"
                style={{ marginTop: "-4%" }}
            >
            </div>

            <div className="container mt-3">
                <h2 className='text-center'>Proformas</h2>

                <table className="table table-hover">
                    <thead className="bg-light">
                        <tr>
                            <th> Date</th>
                            <th>Reference No.</th>
                            <th>Issuer</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th></th>
                        </tr>
                    </thead>

                    {displayedData?.map((v, i) => {
                        return (
                            <tbody>
                                <tr>
                                    <td>{v?.date}</td>
                                    <td>{v?.proformaId}</td>
                                    <td>{v?.sellerAccountInfo?.name}</td>
                                    <td>{v?.goods?.asset}</td>
                                    <td>{v?.goods?.quantity?.value + " " + v?.goods?.quantity?.unit}</td>
                                    <td>
                                        <span type="button" class="btn btn-warning btn-rounded" data-toggle="modal" data-target="#myModal"

                                            onClick={() => handleShow(setItem(v))}
                                        >View
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}

                </table>
                {/* pagination testing here */}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0px" }}>
                    <PaginationProformas count={totalPages} page={page} onChange={handlePageChange} data={JsonData} />
                </div>
            </div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Proforma Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(item != null) ?

                        <table id="customers">

                            <tr>
                                <td>Vendor</td>
                                <td>{item.sellerAccountInfo.name}</td>
                            </tr>
                            <tr>
                                <td>Client</td>
                                <td>{item.buyerAccountInfo.name}</td>
                            </tr>
                            <tr>
                                <td>Refrence No.</td>
                                <td>{item.proformaId}</td>
                            </tr>
                            <tr>
                                <td>Date</td>
                                <td>{item.date}</td>
                            </tr>
                            <tr>
                                <td>Consignment No.</td>
                                <td>{item.goods.consignmentNumber}</td>
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
                            <tr>
                                <td>Amount</td>
                                <td>2{item.amount}</td>
                            </tr>


                        </table>
                        : <></>
                    }
                </Modal.Body>
                <div className="modal-footer d-flex justify-content-evenly">
                    <input type="number" placeholder="Tenor" onChange={(e) => setValue(e.target.value)} />
                    <input type="text" placeholder="Bank" onChange={(e) => setBank(e.target.value)} />
                    {loading ? <button type="button" className="btn btn-success close" data-dismiss={show} onClick={handleRequestMurabaha} >Request Murabaha</button> : <Spin size="large" />}

                </div>
            </Modal>

        </div>

    )
}
