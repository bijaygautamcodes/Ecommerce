import axios from "@/config/axios.config";

export const getProducts = async () => {
    try {
        const response = await axios.get("/products/");
        return response.data.products;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const getTopProducts = async () => {
    try {
        const response = await axios.get("/products/top");
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const getProductByID = async (id) => {
    try {
        const response = await axios.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const createProduct = async (product, token) => {
    try {
        const response = await axios.post("/products/", product, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

// remove
export const deleteProduct = async (id, token) => {
    try {
        const response = await axios.delete(`/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return {
            status: response.status,
            data: response.data,
        };
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};
