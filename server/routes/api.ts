import { Router } from "express";
import { saveCard, getKey } from "../controllers/cardController.ts";

const router = Router();

router.post("/update", (req, res) => saveCard(req, res, req.app.locals.redis));
router.get("/get", (req, res) => getKey(req, res, req.app.locals.redis));

export default router;
