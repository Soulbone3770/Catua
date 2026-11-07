import express, { Router } from 'express';
import { usersController } from '../controllers/users.controller.js';
import { validateIdParams } from '../utils/validate.js';
import { checkFields } from '../utils/checkFields.js';
import type { NewUserType } from '../models/users.model.js';
import type { AuthInputType } from '../models/auth.model.js';
import authCheck from '../utils/authCheck.js';
import { auth } from '../utils/auth.js';

const router: Router = express.Router();

router.post("/api/register", checkFields<NewUserType>(["username", "email", "password"]),usersController.register);
router.post("/api/login", checkFields<AuthInputType>(["username", "email", "password", "recuerdame"]),usersController.login);
router.get("/api/getById/:id", validateIdParams, usersController.getByIdParams);
router.get("/api/authCheck", authCheck, usersController.checkAutenticacion);
router.post("/api/logout", auth, usersController.logout);


export default router;