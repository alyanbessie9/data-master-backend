import cors from "cors";
import express from "express";
import userRoutes from "./routes/userRoutes.js"; // Pastikan untuk menggunakan .js

const app = express();
const PORT = process.env.PORT || 3000;

// Menggunakan middleware CORS untuk mengizinkan permintaan dari sumber lain
app.use(cors());

// Middleware untuk mem-parsing body JSON
app.use(express.json());

// Mengatur rute untuk pengguna
app.use("/api/users", userRoutes);

// Memulai server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
