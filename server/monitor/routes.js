import express from "express";
import arena from "./arena.js";

const router = express.Router();

router.use("/", arena);

export default router;
