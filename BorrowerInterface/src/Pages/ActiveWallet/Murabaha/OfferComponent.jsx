import { React, useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getData, postData } from "../../../Api";
import StoreContext from "../../../ContextApi";
import MurbaState from "./MurbahaState.json";
import Filter from "../../filter/filter";
import Item from "antd/lib/list/Item";
import { Spin } from "antd";
import "./Murabaha.css";
import MurabahaPagination from "../../Pagination";

let itemsPerPage = 5;  //pagination per page here


export default function OfferComponent() {
  const [murabahas, setMurabahas] = useState(MurbaState);
  const contextData = useContext(StoreContext);
  const [item, setItem] = useState(null);
  console.log(contextData.SignInData, "murabaha Context Data");

  //  pagination new state here
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(murabahas?.length / itemsPerPage);



  const [loading, setloading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const notify = () =>
    toast.success("🦄 Successfully completed Transaction", {
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
    console.log("Sign in in Murabaha", contextData.SignInData);
    let payload = {
      account: contextData.SignInData.UserAccountNo,
      consumable: "",
    };
    getData("received-murabaha", payload, setMurabahas);
  }, []);

  const handleMurabahaOffer = async () => {
    setloading(false);

    setTimeout(() => {
      setloading(true); // 1
      handleClose(); // 2
      notify(); // 3
    }, 2000);


    let api = "murabaha/accept";
    let payload = {
      stateId: item.internalReference,
      account: contextData.SignInData.UserAccountNo,
    };
    console.log("In  murabaha/accept", payload);
    const resp = await postData(api, payload);
    console.log(resp, "resp");
  };


  // paginatio function here
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const displayedData = murabahas.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  console.log("Ali====>dat", murabahas)

  return (
    <div className="card card-cascade narrower">
      <Filter />
      <div
        className="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center"
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
        <h2 className="text-center">Murabaha Contact</h2>
        <table className="table table-hover">
          <thead className="bg-light">
            <tr>
              <th>Date</th>
              <th>Refrence No</th>
              <th>Bank</th>
              <th>Borrower</th>
              <th>Term</th>
              <th>Cost Price</th>
              <th></th>
            </tr>
          </thead>
          {displayedData?.map((v, i) => {
            return (
              <tbody>
                <tr>
                  <td>{v?.agreementDate}</td>
                  <td>{v?.internalReference}</td>
                  <td>{v?.bankAccountInfo?.name}</td>
                  <td>{v?.bankAccountInfo?.name}</td>
                  {/* <td>Buyer 1</td>  */}
                  <td>{v?.term}</td>
                  <td>{v?.costPrice}</td>

                  <td>
                    <span
                      type="button"
                      className="btn btn-warning btn-rounded"
                      data-toggle="modal"
                      data-target="#myModal"
                      onClick={() => setItem(v)}
                    >
                      View
                    </span>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <MurabahaPagination count={totalPages} page={page} onChange={handlePageChange} data={MurbaState}/>
        </div>
      </div>

      <div className="modal" id="myModal">
        <div className="modal-dialog modal-dialog-scrollable-sm">
          <div className="modal-content" style={{ width: "115%" }}>
            {/* <!-- Modal Header --> */}
            <div className="modal-header">
              <h3 className="modal-title">Murabaha Agreement Details</h3>
              <button
                type="button"
                className="btn btn-danger close"
                data-dismiss="modal"
              >
                X
              </button>
            </div>

            {item != null ? (
              <div className="modal-body">
                <table id="customers">
                  <tr>
                    <th>Company</th>
                    <th>Contact</th>
                  </tr>
                  <tr>
                    <td>Date</td>
                    <td>{item.agreementDate}</td>
                  </tr>
                  <tr>
                    <td>Refrence No.</td>
                    <td>{item.internalReference}</td>
                  </tr>
                  <tr>
                    <td>Bank</td>
                    <td>{item.bankAccountInfo.name}</td>
                  </tr>
                  <tr>
                    <td>Applicant</td>
                    <td>{item.borrowerAccountInfo.name}</td>
                  </tr>
                  <tr>
                    <td>Cost Price</td>
                    <td>{item.costPrice}</td>
                  </tr>
                  <tr>
                    <td>Tenor</td>
                    <td>{item.term}</td>
                  </tr>
                  <tr>
                    <td>Selling Price</td>
                    <td>{item.sellingprice}</td>
                  </tr>
                  <tr>
                    <td>Profile Rate</td>
                    <td>{item.profitrate}</td>
                  </tr>
                  <tr>
                    <td>Item</td>
                    <td>{item.goods.asset}</td>
                  </tr>
                  <tr>
                    <td>Bank Signature</td>
                    {Item.bankSignature ? <td>Signed</td> : <td>Un Signed</td>}
                  </tr>
                  <tr>
                    <td>Brorower Signature</td>
                    {Item.borrowerSignature ? (
                      <td>Signed</td>
                    ) : (
                      <td>Un Signed</td>
                    )}
                  </tr>
                </table>
              </div>
            ) : (
              <></>
            )}
            {/* <!-- Modal footer --> */}
            <div className="modal-footer">
              {loading ? (
                <button
                  type="button"
                  className="btn btn-success close"
                  data-dismiss={show}
                  onClick={handleMurabahaOffer}
                >
                  Offer
                </button>
              ) : (
                <Spin size="large" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
