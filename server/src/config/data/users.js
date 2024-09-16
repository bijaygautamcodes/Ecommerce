import bcrypt from "bcryptjs";

const users = [
    {
        fullname: "Admin User",
        email: "admin@example.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        fullname: "John Doe",
        email: "john@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
    {
        fullname: "Jane Doe",
        email: "jane@example.com",
        password: bcrypt.hashSync("123456", 10),
    },
];

export default users;
