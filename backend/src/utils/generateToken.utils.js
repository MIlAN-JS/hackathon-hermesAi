import jwt from "jsonwebtoken";
import config from "../config/config.js";

const generateToken = (id) => {
    try {
        const token = jwt.sign({ id }, config.JWT_SECRET, {
            expiresIn: config.JWT_EXPIRE,
        });
        return token;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export default generateToken;