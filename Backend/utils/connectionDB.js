import mongoose from "mongoose";

// Define a function to connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Mongoose connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};

export default connectDB;
