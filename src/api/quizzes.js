import axios from "axios";
import { API_URL } from "../config";

export const fetchQuizlist = token =>
	axios
		.get(`${API_URL}/quiz/list`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const createQuiz = (token, data) =>
	axios
		.post(`${API_URL}/quiz/create`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const fetchquizdetails = (token, quizId) =>
	axios
		.get(`${API_URL}/quiz/${quizId}/details`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const addQuestion = (token, data, quizId) =>
	axios
		.post(`${API_URL}/quiz/${quizId}/question/add`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const removeQuestion = (token, quizId, questionId) =>
	axios
		.post(`${API_URL}/quiz/${quizId}/question/${questionId}/delete`, null, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const sendScheduledata = (token, data, quizId) =>
	axios
		.post(`${API_URL}/quiz/${quizId}/schedule`, data, {
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

export const disableQuiz = (token, quizId) =>
	axios
		.post(
			`${API_URL}/quiz/${quizId}/disable`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		)
		.then(response => response.data);

export const fetchQuizdata = (token, quizId) =>
	axios
		.get(
			`${API_URL}/quiz/${quizId}`,

			{
				headers: { Authorization: `Bearer ${token}` }
			}
		)
		.then(response => response.data);

export const editEndDate = (token, quizId, data) =>
	axios
		.post(`${API_URL}/quiz/${quizId}/extend`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);
