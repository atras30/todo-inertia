import axios from "axios";

// axios
const axiosInstance = axios.create();
axiosInstance.defaults.withCredentials = true;

//Request Interceptor
axiosInstance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error === null) {
            toast.error("Something went wrong...");
            return Promise.reject(error);
        }

        const status = error?.response?.status || "";

        if (status === 401) {
            displayUnauthorizedResponse(error);
        } else if (String(error?.response?.status).startsWith("4")) {
            console.log("Error : ", error);
            toast.error(
                error?.response?.data?.message ??
                    error?.message ??
                    "Client Error."
            );
        } else if (String(error?.response?.status).startsWith("5")) {
            console.log("Error : ", error);
            toast.error(
                error?.response?.data?.message ??
                    error?.message ??
                    "Server Error."
            );
        } else {
            toast.error("Something went wrong...");
        }

        return Promise.reject(error);
    }
);

async function displayUnauthorizedResponse(error) {
    // Display Message
    let errorMessage = "";
    if (error.response.data.message)
        errorMessage = `[Error :  ${error.response.data.message}]`;

    console.log(`You're not authorized for this action. ${errorMessage}`);
}

export default axiosInstance;
