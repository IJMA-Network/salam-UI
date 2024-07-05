import React, { useRef, useState, useEffect, useContext } from "react";
import "./Processflow.css";
import axios from "axios";
import { createTerm } from "../../Api/api";
import StoreContext from "../../ContextApi";
import Modal from "react-bootstrap/Modal";
import { Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import flowData from "./Processflow.json";

export default function ProcessflowPage() {
  const contextData = useContext(StoreContext);
  const [bank, setBank] = useState({ accountName: "Bank1" });
  const [loading, setloading] = useState(true);
  const [show, setShow] = useState(false);

  const [applicationModal, setapplicationModal] = useState(false);
  const [ProformaModal, setProformaModal] = useState(false);
  const [PurchaseOrderModal, setPurchaseOrderModal] = useState(false);
  const [MurabahaModal, setMurabahaModal] = useState(false);

  const [indexZerowShow, setindexZerowShow] = useState(false);
  const [ProformaData, setProformaData] = useState(null);
  const [indexOneShow, setindexOneShow] = useState(false);
  const [ApplicationData, setApplicationData] = useState(null);
  const [indexTwoShow, setindexTwoShow] = useState(false);
  const [PurchaseOrderData, setPurchaseOrderData] = useState(null);
  const [indexThreeShow, setindexThreeShow] = useState(false);
  const [MurabahaData, setMurabahaData] = useState(null);

  const [indexfourShow, setindexfourShow] = useState(false);
  const [PromissoryData, setPromissoryData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function PromissoryFun() { setShow(true) }
  // function ProformaFun() { setShow(true) }

  // console.log(PromissoryData, "rrr");
  // console.log(flowData[0].state.data.date, "data 0 index===000");
  // console.log(flowData[1].state.data.id, "data 1 index===111");
  // console.log(flowData[2].state.data.date, "data 2 index===222");
  // console.log(flowData[3].state.data.date, "data 3 index===333");
  // console.log(flowData[4].state.data.date, "data 4 index===444");
  // console.log(indexfourShow, "data 4 index===444");

  useEffect(() => {
    setBank(contextData.SignInData);

    //  (flowData[0].state.data.date===undefined)?setshowTwo(false):setshowTwo(true)
    //  (flowData[0].state.data.date===undefined)?setShowOne(false):setShowOne(true)
    //  (flowData[0].state.data.date===undefined)?setShowOne(false):setShowOne(true)
    //  (flowData[0].state.data.date===undefined)?setShowOne(false):setShowOne(true)
    // console.log(typeof flowData[0] === "object" ?"raza":"nhi","oppppppppppppp");

    if (
      Object.keys(flowData[0]).length === 0 &&
      flowData[0].constructor === Object
    ) {
      setindexZerowShow(false);
    } else {
      setindexZerowShow(true);
      setProformaData(flowData[0].state.data);
    }
    if (
      Object.keys(flowData[1]).length === 0 &&
      flowData[1].constructor === Object
    ) {
      setindexOneShow(false);
    } else {
      setindexOneShow(true);
      setApplicationData(flowData[1].state.data);
    }
    if (
      Object.keys(flowData[2]).length === 0 &&
      flowData[2].constructor === Object
    ) {
      setindexTwoShow(false);
    } else {
      setindexTwoShow(true);
      setPurchaseOrderData(flowData[2].state.data);
    }
    if (
      Object.keys(flowData[3]).length === 0 &&
      flowData[3].constructor === Object
    ) {
      setindexThreeShow(false);
    } else {
      setindexThreeShow(true);
      setMurabahaData(flowData[3].state.data);
    }
    if (
      Object.keys(flowData[4]).length === 0 &&
      flowData[4].constructor === Object
    ) {
      setindexfourShow(false);
    } else {
      setindexfourShow(true);
      setPromissoryData(flowData[4].state.data);
    }
  }, [contextData.SignInData]);

  function handleTerm(params) {
    setloading(false);

    setTimeout(() => {
      setloading(true); // 1
      handleClose(); // 2
      notify(); // 3
    }, 100);
  }

  const notify = () =>
    toast.success("🦄 Successfully!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <div class="container-fluid px-1 py-5 mx-auto">
      <div class="row d-flex justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-9 col-11 ">
          <h3 className="text-center">Transaction Flow </h3>
          <div class="card ">
            <input type="serch" name="" id="" />
          </div>
        </div>
      </div>

      <div class="container">
        {/* ================= Box 1*/}
        {indexZerowShow == true ? (
          <>
            <div class="row justify-content-md-center align-items-center">
              <div class="col-sm bg-dark"></div>
              <div class="col-sm bg-white ml-auto mr-auto">
                <div
                  className="site-card-wrapper"
                  style={{
                    backgroundColor: "#11366B",
                    color: "white",
                  }}
                >
                  <table onClick={() => setShow(true)}>
                    <tr>
                      <td>Proforma</td>
                    </tr>
                    <tr>
                      <td>{ProformaData.proformaId}</td>
                    </tr>
                    <tr>
                      <td>Date</td>
                    </tr>
                    <tr>
                      <td>{ProformaData.date}</td>
                    </tr>
                  </table>
                </div>
                <img
                  src="https://clipart-library.com/new_gallery/14-149930_arrow-pointing-to-down-comments-arrow-pointing-down.png"
                  height={50}
                  alt=""
                  srcset=""
                  id="errorCenter"
                />
              </div>
              <div class="col-sm bg-dark"></div>
            </div>
          </>
        ) : (
          ""
        )}
        {/* ================= Box 2*/}
        {indexOneShow == true ? (
          <>
            <div class="row justify-content-md-center align-items-center">
              <div class="col-sm bg-dark"></div>
              <div class="col-sm">
                <div
                  className="site-card-wrapper"
                  style={{
                    backgroundColor: "#11366B",
                    color: "white",
                  }}
                >
                  <table onClick={(e) => setapplicationModal(true)}>
                    <tr>
                      <td>Application</td>
                    </tr>
                    <tr>
                      <td>Ref : {ApplicationData.referenceId}</td>
                    </tr>
                    <tr>
                      <td>Date </td>
                    </tr>
                    <tr>
                      <td>{ApplicationData.date}</td>
                    </tr>
                  </table>
                </div>
                <img
                  src="https://clipart-library.com/new_gallery/14-149930_arrow-pointing-to-down-comments-arrow-pointing-down.png"
                  height={50}
                  alt=""
                  srcset=""
                  id="errorCenter"
                />
              </div>
              <div class="col-sm bg-dark"></div>
            </div>
          </>
        ) : (
          ""
        )}
        {/* ================= Box 3*/}
        {indexTwoShow == true ? (
          <div class="row justify-content-md-center align-items-center">
            <div class="col-sm bg-dark"></div>
            <div class="col-sm">
              <div
                className="site-card-wrapper"
                style={{
                  backgroundColor: "#11366B",
                  color: "white",
                }}
              >
                <table onClick={() => setPurchaseOrderModal(true)}>
                  <tr>
                    <td>Purchase Order</td>
                  </tr>
                  <tr>
                    <td>Ref : {PurchaseOrderData.referenceId}</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                  </tr>
                  <tr>
                    <td>{PurchaseOrderData.date}</td>
                  </tr>
                </table>
              </div>
              <img
                src="https://clipart-library.com/new_gallery/14-149930_arrow-pointing-to-down-comments-arrow-pointing-down.png"
                height={50}
                alt=""
                srcset=""
                id="errorCenter"
              />
            </div>
            <div class="col-sm bg-dark"></div>
          </div>
        ) : (
          ""
        )}

        {/* ================= Box 4*/}
        {indexZerowShow == true ? (
          <div class="row justify-content-md-center align-items-center">
            {/* first Box */}
            <div class="col-sm flex" id="invoiceBox">
              <div class="row" id="">
                <div class="col">
                  <div
                    className="site-card-wrapper"
                    style={{
                      backgroundColor: "#11366B",
                      color: "white",
                    }}
                  >
                    <table onClick={() => {}}>
                      <tr>
                        <td>Invoice</td>
                      </tr>
                      <tr>
                        <td>Ref</td>
                      </tr>
                      <tr>
                        <td>Date</td>
                      </tr>
                      <tr>
                        <td>{ProformaData.date}</td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div class="col-md-1" id="rightBox">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/109/109618.png"
                    // height={25}
                    id="rightErrow"
                    width={33}
                    alt=""
                    className=""
                    srcset=""
                  />
                </div>
              </div>
            </div>

            {/* Second Box */}
            <div class="col-sm">
              <div
                className="site-card-wrapper"
                style={{
                  backgroundColor: "#11366B",
                  color: "white",
                }}
              >
                <table onClick={() => setMurabahaModal(true)}>
                  <tr>
                    <td>Murabha</td>
                  </tr>
                  <tr>
                    <td>Ref</td>
                  </tr>
                  <tr>
                    <td>Date</td>
                  </tr>
                  <tr>
                    <td>{MurabahaData.internalReference}</td>
                  </tr>
                </table>
              </div>
              <img
                src="https://clipart-library.com/new_gallery/14-149930_arrow-pointing-to-down-comments-arrow-pointing-down.png"
                height={50}
                alt=""
                srcset=""
                id="errorCenter"
              />
            </div>
            {/* Third Box */}
            {indexfourShow == true ? (
              <>
                <div class="col-sm  flex">
                  <div class="row" id="leftBox">
                    <div class="col-md-1" id="leftError">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/109/109617.png"
                        // height={25}
                        width={33}
                        alt=""
                        className="r"
                        srcset=""
                      />
                    </div>
                    <div class="col">
                      <div
                        className=" col site-card-wrapper"
                        style={{
                          backgroundColor: "#11366B",
                          color: "white",
                        }}
                      >
                        <table onClick={() => setShow(true)}>
                          <tr>
                            <td>Promissory Note</td>
                          </tr>
                          <tr>
                            <td>{PromissoryData.id}</td>
                          </tr>
                          <tr>
                            <td>Date</td>
                          </tr>
                          <tr>
                            <td>{PromissoryData.issueDate}</td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                  {/*
                   */}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        {/* ================= Box 5*/}

        <div class="row justify-content-md-center align-items-center">
          <div class="col-sm bg-dark"></div>
          <div class="col-sm">
            <div
              className="site-card-wrapper"
              style={{
                backgroundColor: "#11366B",
                color: "white",
              }}
            >
              <table onClick={() => {}}>
                <tr>
                  <td>Good</td>
                </tr>
                <tr>
                  <td>Ref</td>
                </tr>
                <tr>
                  <td>Date</td>
                </tr>
                <tr>{/* <td>{flowData[5].state.data.date}</td> */}</tr>
              </table>
            </div>
          </div>
          <div class="col-sm bg-dark"></div>
        </div>
      </div>

      {/* =======================================================Modal */}

      {indexZerowShow == true ? (
        <Modal show={ProformaModal} onHide={() => setProformaModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Proforma Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <table id="customers">
                <tr>
                  <td>Vendor</td>
                  <td>{ProformaData.sellerAccountInfo.name}</td>
                </tr>
                <tr>
                  <td>Client</td>
                  <td>{ProformaData.buyerAccountInfo.name}</td>
                </tr>
                <tr>
                  <td>Refrence No.</td>
                  <td>{ProformaData.proformaId}</td>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{ProformaData.date}</td>
                </tr>
                <tr>
                  <td>Consignment No.</td>
                  <td>{ProformaData.goods.consignmentNumber}</td>
                </tr>
                <tr>
                  <td>ProformaData</td>
                  <td>{ProformaData.goods.asset}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{ProformaData.description}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>
                    {ProformaData.goods.quantity.value +
                      " " +
                      ProformaData.goods.quantity.unit}
                  </td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>2{ProformaData.amount}</td>
                </tr>
              </table>
            </div>
          </Modal.Body>
          <div class="modal-footer">
            {loading ? (
              <button
                type="button"
                class="btn btn-danger close"
                data-dismiss={ProformaModal}
                onClick={() => setProformaModal(false)}
              >
                Close
              </button>
            ) : (
              <Spin size="large" />
            )}
          </div>
        </Modal>
      ) : (
        ""
      )}

      {indexOneShow == true ? (
        <Modal
          show={applicationModal}
          onHide={() => setapplicationModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Application Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <table id="customers">
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                </tr>
                <tr>
                  <td>Date.</td>
                  <td>{ApplicationData.date}</td>
                </tr>
                <tr>
                  <td>Refrence No.</td>
                  <td>{ApplicationData.referenceId}</td>
                </tr>
                <tr>
                  <td>Bank</td>
                  <td>{ApplicationData.BankAccount.name}</td>
                </tr>
                <tr>
                  <td>Applicate</td>
                  <td>{ApplicationData.applicantAccount.name}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{ApplicationData.amount}</td>
                </tr>
                <tr>
                  <td>Tenor</td>
                  <td>{ApplicationData.tenor}</td>
                </tr>
                <tr>
                  <td>Item</td>
                  <td>{ApplicationData.description}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{ApplicationData.description}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{ApplicationData.amount}</td>
                </tr>
              </table>
            </div>
          </Modal.Body>
          <div class="modal-footer">
            {loading ? (
              <button
                type="button"
                class="btn btn-danger close"
                data-dismiss={applicationModal}
                onClick={() => setapplicationModal(false)}
              >
                Close
              </button>
            ) : (
              <Spin size="large" />
            )}
          </div>
        </Modal>
      ) : (
        ""
      )}
      {indexTwoShow == true ? (
        <Modal
          show={PurchaseOrderModal}
          onHide={() => setPurchaseOrderModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>PurchaseOrder Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="modal-body">
              <table id="customers">
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{PurchaseOrderData.date}</td>
                </tr>
                <tr>
                  <td>Refrence No.</td>
                  <td>{PurchaseOrderData.referenceId}</td>
                </tr>
                <tr>
                  <td>Bank</td>
                  <td>{PurchaseOrderData.bankAccountInfo.name}</td>
                </tr>
                <tr>
                  <td>Client</td>
                  <td>{PurchaseOrderData.bankAccountInfo.name}</td>
                </tr>
                <tr>
                  <td>Proforma Id</td>
                  <td>{PurchaseOrderData.applicationId}</td>
                </tr>
                <tr>
                  <td>Item</td>
                  <td>{PurchaseOrderData.description}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{PurchaseOrderData.description}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{PurchaseOrderData.tenor}</td>
                </tr>
                <tr>
                  <td>Amount</td>
                  <td>{PurchaseOrderData.amount}</td>
                </tr>
              </table>
            </div>
          </Modal.Body>
          <div class="modal-footer">
            {loading ? (
              <button
                type="button"
                class="btn btn-danger close"
                data-dismiss={PurchaseOrderModal}
                onClick={() => setPurchaseOrderModal(false)}
              >
                Close
              </button>
            ) : (
              <Spin size="large" />
            )}
          </div>
        </Modal>
      ) : (
        ""
      )}
      {indexThreeShow === true ? (
        <Modal show={MurabahaModal} onHide={() => setMurabahaModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>PurchaseOrder Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="modal-body">
              <table id="customers">
                <tr>
                  <th>Company</th>
                  <th>Contact</th>
                </tr>
                <tr>
                  <td>Date</td>
                  <td>{MurabahaData.agreementDate}</td>
                </tr>
                <tr>
                  <td>Refrence No.</td>
                  <td>{MurabahaData.internalReference}</td>
                </tr>
                <tr>
                  <td>Bank</td>
                  <td>{MurabahaData.bankAccountInfo.name}</td>
                </tr>
                <tr>
                  <td>Applicant</td>
                  <td>{MurabahaData.borrowerAccountInfo.name}</td>
                </tr>
                <tr>
                  <td>Cost Price</td>
                  <td>{MurabahaData.costPrice}</td>
                </tr>
                <tr>
                  <td>Tenor</td>
                  <td>{MurabahaData.term}</td>
                </tr>
                <tr>
                  <td>Selling Price</td>
                  <td>{MurabahaData.sellingprice}</td>
                </tr>
                <tr>
                  <td>Profile Rate</td>
                  <td>{MurabahaData.profitrate}</td>
                </tr>
                <tr>
                  <td>Item</td>
                  <td>Medicines</td>
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
          </Modal.Body>
          <div class="modal-footer">
            {loading ? (
              <button
                type="button"
                class="btn btn-danger close"
                data-dismiss={MurabahaModal}
                onClick={() => setMurabahaModal(false)}
              >
                Close
              </button>
            ) : (
              <Spin size="large" />
            )}
          </div>
        </Modal>
      ) : (
        ""
      )}
      {indexfourShow == true ? (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Promissory Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <!-- Modal body --> */}
              <div class="modal-body">
                <table id="customers">
                  <tr>
                    <th>Company</th>
                    <th>Contact</th>
                  </tr>
                  <tr>
                    <td>Issue Date.</td>
                    <td>{PromissoryData.issueDate}</td>
                  </tr>
                  <tr>
                    <td>Refrence No.</td>
                    <td>{PromissoryData.id}</td>
                  </tr>
                  <tr>
                    <td>Issuer</td>
                    <td>{PromissoryData.issuerAccount.name}</td>
                  </tr>
                  <tr>
                    <td>Payee</td>
                    <td>{PromissoryData.payeeAccount.name}</td>
                  </tr>

                  <tr>
                    <td>Amount</td>
                    <td>{PromissoryData.value}</td>
                  </tr>
                  <tr>
                    <td>Redeemad</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>Expiry</td>
                    <td>{PromissoryData.maturity}</td>
                  </tr>
                </table>
              </div>
            </Modal.Body>
            <div class="modal-footer">
              {loading ? (
                <button
                  type="button"
                  class="btn btn-danger close"
                  data-dismiss={show}
                  onClick={handleTerm}
                >
                  Close
                </button>
              ) : (
                <Spin size="large" />
              )}
            </div>
          </Modal>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
