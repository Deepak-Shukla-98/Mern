import axios from "axios";
import ServiceHandler from "./servicehandler";

let url = process.env.REACT_APP_BASE_URL;

export const signUp = async (payload) => {
  return await ServiceHandler(axios.post(`${url}/login/signup`, payload));
};
export const signIn = async (payload) => {
  return await ServiceHandler(axios.post(`${url}/login/signin`, payload));
};
export const home = async (payload) => {
  return await ServiceHandler(
    axios.get(`${url}/home`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
export const getProfile = async (payload) => {
  return await ServiceHandler(
    axios.get(`${url}/profile`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      params: payload,
    })
  );
};
export const updateProfile = async (payload) => {
  return await ServiceHandler(
    axios.put(`${url}/profile/${payload.id}`, payload.data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
  );
};
