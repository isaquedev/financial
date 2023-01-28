import express from 'express';
import routeAdapter from '@adapters/routeAdapter';
import authController from '@controllers/authController';
import middlewareAdapter from '@adapters/middlewareAdapter';
import { isAuthenticated } from '@middlewares/index';

const router = express.Router();

router.post("/login", routeAdapter(authController.login))
router.post("/register", routeAdapter(authController.register))
router.get("/whoami", middlewareAdapter(isAuthenticated), routeAdapter(authController.whoAmI))

export default router
