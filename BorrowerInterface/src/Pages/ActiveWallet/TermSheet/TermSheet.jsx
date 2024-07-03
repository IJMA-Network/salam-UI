import React, { useContext } from 'react';
import './TermSheet.css';
import { Form } from 'react-bootstrap';


export default function TermSheet() {





    return (
        <div class="container-fluid px-1 py-5 mx-auto">
            <div class="row d-flex justify-content-center">
                <div class="col-xl-7 col-lg-8 col-md-9 col-11 ">
                    {/* <h3>Issue Term Sheet</h3>
                        <p class="blue-text">Just a few Ijma Sheet<br /> so that we can personalize the right experience for you.</p> */}
                    <div class="card ">
                        <h3 className='text-center'>Issue Proforma</h3>
                        {/* <p class="blue-text text-center">Just a few Ijma Sheet<br /> so that we can personalize the right experience for you.</p> */}
                        <form class="form-card">

                            <div class="form-group col-12 flex-column d-flex">
                                <label class="form-label">Client Account<span class="text-danger"> *</span></label>
                                <input type="text" id="ans" name="ans" placeholder="Client IBAN" onblur="validate(6)" />
                            </div>
                            {/* <br /> */}


                            <div class="row justify-content-between text-left">
                                <div class="form-group col-sm-12 flex-column d-flex">
                                    <label class="form-label">Node Name <span class="text-danger"> *</span></label>
                                    <select name="" id="" class="form-select">
                                        <option value="">5000</option>
                                        <option value="">1000</option>
                                        <option value="">500</option>
                                        <option value="">100</option>
                                    </select>
                                </div>

                                {/* <div class=" form-group col-sm-6 flex-column d-flex form-label">

                                    <Form.Group controlId="dob" class="form-label">
                                        <label class="form-label">Expiry<span class="text-danger"> *</span></label>
                                        <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                                    </Form.Group>
                                </div> */}
                            </div>

                            {/* <br /> */}
                            <div class="row justify-content-between text-left">
                                <div class="form-group col-12 flex-column d-flex">
                                    <label class="form-label">Proforma Number<span class="text-danger"> *</span></label>
                                    <input type="text" id="ans" name="ans" placeholder="Proforma Number" onblur="validate(6)" />
                                </div>
                            </div>
                            {/* <br /> */}

                            <div class="row justify-content-between text-left">
                                <div class="form-group col-12 flex-column d-flex">
                                    <label class="form-label">Consignment No<span class="text-danger"> *</span></label>
                                    <input type="text" id="ans" name="ans" placeholder="Consignment No" onblur="validate(6)" />
                                </div>
                            </div>
                            {/* <br /> */}
                            <div class="row justify-content-between text-left">
                                <div class="form-group col-12 flex-column d-flex">
                                    <label class="form-label">item<span class="text-danger"> *</span></label>
                                    <input type="text" id="ans" name="ans" placeholder="item" onblur="validate(6)" />
                                </div>
                            </div>
                            {/* <br /> */}

                            <div class="row justify-content-between text-left">
                                <div class="form-group col-12 flex-column d-flex">
                                    <label class="form-label">Description<span class="text-danger"> *</span></label>
                                    <input type="text" id="ans" name="ans" placeholder="Description" onblur="validate(6)" />
                                </div>
                            </div>
                            {/* <br /> */}

                            <div class="row justify-content-between text-left">
                                <div class="form-group col-sm-6 flex-column d-flex">
                                    <label class="form-label">Quantity<span class="text-danger"> *</span></label>
                                    <input type="text" id="fname" name="fname" placeholder="Quantity" onblur="validate(1)" />
                                </div>
                                <div class="form-group col-sm-6 flex-column d-flex">
                                    <label class="form-label">Unity<span class="text-danger"> *</span></label>
                                    <input type="text" id="lname" name="lname" placeholder="Unity" onblur="validate(2)" />
                                </div>
                            </div>

                            {/* <br /> */}

                            <div class="row justify-content-between text-left">
                                <div class="form-group col-12 flex-column d-flex">
                                    <label class="form-label">Amount<span class="text-danger"> *</span></label>
                                    <input type="text" id="ans" name="ans" placeholder="Amount" onblur="validate(6)" />
                                </div>
                            </div>
                            {/* <br /> */}
                            <br />

                            <div class="d-grid gap-2 col-6 mx-auto">
                                <button type="submit" class="btn-block btn-primary">ISSUE</button> </div>
                            {/* <button class="btn btn-primary" type="button">Button</button> */}

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
