import { Router } from "express";
import {
  update,
  getAll,
  remove,
  removeAll,
} from "../controllers/cardController.ts";

const router = Router();

router.post("/update", (req, res) => update(req, res, req.app.locals.redis));
router.get("/get", (req, res) => getAll(req, res, req.app.locals.redis));
router.delete("/delete", (req, res) => remove(req, res, req.app.locals.redis));
router.delete("/delete-all", (req, res) =>
  removeAll(req, res, req.app.locals.redis)
);

export default router;
