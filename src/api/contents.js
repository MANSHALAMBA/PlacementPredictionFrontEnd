import axios from "axios";
import { API_URL } from "../config";

export const fetchContents = token =>
	axios
		.get(`${API_URL}/task/list`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);
export const loadStudentGroups = token =>
	axios
		.get(`${API_URL}/student/groups`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const loadLectures = token =>
	axios
		.get(`${API_URL}/faculty/lectures`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const sendContent = (token, data) =>
	axios
		.post(`${API_URL}/task/send`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const editContent = (token, data, taskID) =>
	axios
		.post(`${API_URL}/task/${taskID}/edit`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);
