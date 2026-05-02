import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/database.js";










connectDB();
const port = config.PORT||5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});