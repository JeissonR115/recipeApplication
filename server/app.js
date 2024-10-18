import express from "express";
import dotenv from "dotenv";
import connectToDatabase from "./src/database.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
app.use(express.json());
app.use("/", router);

export const db = await connectToDatabase({ DB_HOST, DB_USER, DB_PASSWORD, DB_NAME });

app.listen(PORT ?? 3000, () => {
    console.log(
        `Server is running on port http://${DB_HOST || "localhost"}:${PORT}`
    );
});

