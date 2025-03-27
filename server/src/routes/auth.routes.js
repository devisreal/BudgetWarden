import express from "express";
const router = express.Router();

router.get("/login", (_req, res) => {
  res.send("Login Route");
});

router.get("/register", (_req, res) => {
  res.send("Register Route");
});

export default router;
