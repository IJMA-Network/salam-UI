import React from 'react'
import './TermSheetData.css'
import TermSheetState from './TermSheetState.json'


export default function TermSheetData() {

  TermSheetState.map((v, i) => { console.log(v, "GoodState") })

  return (
    <div>
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
          <h2 className='text-center'>Term Sheet Details</h2>

          <table class="table table-hover">
            <thead class="bg-light">
              <tr>
                <th>Bank</th>
                <th>Term Sheet Ref</th>
                <th>Limit</th>
                <th>Tenor</th>
                <th>Rate</th>
                <th>Expire</th>
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
      </div>


      <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-scrollable-sm">
          <div class="modal-content" style={{ width: "115%" }}>

            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h3 class="modal-title">Term Sheet Detail</h3>
              <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
            </div>

            {/* <!-- Modal body --> */}
            {TermSheetState.map((v, i) => {
              return (
                <div class="modal-body">
                  <table id="customers">

                    <tr>
                      <th>Company</th>
                      <th>Contact</th>
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
                      <td>In Accepted</td>
                      <td>Pendding</td>
                    </tr>


                  </table>

                </div>
              )
            })}



            {/* <!-- Modal footer --> */}
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>


    </div>
  )
}
