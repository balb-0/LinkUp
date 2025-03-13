import express from "express";
import path from "path";

const router = express.Router();

const frontendPath = path.join(
  __dirname,
  "../../../frontend/dist/frontend/browser"
);

router.get("/register", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

export default router;
