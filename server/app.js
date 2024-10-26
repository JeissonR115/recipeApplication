import express from "express";
import dotenv from "dotenv";
import cors from "cors";  // Importar cors
import connectToDatabase from "./src/database.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
app.use("/", router);

// Conectar a la base de datos
export const db = await connectToDatabase({ DB_HOST, DB_USER, DB_PASSWORD, DB_NAME });

// Iniciar el servidor
app.listen(PORT ?? 3000, () => {
    console.log(
        `Server is running on port http://${DB_HOST || "localhost"}:${PORT}`
    );
});
