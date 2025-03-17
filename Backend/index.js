import express from "express";
import cors from "cors";
import route from "./routes/User.js";
import connectDB from "./utils/connectionDB.js";

const port = process.env.PORT || 8000

const app = express()

connectDB();


app.use(express.json())
app.use(cors());
app.use("/api",route);

app.listen(port,() => {
    console.log(`Server start ${port}`);
    
})