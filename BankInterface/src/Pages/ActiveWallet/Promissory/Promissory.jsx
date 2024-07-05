import { React, useState, useEffect } from 'react'
import './Promissory.css';
import JsonData from './PromissoryNote.json';
import { getData, postData } from '../../../Api/api';
import Modal from 'react-bootstrap/Modal';
import Filter from './filter';
import { ToastContainer, toast } from 'react-toastify';
import { Spin } from 'antd';
// pagination import here
import PromissoryPagination from "../../Pagination";


let itemsPerPage = 5;

export default function Promissory() {
  const [bank, setBank] = useState({ accountName: "Bank1" });
  // const [pNotes, setPNotes] = useState(JsonData);
  const [item, setItem] = useState(null);

  const [filterItem, setfilterItem] = useState(JsonData);
  const [loading, setloading] = useState(true);
  const [show, setShow] = useState(false);

  // new stae pagination here
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(filterItem?.length / itemsPerPage)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let payload = {
      account: bank.accountName,
      consumable: ""
    }

    getData("issued-PNs", payload, setfilterItem);
  }, [])


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

  const handleRedeeem = async () => {
    console.log("Item in  Redeem PNote", item);
    setloading(false)

    setTimeout(() => {
      setloading(true) // 1
      handleClose() // 2
      notify() // 3
    }, 2000);

    let api = "pNote/burn";
    let payload = {
      stateId: item.processId,
      account: bank.accountName
    }
    console.log("In Redeem PNote", payload);
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
    <div className="card card-cascade narrower">
      <ToastContainer />
      <Filter data={{ JsonData, setfilterItem }} />
      <div className="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center"
        style={{ marginTop: "-5%" }}
      >

      </div>
      <div className="container mt-3">
        <h2 className='text-center'>Promissory Notes</h2>

        <table className="table table-hover">
          <thead className="bg-light">
            <tr>
              <th>Issue Date</th>
              <th>Freference No..</th>
              <th>Issuer</th>
              <th>Payee</th>
              <th>Amount</th>
              <th>Expire Date</th>
              <th></th>
            </tr>
          </thead>
          {
            displayedData?.map((v, i) => {
              return (

                <tbody>
                  <tr>
                    <td>{v?.issueDate}</td>
                    <td>{v?.id}</td>
                    <td>{v?.issuerAccount?.name}</td>
                    <td>{v?.payeeAccount?.name}</td>
                    <td>{v?.value}</td>
                    <td>{v?.maturity}</td>
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
          <PromissoryPagination count={totalPages} page={page} onChange={handlePageChange} data={filterItem}/>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Promissory Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* <!-- Modal body --> */}

          {(item != null) ?
            <div className="modal-body">
              <table id="customers">

                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                </tr>
                <tr>
                  <td>Issue Date.</td>
                  <td>{item?.issueDate}</td>
                </tr>
                <tr>
                  <td>Refrence No.</td>
                  <td>{item?.id}</td>
                </tr>
                <tr>
                  <td>Issuer</td>
                  <td>{item?.issuerAccount.name}</td>
                </tr>
                <tr>
                  <td>Payee</td>
                  <td>{item?.payeeAccount.name}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{item?.value}</td>
                </tr>
                <tr>
                  <td>Redeemad</td>
                  <td>Yes</td>
                </tr>
                <tr>
                  <td>Expiry</td>
                  <td>{item?.maturity}</td>
                </tr>

              </table>

            </div>
            : <></>
          }

          {/* <!-- Modal footer --> */}
        </Modal.Body>
        {/* <div class="modal-footer d-flex justify-content-evenly"> */}
        <div className="modal-footer">
          {loading ? <button type="button" className="btn btn-success close" data-dismiss={show} onClick={handleRedeeem} >Redeeem</button> : <Spin size="large" />}
        </div>
      </Modal>
    </div>

  )
}
