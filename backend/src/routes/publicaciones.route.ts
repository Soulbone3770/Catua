import express, { Router } from 'express';
import { publicacionesController } from '../controllers/publicaciones.controller.js';
import { auth } from '../utils/auth.js';
import { upload } from '../utils/upload.js';
import { validateIdParams } from '../utils/validate.js';

const router: Router = express.Router();

router.post("/api/publish", auth, upload.single("imagen"), publicacionesController.publish);
router.delete("/api/remove/:id", auth, validateIdParams, publicacionesController.remove);
router.get("/api/getAll", auth, publicacionesController.getAll);
router.get("/api/getByUserId", auth, publicacionesController.getByUser);

export default router;