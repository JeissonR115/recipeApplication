import mariadb from "mariadb";

const connectToDatabase = async ({
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
}) => {
  const dbPool = mariadb.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    connectionLimit: 5,
  });
  try {
    await dbPool.getConnection();
    console.log("Database connection established successfully.");
    return dbPool;
  } catch (error) {
    console.log("Error connecting to the database:", error.message);
    throw error; 
  }
};

export default connectToDatabase;
