import { React, useState, useEffect } from "react";
import "./TermSheetData.css";
import TermSheetState from "./TermSheetState.json";
import Modal from "react-bootstrap/Modal";
import { Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import Filter from "../../filter/filter";

import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; // Import the CSS

export default function TermSheetData() {
  // TermSheetState.map((v, i) => {
  //   console.log(v, "GoodState");
  // });

  const [loading, setloading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  function handleTerm(params) {
    setloading(false);

    setTimeout(() => {
      setloading(true); // 1
      handleClose(); // 2
      notify(); // 3
    }, 2000);
  }

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  let localData = JSON.parse(localStorage.getItem("items"));

  console.log(localData._immutable.currentContent.blockMap, "raza");

  const text = draftToHtml(localData._immutable.currentContent);

  // setEditorState(localData);
  console.log(text, "raza==================>");
  return (
    <div>
      <div class="card card-cascade narrower">
        <ToastContainer />
        {/* <Filter data={{ TermSheetState, setGoods }}/> */}
        <div
          class="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-3 d-flex justify-content-between align-items-center"
          style={{ marginTop: "-5%" }}
        ></div>
        <div class="container mt-3">
          <h2 className="text-center">Term Sheets</h2>

          <table class="table table-hover">
            <thead class="bg-light">
              <tr>
                <th>Bank</th>
                <th>Term Sheet Ref</th>
                <th>Limit</th>
                <th>Tenor</th>
                <th>Rate</th>
                <th>Expiry</th>
                <th></th>
              </tr>
            </thead>
            {TermSheetState.map((v, i) => {
              return (
                <tbody>
                  <tr>
                    <td>{v.bankAccountInfo.name}</td>
                    <td>{v.termSheetReference}</td>
                    <td>{v.limit}</td>
                    <td>{v.tenor}</td>
                    <td>{v.referenceRate}</td>
                    <td></td>

                    <td>
                      <span
                        type="button"
                        class="btn btn-warning btn-rounded"
                        data-toggle="modal"
                        data-target="#myModal"
                        //  onClick={() => setClinetID(v._id)}
                        onClick={() => handleShow()}
                      >
                        View
                      </span>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Applications Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <!-- Modal body --> */}
          {TermSheetState.map((v, i) => {
            return (
              <div class="modal-body">
                <table id="customers">
                  <tr>
                    <th>Company</th>
                    <th>{v.borrowerAccountInfo.name}</th>
                  </tr>
                  <tr>
                    <td>Bank</td>
                    <td>{v.bankAccountInfo.name}</td>
                  </tr>
                  <tr>
                    <td>Refernce No</td>
                    <td>{v.termSheetReference}</td>
                  </tr>
                  <tr>
                    <td>Limit</td>
                    <td>{v.limit}</td>
                  </tr>
                  <tr>
                    <td>Tenor</td>
                    <td>{v.tenor}</td>
                  </tr>
                  <tr>
                    <td>Refernce Rate</td>
                    <td>{v.referenceRate}</td>
                  </tr>
                  <tr>
                    <td>Spread</td>
                    <td>{v.spread}</td>
                  </tr>
                  <tr>
                    <td>Issue Date</td>
                    <td>{v.issueDate}</td>
                  </tr>
                  <tr>
                    <td>Acceptance</td>
                    <td>Pending</td>
                  </tr>
                </table>
              </div>
            );
          })}
        </Modal.Body>
        <div class="modal-footer">
          {loading ? (
            <button
              type="button"
              class="btn btn-success close"
              data-dismiss={show}
              onClick={handleTerm}
            >
              Accept
            </button>
          ) : (
            <Spin size="large" />
          )}
        </div>
      </Modal>
    </div>
  );
}
