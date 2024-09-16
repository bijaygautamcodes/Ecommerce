import axios from "@/config/axios.config";

export const getOrders = async (token) => {
    try {
        const response = await axios.get("/orders/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response);
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const getMyOrders = async (token) => {
    try {
        const response = await axios.get("/orders/myorders", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};
export const createOrder = async (orders, token) => {
    try {
        const response = await axios.post(
            "/orders/",
            { orderItems: orders },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

export const updateOrderStatus = async (id, status, token) => {
    try {
        const response = await axios.put(
            `/orders/${id}`,
            { status },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};

// removeOrder
export const removeOrder = async (id, token) => {
    try {
        const response = await axios.delete(`/orders/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        console.error(error.message);
        return {
            status: error.response.status,
            message: error.response.data.message,
        };
    }
};
