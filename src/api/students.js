import axios from "axios";
import { API_URL } from "../config";

export const fetchStudents = token =>
	axios
		.get(`${API_URL}/student/list`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const creategroup = (token, data) =>
	axios
		.post(`${API_URL}/student/group/create`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);
