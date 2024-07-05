import React, { useState, useContext, useEffect } from 'react'
import Filter from '../../filter/filter';
import './Goods.css';
import GoodState from './GoodsState.json';
import { getData, postData } from '../../../Api/api';

import { ToastContainer, toast } from 'react-toastify';
import StoreContext from '../../../ContextApi';
import { Button, message, Space, Spin } from 'antd';
import Modal from 'react-bootstrap/Modal';
// pagination import here
import GoodsPagination from "../../Pagination";


let itemsPerPage = 5;

export default function Goods() {
  const [user, setUser] = useState({ accountName: "seller1" });
  const [goods, setGoods] = useState(GoodState);
  const [loading, setloading] = useState(true);
  const contextData = useContext(StoreContext);
  const [item, setItem] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //  new state pagination here
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(goods?.length / itemsPerPage);

  // console.log(contextData.SignInData, "Good Context Data");

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

  // goods.map((v, i) => { console.log(v, "GoodState") })


  useEffect(() => {
    setUser(contextData.SignInData);
    let payload = {
      account: user.UserAccountNo,
      consumable: ""
    }
    getData("owned-goods", payload, setGoods);
  }, [user])

  const Redeem = () => {
    setloading(false)

    setTimeout(() => {
      setloading(true) // 1
      handleClose() // 2
      notify() // 3
    }, 2000);
  }

  // pagination function here
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedData = goods.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );


  return (
    <div>
      <div className="card card-cascade narrower">
        <Filter data={{ GoodState, setGoods }} />
        <div
          className="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 d-flex justify-content-between align-items-center"
          style={{ marginTop: "-4%" }}
        >
        </div>
        <div className="container mt-3">
          <h2 className='text-center'>Goods</h2>

          <table className="table table-hover">
            <thead className="bg-light">
              <tr>
                <th>Consignmento.</th>
                <th>Asset</th>
                <th>Quantity</th>
                <th>Insurance</th>
                <th></th>
              </tr>
            </thead>
            {displayedData?.map((v, i) => {
              return (
                <tbody>
                  <tr>
                    <td>{v?.internalReference}</td>
                    <td>{v?.asset}</td>
                    <td>{v?.quantity?.value}</td>
                    <td>Yes</td>

                    <td>
                      <span type="button" className="btn btn-warning btn-rounded" data-toggle="modal" data-target="#myModal"
                        onClick={() => handleShow(setItem(v))}
                      >View</span>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </table>
        </div>
        <div style={{display:"flex",justifyContent:'center',alignItems:"center"}}>
          <GoodsPagination count={totalPages} page={page} onChange={handlePageChange} data={goods}/>
        </div>
      </div>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Goods Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {(item != null) ?
            // return 
            (
              <div className="modal-body">
                <table id="customers">

                  <tr>
                    <th>Company</th>
                    <th>Contact</th>
                  </tr>
                  <tr>
                    <td>Vendor</td>
                    <td>{item?.vendor?.name}</td>
                  </tr>
                  <tr>
                    <td>Asset</td>
                    <td>{item?.description}</td>
                  </tr>
                  <tr>
                    <td>Quantity</td>
                    <td>{item?.quantity?.value}</td>
                  </tr>
                  <tr>
                    <td>Reedemable</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>Insured</td>
                    <td>Yes</td>
                  </tr>


                </table>

              </div>
            ) : <></>
          }

        </Modal.Body>
        <div className="modal-footer d-flex justify-content-evenly">
          {loading ? <button type="button" className="btn btn-success" data-dismiss={show} onClick={Redeem} >Redeem</button> : <Spin size="large" />}
        </div>
      </Modal>
    </div>
  )
}
