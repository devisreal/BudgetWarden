import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";
import categoriesRoutes from "./routes/categories.route.js";
import billRoutes from "./routes/bills.routes.js";
import budgetRoutes from "./routes/budgets.routes.js";
import subscriptionRoutes from "./routes/subscriptions.route.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.CLIENT_URL_NETLIFY],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const PORT = process.env.PORT || 5050;

app.get("/", (_req, res) => {
  res.send("<h1>Hello</h1>");
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/bills", billRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
