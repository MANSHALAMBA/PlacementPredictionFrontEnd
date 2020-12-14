import axios from "axios";
import { API_URL } from "../config";

export const fetchFaculties = token =>
	axios
		.get(`${API_URL}/faculty/list`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const creategroup = (token, data) =>
	axios
		.post(`${API_URL}/faculty/group/create`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);
