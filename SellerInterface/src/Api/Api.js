import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

//const baseApi = "http://192.168.100.8:10050/api/murabaha/";
const baseApi = "http://localhost:10050/api/murabaha/";

export const createPorforma = async (payload) => {
  console.log(payload, "payload in createProforma");
  const apiURL = baseApi + "proforma/create";

  try {

    var response = await axios.post(apiURL, payload);
    console.log("API Response", response);
    toast.success("Successfully Created Proforma");
    return response;
  } catch (error) {
    console.log("Error in Create Proforma", error);
notify("Error in Proforma");
    return error;
  }
};

export const getData = async (api, payload,dispatch) => {

  const apiUrl = baseApi + api;
  console.log("before calling API", apiUrl,payload);
  try {

    var response = await axios.post(apiUrl, payload);
    
     console.log("API Response", response);
dispatch(response.data);
return response;

  } catch (error) {
    console.log("Error in  get Data",apiUrl, error);

    return error;
  }
};

export const postData = async (api, payload) => {

  const apiUrl = baseApi + api;
  console.log("before calling API", apiUrl,payload);
  try {

    var response = await axios.post(apiUrl, payload);
    
     console.log("postData API Response", response);

return response;

  } catch (error) {
    console.log("Error in  post Data",apiUrl, error);

    return error;
  }
};





  
  const notify = (msg) => toast.error(msg, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
