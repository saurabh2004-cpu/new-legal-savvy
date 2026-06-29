import { connectDB } from "./db/connectDb.js";
import { app } from "./app.js";
// import "./utils/cron.js";

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
    // Connect to database after server is listening to prevent Passenger 503 timeouts
    connectDB().catch(error => {
        console.error("Database connection failed:", error);
    });
});

server.on('error', (error) => {
    console.error("Server error:", error);
});