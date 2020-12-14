import axios from "axios";
//import { API_URL } from "../config";

export const evaluateresult = (token, data) =>
  axios
    .post(`/userinput`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.data);

export const fetchData = token =>
  axios
    .get(`/dashboarddata`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => response.data);
