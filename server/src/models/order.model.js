import { Schema, model } from "mongoose";

const orderSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        orderItems: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
                quantity: { type: Number, required: true },
            },
        ],

        status: {
            type: String,
            required: true,
            default: "pending",
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

orderSchema.pre("save", async function (next) {
    const order = this;
    try {
        await order.populate("orderItems.product");
    } catch (error) {
        console.log(error);
    }
    const totalPrice = order.orderItems.reduce(
        (acc, item) =>
            acc + parseFloat(item.product.price) * parseInt(item.quantity),
        0
    );
    order.totalPrice = totalPrice;
    next();
});

const Order = model("Order", orderSchema);

export default Order;
