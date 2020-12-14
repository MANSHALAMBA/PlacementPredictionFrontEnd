import axios from "axios";
import { API_URL } from "../config";

export const loadLectures = token =>
	axios
		.get(`${API_URL}/faculty/lectures`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const loadStudentList = (token, classroomID) =>
	axios
		.get(`${API_URL}/classroom/${classroomID}/student/list`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);
