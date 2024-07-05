import { React, useState, useEffect, useRef } from 'react';
import './filter.css'
import { Input } from 'antd';
import { Form } from 'react-bootstrap';

export default function Filter({ data }) {

    let issueDate = useRef();
    let endDate = useRef();
    let refData = useRef();
    let issuerData = useRef();

    let datafilter = data.JsonData


    function handler() {
        let filterissueDate = issueDate.current.value
        let filterendDate = endDate.current.value
        let filterendref = refData.current.input.value
        let filterendissuer = issuerData.current.input.value

        console.log(filterendref, filterendissuer);
        let filter = datafilter.filter((value) => {
            if (value.date >= filterissueDate && value.date <= filterendDate || value.referenceId == filterendref) {
                return (
                    value
                )
            } else if (value.referenceId == filterendref) {
                return (
                    value
                )
            } else if (value.applicantAccount.name == filterendissuer) {
                return (
                    value
                )
            }
        })
        data.setfilterItem(filter)
    }

    return (
        <div>
            <div class="d-flex">
                <div class="p-2 w-100"></div>
                <div class="flex-shrink-1">
                    <a
                        class="btn btn-primary"
                        data-mdb-toggle="collapse"
                        href="#collapseExample"
                        role="button"
                        aria-expanded="false"
                        id='filter-button'
                        aria-controls="collapseExample"
                    >Filter
                    </a>
                </div>
            </div>


            {/* <!-- Collapsed content --> */}

            <div class="collapse mt-3" id="collapseExample">
                <div >
                    <div class="row mb-5 mx-5" id='filterColor'>

                        <div class="col-md-3">
                            <div class="col-example z-depth-3 flex-center">
                                <p >
                                    <label class="form-label text-white">
                                        Issue Date<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        placeholder="Date of Birth"
                                        ref={issueDate}
                                    />
                                </p>
                            </div>
                        </div>

                        <div class="col-md-3">

                            <div class="col-example z-depth-4 flex-center">
                                <p >
                                    <label class="form-label text-white">
                                        End Date<span class="text-danger"> *</span>
                                    </label>
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        placeholder="End of Data"
                                        ref={endDate}
                                    />
                                </p>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="col-example z-depth-5 flex-center">
                                <p class="white-text">
                                    <label class="form-label text-white">
                                        Refrence Number<span class="text-danger"> *</span>
                                    </label>
                                    <Input placeholder=" Refrence Number" ref={refData} /></p>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div class="col-example z-depth-5  flex-center">
                                <p class="white-text">
                                    <label class="form-label text-white">
                                        Applicant<span class="text-danger"> *</span>
                                    </label>
                                    <Input placeholder=" Issuer Number" ref={issuerData} /></p>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="p-2 w-100"></div>
                            <div class="col-md-2">
                                <div class="  flex-center">
                                    <p class="white-text">
                                        <button id="search-button" type="button" onClick={handler} class="btn btn-secondary">
                                            <i class="fas fa-search"></i> Search
                                        </button></p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div >
    )
}