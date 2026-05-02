import dotenv from 'dotenv';

dotenv.config();

const config = {
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECRET : process.env.JWT_SECRET,
    CLIENT_URL : process.env.CLIENT_URL,
    PORT : process.env.PORT || 5000,
    NODE_ENV : process.env.NODE_ENV,
    JWT_COOKIE_EXPIRE : process.env.JWT_COOKIE_EXPIRE,
    JWT_EXPIRE : process.env.JWT_EXPIRE, 
    MISTRAL_API_KEY : process.env.MISTRAL_API_KEY, 
    GROQ_API_KEY : process.env.GROQ_API_KEY

}


export default config