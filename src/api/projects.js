import axios from "axios";
import { API_URL } from "../config";

export const loadProjectList = token =>
	axios
		.get(`${API_URL}/project/list`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const CreateProjectGroup = (token, data) =>
	axios
		.post(`${API_URL}/project/group/create`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const CreateMilestone = (token, data) =>
	axios
		.post(`${API_URL}/project/milestones/create`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const fetchFacultyGroups = token =>
	axios
		.get(`${API_URL}/faculty/groups`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const fetchProjectGroups = token =>
	axios
		.get(`${API_URL}/project/groups`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const CreateReviewEvent = (token, data) =>
	axios
		.post(`${API_URL}/project/review/event/create`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const sendMessage = (token, data, projectID) =>
	axios
		.post(`${API_URL}/project/${projectID}/message/send`, data, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const fetchMessages = (token, projectID) =>
	axios
		.get(`${API_URL}/project/${projectID}/messages`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);

export const SubmissionReview = (token, data, submissionID) =>
	axios
		.post(
			`${API_URL}/project/milestone/submission/${submissionID}/review`,
			data,
			{
				headers: { Authorization: `Bearer ${token}` }
			}
		)
		.then(response => response.data);

export const fetchProjectdata = (token, projectId) =>
	axios
		.get(
			`${API_URL}/project/${projectId}`,

			{
				headers: { Authorization: `Bearer ${token}` }
			}
		)
		.then(response => response.data);
