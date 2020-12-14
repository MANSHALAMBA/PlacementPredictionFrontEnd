import axios from "axios";
import { API_URL } from "../config";

export const fetchDashboardData = token =>
	axios
		.get(`${API_URL}/faculty/dashboard`, {
			headers: { Authorization: `Bearer ${token}` }
		})
		.then(response => response.data);
