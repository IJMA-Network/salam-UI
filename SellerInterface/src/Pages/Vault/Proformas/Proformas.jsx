import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { getData } from "../../../Api/Api";
import { Spin } from 'antd';
import axios from "axios";
import "./Proformas.css";
import ProformaJsonData from './ProformaJsonData.json';
import StoreContext from '../../../ContextApi';
import Filter from "../../filter/filter";
import Modal from 'react-bootstrap/Modal';


export default function Proformas() {

  const [allData, setallData] = useState([])
  const [loading, setloading] = useState(true);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const contextData = useContext(StoreContext);
  
  
  ProformaJsonData.map((v, i) => { console.log(v) })
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


  const handleRequestMurabaha = async () => {
    setloading(false)
    setTimeout(() => {
      setloading(true)
      handleClose() // 2
      notify() // 3
    }, 2000);
  }
  //   var data = {
  //     account: "Seller2",
  //     consumable: "",
  //   };

  //   var apiURLData = "issued-Proformas";

  // useEffect(()=>{

  //   getData(apiURLData, data).then((res) => {  
  //     setallData(res.data)
  //   });

  // },[])


  console.log(allData, "res");

  return (
    <div class="card card-cascade narrower">
      <Filter />
      <ToastContainer />
      <div class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center"
        style={{ marginTop: "-4%" }}
      >
      </div>
      <div class="container mt-3">
        <h2 className="text-center">Proformas</h2>

        <table class="table table-hover">
          <thead class="bg-light">
            <tr>
              <th>Proforma Id</th>
              <th> Date</th>
              <th>Seller </th>
              <th>Buyer</th>
              <th>Item</th>
              <th>Quantity</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ProformaJsonData.map((v, i) => {
              return (

                <tr>
                  <td>{v.proformaId}</td>
                  <td>{v.date}</td>
                  <td>{v.sellerAccountInfo.name}</td>
                  <td>{v.buyerAccountInfo.name}</td>
                  <td>{v.goods.asset}</td>
                  <td> {v.goods.quantity.value}  {v.goods.quantity.unit} </td>
                  <td>
                    <span
                      type="button"
                      class="btn btn-warning btn-rounded"
                      data-toggle="modal"
                      data-target="#myModal"
                      //  onClick={() => setClinetID(v._id)}
                      onClick={() => handleShow(setItem(v))}
                    >
                      View
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Proformas Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {(item != null) ?
            // return
             (

              <table id="customers">
                <tr>
                  <td>Proforma Id</td>
                  <td>{item.proformaId}</td>
                </tr>
                <tr>
                  <td>DATE</td>
                  <td>{item.date}</td>
                </tr>
                <tr>
                  <td>Seller </td>
                  <td>{item.sellerAccountInfo.name}</td>
                </tr>
                <tr>
                  <td>Buyer</td>
                  <td>{item.buyerAccountInfo.name}</td>
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
                  <td> {item.goods.quantity.value}  {item.goods.quantity.unit} </td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{item.amount}</td>
                </tr>

              </table>
            ):<></>
          }

          {/* // )} */}

        </Modal.Body>
        <div class="modal-footer">
          {loading ? <button type="button" class="btn btn-success" data-dismiss={show} onClick={handleRequestMurabaha}>Request Murabaha</button> : <Spin size="large" />}
        </div>
      </Modal>
    </div >
  );
}
