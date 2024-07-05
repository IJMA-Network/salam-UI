import React, { useRef, useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import "./TermSheet.css";
import axios from "axios";
import { createTerm } from "../../Api/api";
import StoreContext from "../../ContextApi";

import Select from 'react-select';

import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"; // Import the CSS
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function TermSheet() {
  const contextData = useContext(StoreContext);
  const [bank, setBank] = useState({ accountName: "Bank1" });//Todo change it
  const [terms, setTerms] = useState(null);
  const [modalShow, setModalShow] = useState(false); // Initialize modal state

  const Client = useRef();
  const Expire = useRef();
  const Refrense = useRef();
  const FacilityType = useRef();
  const Limit = useRef();
  const Tenor = useRef();
  const Rate = useRef();
  const Spread = useRef();

  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState("");


  useEffect(() => {
    setBank(contextData.SignInData);
  }, [contextData.SignInData]);

  //useEffect for API
  useEffect(() => {
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://localhost:5000/allnames');
        console.log('api response',response.data);
        setFileList(response.data);

      } catch(error){
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
    }, []);

    //---- for loading content in editor


    async function fetchRawStringData() {
      const response = await fetch('your-api-endpoint');
      const rawStringData = await response.text();
      return rawStringData; // This should be the raw JSON string content
    }
    
    function parseRawStringData(rawStringData) {
      return JSON.parse(rawStringData);
    }
  

function convertParsedDataToContentState(parsedData) {
  return convertFromRaw(parsedData);
}
const getDataAndUpdateState = async () => {
  const rawStringData = await fetchRawStringData();
  const parsedData = parseRawStringData(rawStringData);
  const contentState = convertFromRaw(parsedData);
  setEditorState(EditorState.createWithContent(contentState));
};
//--
  const FormSubmit = () => {
    var profitRate = {
      referenceRate: Rate.current.value,
      spread: Spread.current.value,
    };

    var data = {
      bank: bank.UserAccountNo,
      client: Client.current.value,
      termsheetReference: Refrense.current.value,
      facilityType: FacilityType.current.value,
      limit: Limit.current.value,
      tenor: Tenor.current.value,
      profitRate: profitRate,
      expiry: Expire.current.value,
    };

    

    createTerm(data);
  };

  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("termeditorContent");
    if (savedContent) {
      const contentBlock = htmlToDraft(savedContent);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        return EditorState.createWithContent(contentState);
      }
    }
    return EditorState.createEmpty();
  });

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  useEffect(() => {
    const content = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    localStorage.setItem("termeditorContent", content);
  }, [editorState]);

  function extractTextFromHTML(htmlString) {
    var doc = new DOMParser().parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  }
  const handleAttach = () => {
    console.log("In attach",terms);
  }

  const handleSave = () => {
    console.log(
      "Saving content:",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );

    var htmlString = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    var textContent = extractTextFromHTML(htmlString);

    console.log(textContent);
    let fileName = prompt('enter the name of the file')
    let fileObj={
      label: fileName,
      hash:"NA",
      content:textContent
    }
    console.log("File Object",fileObj);
    saveData(fileObj);

  };
 const saveData = async(fileObj)=>{
      try{
        const response = await axios.post('http://localhost:5000/addTerms',fileObj);
        const status= response.status;
        console.log('api responsefrom Save Data',status);
        switch (status){
          case 200:
            alert (" Terms Saved Successfully");
            break;
          case 201:
            // code to execute if expression === 201
           case 202:
          // code to execute if expression === 202
          default:
            // code to execute if no case matches
        }


      } catch(error){
        console.error('Error saving data: ', error);
      }
    };
  const toolbarOptions = {
    options: [
      "fontSize",
      "inline",
      "list",
      "textAlign",
      "colorPicker",
      "link",
      "embedded",
    ],
    inline: { options: ["bold", "italic", "underline", "strikethrough"] },
    list: { options: ["unordered", "ordered"] },
    textAlign: { options: ["left", "center", "right"] },
    fontSize: { options: [8, 12, 16, 24] },
  };

  return (
    <div class="container-fluid px-1 py-5 mx-auto">
      <div class="row d-flex justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-9 col-11 ">
          <h3 className="text-center">Issue Term Sheet</h3>
          <div class="card ">
            {/* form fields */}
            <form
              class="form-card"
              onSubmit={(e) => {
                e.preventDefault();
                FormSubmit();
              }}
            >
              <div class="form-group col-12 flex-column d-flex">
                <label class="form-label">
                  Client Account<span class="text-danger"> *</span>
                </label>
                <input
                  type="text"
                  id="ans"
                  name="ans"
                  placeholder="Client AAccount-IBAN"
                  //   onblur="validate(6)"
                  ref={Client}
                />
              </div>
              {/* <br /> */}

              <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-label">
                    Bank <span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="Bank Detail"
                    //   onblur="validate(6)"
                    ref={bank}
                  />
                  {/* <select
                    name=""
                    id=""
                    class="form-select"
                    onChange={(e) => setNodeName(e.target.value)}
                  >
                    <option value="ABC Bank">ABC Bank</option>
                    <option value="XYZ Bank">XYZ Bank</option>
                    <option value="DEF Bank">DEF Bank</option>
                    <option value="GHI Bank">GHI Bank</option>
                  </select> */}
                </div>

                <div class=" form-group col-sm-6 flex-column d-flex form-label">
                  <Form.Group controlId="dob" class="form-label">
                    <label class="form-label">
                      Expiry<span class="text-danger"> *</span>
                    </label>
                    <Form.Control
                      type="date"
                      name="dob"
                      ref={Expire}
                      placeholder="Date of Birth"
                    />
                  </Form.Group>
                </div>
              </div>

              {/* <br /> */}
              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    Term Sheet Refrence<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder=""
                    // onblur="validate(6)"
                    ref={Refrense}
                  />
                </div>
              </div>
              {/* <br /> */}

              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    Facility Type<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder=""
                    // onblur="validate(6)"
                    ref={FacilityType}
                  />
                </div>
              </div>
              {/* <br /> */}
              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    Limit<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder=""
                    // onblur="validate(6)"
                    ref={Limit}
                  />
                </div>
              </div>
              {/* <br /> */}

              <div class="row justify-content-between text-left">
                <div class="form-group col-12 flex-column d-flex">
                  <label class="form-label">
                    Tenor<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="ans"
                    name="ans"
                    placeholder="tenor in months"
                    // onblur="validate(6)"
                    ref={Tenor}
                  />
                </div>
              </div>
              {/* <br /> */}

              <div class="row justify-content-between text-left">
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-label">
                    Refrance Rate<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    placeholder="Benchmark Rate in %"
                    // onblur="validate(1)"
                    ref={Rate}
                  />
                </div>
                <div class="form-group col-sm-6 flex-column d-flex">
                  <label class="form-label">
                    Spread<span class="text-danger"> *</span>
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    placeholder="Spread in%"
                    // onblur="validate(2)"
                    ref={Spread}
                  />
                </div>
              </div>

              <br />

              <Button
                variant="primary"
                onClick={() => setModalShow(true)}
                style={{ width: "100%", marginBottom: "10px" }}
              >
                Add Terms
              </Button>

              <TermsEditor
               handleAttach={handleAttach}
                show={modalShow}
                fileList={fileList}
                setTerms={setTerms}
                onHide={() => setModalShow(false)}
                editorState={editorState}
                setEditorState={setEditorState}
                onEditorStateChange={onEditorStateChange}
                handleSave={handleSave}
                toolbarOptions={toolbarOptions}
              />
              <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn-block btn-primary">
                  ISSUE
                </button>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function TermsEditor({
  show,
  onHide,
  handleAttach,
  setTerms,
  editorState,
  setEditorState,
  onEditorStateChange,
  handleSave,
  toolbarOptions,
  fileList,
  // tryCatch

}) {


  

  //dummy values for react item picker
  const items = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2', data: { someKey: 'someValue' } },
    { value: 3, label: 'Option 3' },
  ];
  //dummy values for react item picker

  const [selectedValue, setSelectedValue] = useState(null);
  const [content, setContent] = useState(null);
  // const handleChange = (selectedOption) => {
  //   setSelectedValue(selectedOption);
  //   // console.log('Selected object:', selectedOption); // Logs the entire object
  // };

  const handleLoad =async()=>{
    console.log(selectedValue,fileList);
    setTerms(selectedValue);
   const resp=await fetchDocument(selectedValue.label);
   console.log('content response',selectedValue,resp);
   const value=resp;
    const document =ContentState.createFromText(value);
    setEditorState(EditorState.createWithContent(document));

  }
async function  fetchDocument(fName){
  let payload={
    
      filter:{
        label:fName},
      projections:{
        content:1,
        label:1,
      _id:1}
    }
  
      try{
        const response = await axios.post('http://localhost:5000/getfiltereddocuments',payload);
        console.log('document response',response.data[0].content);
        setContent(response.data[0].content);
      return response.data[0].content;


      } catch(error){
        console.error('Error fetching data: ', error);
      }
    };
    


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="container-fluid px-1 py-5 mx-auto">
          <div style={{ display:'flex', flexDirection:'row-reverse', gap: '10px',}}>
              <Button onClick={handleLoad}>Load</Button>
            <div style={{width:'30%', alignContent: 'center'}}>
          <Select
             value={selectedValue}
             onChange={setSelectedValue}
             options={fileList}
          />
          </div>
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-xl-9 col-lg-9 col-md-10 col-11">
              <h3 className="text-center">Text Editor</h3>
              <div>
                <Editor
                  editorState={editorState}
                  onEditorStateChange={onEditorStateChange}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  toolbarClassName="toolbar-class"
                  toolbar={toolbarOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
              <button onClick={handleSave}>Save</button>
              <button onClick={handleAttach} style={{ margin: "0px 5px" }}>Attach</button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
