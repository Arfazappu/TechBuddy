import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import exchangeRoutes from './routes/exchangeRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5555;


app.use('/api', userRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/exchange', exchangeRoutes);

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to the Techbuddy server")
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("App is connected");


        app.listen(PORT, () => {
            console.log(`App is listening at port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error.message);
    })