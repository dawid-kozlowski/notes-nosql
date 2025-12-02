import { Router } from "express";
import {
  update,
  getAll,
  remove,
  removeAll,
  loadLibraryData,
  clearLibraryData,
  getLibraryData,
  loadJsonCompany,
  demoJsonCommands,
  deleteJsonData,
} from "../controllers/cardController.ts";

const router = Router();

router.post("/update", (req, res) => update(req, res, req.app.locals.redis));
router.get("/get", (req, res) => getAll(req, res, req.app.locals.redis));
router.delete("/delete", (req, res) => remove(req, res, req.app.locals.redis));

router.delete("/delete-all", (req, res) =>
  removeAll(req, res, req.app.locals.redis)
);
router.post("/load-library", (req, res) =>
  loadLibraryData(req, res, req.app.locals.redis)
);
router.delete("/clear-library", (req, res) =>
  clearLibraryData(req, res, req.app.locals.redis)
);

router.get("/library-data", (req, res) =>
  getLibraryData(req, res, req.app.locals.redis)
);

router.post("/load-json", (req, res) =>
  loadJsonCompany(req, res, req.app.locals.redis)
);

router.get("/demo-json", (req, res) =>
  demoJsonCommands(req, res, req.app.locals.redis)
);

router.delete("/delete-json", (req, res) =>
  deleteJsonData(req, res, req.app.locals.redis)
);

export default router;
