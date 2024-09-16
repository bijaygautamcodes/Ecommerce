import dotenv from "dotenv";
import users from "./config/data/users.js";
import products from "./config/data/products.js";
import User from "./models/user.data.js";
import Product from "./models/product.model.js";
import connectDB from "./config/db.js";
import colors from "colors";
colors.enable();

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log("Data Imported!".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
