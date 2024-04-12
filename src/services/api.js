import axios from "axios";
var accessToken = "";
let userData=localStorage.getItem("user")
if(userData)
{
    var user=JSON?.parse(localStorage.getItem("user"));
}


if (typeof window !== "undefined") {

	accessToken = user?.accessToken;
}
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
	headers: {
		Authorization: `${accessToken}`,
		"Content-Type": "application/json",
	},
});
export const formApi = axios.create({
	baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
	headers: {
		Authorization: `Bearer ${accessToken}`,
	},
});
// Request interceptor
api.interceptors.request.use(
	async (config) => {
       // const auth=JSON.parse(localStorage.getItem("user"));
		const token =  user?.accessToken;
		if (token && config.headers) {
			config.headers.setAuthorization(`Bearer ${token}`);
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);
// End of Request interceptor



export default api;