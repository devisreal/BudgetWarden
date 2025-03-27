import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

const PORT = process.env.PORT || 5050;

app.get("/", (_req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
