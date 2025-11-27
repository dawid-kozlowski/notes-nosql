import { Router } from "express";
import { update, getAll } from "../controllers/cardController.ts";

const router = Router();

router.post("/update", (req, res) => update(req, res, req.app.locals.redis));
router.get("/get", (req, res) => getAll(req, res, req.app.locals.redis));

export default router;
