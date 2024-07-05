import React from 'react'
import './VaultPromissory.css'
import PromissoryNote from './VaultPromissoryState.json'

export default function VaultPromissory() {

  PromissoryNote.map((v, i) => { console.log(v, "xzxzx") })


  return (
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
        <h2 className='text-center'>Promissory Notes Detail</h2>

        <table class="table table-hover">
          <thead class="bg-light">
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
            PromissoryNote.map((v, i) => {
              return (

                <tbody>
                  <tr>
                    <td>{v.issueDate}</td>
                    <td>{v.id}</td>
                    <td>{v.issuerAccount.name}</td>
                    <td>{v.payeeAccount.name}</td>
                    <td>{v.value}</td>
                    <td>{v.maturity}</td>
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
      <div class="modal" id="myModal">
        <div class="modal-dialog modal-dialog-scrollable-sm">
          <div class="modal-content" style={{ width: "115%" }}>

            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h3 class="modal-title">Promissory Note Details</h3>
              <button type="button" class="btn btn-danger close" data-dismiss="modal">X</button>
            </div>

            {/* <!-- Modal body --> */}
            {PromissoryNote.map((v, i) => {
              return (
                <div class="modal-body">
                  <table id="customers">

                    <tr>
                      <th>Company</th>
                      <th>Contact</th>
                    </tr>
                    <tr>
                      <td>Issue Date.</td>
                      <td>{v.issueDate}</td>
                    </tr>
                    <tr>
                      <td>Refrence No.</td>
                      <td>{v.id}</td>
                    </tr>
                    <tr>
                      <td>Issuer</td>
                      <td>{v.issuerAccount.name}</td>
                    </tr>
                    <tr>
                      <td>Payee</td>
                      <td>{v.payeeAccount.name}</td>
                    </tr>
                    <tr>
                      <td>Amount</td>
                      <td>{v.value}</td>
                    </tr>
                    <tr>
                      <td>Redeemad</td>
                      <td>Yes</td>
                    </tr>
                    <tr>
                      <td>Expiry</td>
                      <td>{v.maturity}</td>
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
