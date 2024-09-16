import axios from "@/config/axios.config";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post("/users/", userData);
        return { status: response.status, message: response.data.message };
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const verifyPassword = async (password) => {
    try {
        const response = await axios.post(`/users/verify-password`, {
            password,
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};

export const verifyFullnameAndEmail = async (fullname, email) => {
    try {
        const response = await axios.post("/users/verify-fullname-and-email", {
            fullname,
            email,
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};

export const loginUser = async (userData) => {
    try {
        const response = await axios.post("/users/login", userData);
        console.log(response);
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error(error.response);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const verifyOTP = async (id, otp) => {
    try {
        const response = await axios.post("/users/verify-otp", { id, otp });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get("/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};

export const updateUserProfile = async (token, updatedData) => {
    try {
        const response = await axios.put("/users/profile", updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { status: error.code, message: error.message };
    }
};
