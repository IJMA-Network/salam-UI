import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
//const baseApi = "http://192.168.100.8:10050/api/murabaha/";
const baseApi = "http://localhost:10050/api/murabaha/";

export const createPorforma = async (payload) => {
  console.log(payload, "payload");
  const apiURL = baseApi + "proforma/create";

  try {
    var response = await axios.post(apiURL, payload);
    console.log("API Response", response);

    return response;
  } catch (error) {
    console.log("Error in Create Proforma", error);

    return error;
  }
};

export const getData = async (api, payload, dispatch) => {
  const apiUrl = baseApi + api;
  console.log("before calling API", apiUrl, payload);
  try {
    var response = await axios.post(apiUrl, payload);

    console.log("API Response", response);
    dispatch(response.data);
    return response;
  } catch (error) {
    console.log("Error in  get Data", apiUrl, error);

    return error;
  }
};

export const postData = async (api, payload) => {
  const apiUrl = baseApi + api;
  console.log("before calling API", apiUrl, payload);
  try {
    var response = await axios.post(apiUrl, payload);
    console.log("postData API Response", response);
    toast.success("Suucessfully completed");
    return response;
  } catch (error) {
    console.log("Error in  postt Data", apiUrl, error);
    toast.error("Error in ztxn");

    return error;
  }
};
