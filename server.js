import * as dotenv from "dotenv";
dotenv.config()
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import jobRouter from "./routes/jobRouter.js"
import authRouter from "./routes/authRouter.js"

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use('/api/v1/jobs', jobRouter)
app.use('/api/v1/auth', authRouter)

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' })
})

const port = process.env.PORT || 5100

try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(5100, () => {
        console.log(`Server is running on port ${port}`)
    })
} catch (error) {
    console.log(error);
    process.exit(1)
}

