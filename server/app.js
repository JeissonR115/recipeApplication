import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
app.use(express.json());
app.use("/", (req, res) => { res.status(200).json({ "mensaje": "hola" }) });

// export const db = await connectToDatabase({ DB_HOST, DB_USER, DB_PASSWORD, DB_NAME });

app.listen(PORT ?? 3000, () => {
    console.log(
        `Server is running on port http://${DB_HOST || "localhost"}:${PORT}`
    );
});

