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
    GROQ_API_KEY : process.env.GROQ_API_KEY,
    GOOGLE_CLIENT_ID : process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET : process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK_URL : process.env.GOOGLE_CALLBACK_URL, 
    GITHUB_CLIENT_ID : process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET : process.env.GITHUB_CLIENT_SECRET,
    GITHUB_CALLBACK_URL : process.env.GITHUB_CALLBACK_URL
    
}


export default config