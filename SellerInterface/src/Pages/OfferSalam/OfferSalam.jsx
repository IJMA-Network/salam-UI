import React, { useRef, useState, useEffect,useContext } from "react";
import { Button, notification } from "antd";
import StoreContext from "../../ContextApi";
import axios from "axios";
import "./OfferSalam.css";
import { Form } from "react-bootstrap";
import { createPorforma } from "../../Api/Api";


import Select from 'react-select';


export default function Proforma() {

  // const [pickerValue, setPickerValue] = useState('');
  // console.log("Picker Values",pickerValue);


  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueUnit, setSelectedValueUnit] = useState(null);


  const handleChange = (value) => {
    setSelectedValue(value);
  };

  const itemPickerUnits = [
    {value: 'meters', label: 'Meters'},
    {value: 'kgs', label: 'Kgs'},
    {value: 'litres', label: 'Litres'},
    
   ]


  const contextData = useContext(StoreContext);

  const[user,setUser]=useState({accountName:"SellerNo. 1",UserAccountNo:"Seller1"});

  useEffect(()=>{
    setUser(contextData.SignInData)

 console.log("User in Proforma",contextData.SignInData);
 setUser(contextData.SignInData);

  
},[contextData.SignInData])

  const Description = useRef();
  const PorValue = useRef();
  const unit = useRef();
  const Proforma = useRef();
  const Consign = useRef();
  const Amount = useRef();
  const Client = useRef();
  const Seller = useRef();
  const Item = useRef();
//
  const FormSubmit = () => {
    var quantity = {
        value: PorValue.current.value,
        unit: unit.current.value,
    };

    var data = {
      seller: user.UserAccountNo,
      client: Client.current.value,
      salamId: Proforma.current.value,
      consignNo: Consign.current.value,
      item: Item.current.value,
      description: Description.current.value,
      quantity: quantity,
      amount: Amount.current.value,
    };
    const myJSON = JSON.stringify(data);
    createPorforma(data);
  };

  return (
    <div class="container-fluid px-1 py-5 mx-auto">
      <div class="row d-flex justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-9 col-11 ">
          {/* <h3>Issue Term Sheet</h3>
                        <p class="blue-text">Just a few Ijma Sheet<br /> so that we can personalize the right experience for you.</p> */}
          <div class="card ">
            <h3 className="text-center">Offer Salam form</h3>
            {/* <p class="blue-text text-center">Just a few Ijma Sheet<br /> so that we can personalize the right experience for you.</p> */}
            <form
              class="form-card"
              onSubmit={(e) => {
                e.preventDefault();
                FormSubmit();
              }}
            >
              {/* <div class="form-group col-12 flex-column d-flex">
                <label class="form-label">
                  seller<span class="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  id="ans"
                  name="ans"
                  placeholder="Seller1"
                  ref={Seller}
                  onblur="validate(6)"
                />
              </div> */}
              {/* <br /> */}

              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    Bank<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="Buyer1"
                    ref={Client}
                    onblur="validate(6)"
                  />
                </div>
                {/* <div class="form-group col-sm-12 flex-column d-flex">
                                    <label class="form-label">Node Name <span class="text-danger"> *</span></label>
                                    <select name="" id="" class="form-select">
                                        <option value="">5000</option>
                                        <option value="">1000</option>
                                        <option value="">500</option>
                                        <option value="">100</option>
                                    </select>
                                </div> */}

                {/* <div class=" form-group col-sm-6 flex-column d-flex form-label">

                                    <Form.Group controlId="dob" class="form-label">
                                        <label class="form-label">Expiry<span class="text-danger"> *</span></label>
                                        <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                                    </Form.Group>
                                </div> */}
              <div className="ItemPicker">
              <Select 
              // options={pickerValue} 
              value={selectedValue} 
              onChange={handleChange} 
              />
              
              </div>
              </div>

              {/* <br /> */}
              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    Proforma Id<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="PR-1"
                    ref={Proforma}
                    onblur="validate(6)"
                  />
                </div>
              </div>
              {/* <br /> */}

              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    Consign No<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="CN-1"
                    ref={Consign}
                    onblur="validate(6)"
                  />
                </div>
              </div>
              {/* <br /> */}
              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    item<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="Cotton"
                    ref={Item}
                    onblur="validate(6)"
                  />
                </div>
              </div>
              {/* <br /> */}

              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    Description<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="EgyptianCotton"
                    ref={Description}
                    onblur="validate(6)"
                  />
                </div>
              </div>
              {/* <br /> */}

              <div style={{display: 'flex', flexDirection: 'row',}}>
              <div class="row justify-content-between text-left">
                <div class=" form-group col-sm-5 flex-column d-flex form-label">
                  <label class="form-label">
                    Value<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="1000.0"
                    onblur="validate(1)"
                    ref={PorValue}
                  />
                </div>

                {/* <div class="form-group col-sm-5 flex-column d-flex">
                  <label class="form-label">
                    unit<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="Meters"
                    onblur="validate(1)"
                    ref={unit}
                  />
                </div> */}


                  <div>
                  <Select  
                    
                    placeholder="Unit"
                    options={itemPickerUnits}
                    // onChange={handleChangeUnit}
                    // value={selectedValueUnit}
                  />
                </div>
                </div>

                <div class=" form-group col-sm-2 flex-column d-flex form-label">
                  <label class="form-label mt-4">
                    <span class="text-danger"></span>
                  </label>

                  {/* <button class="btn btn-primary" type="button" onClick={QuizOPtion}>+</button> */}
                </div>
              </div>

              {/* <br /> */}

              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    Amount<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="5000000"
                    ref={Amount}
                    onblur="validate(6)"
                  />
                </div>
              </div>
              {/* <br /> */}
              <br />

              <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn-block btn-primary">
                  ISSUE
                </button>{" "}
              </div>
              {/* <button class="btn btn-primary" type="button">Button</button> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
