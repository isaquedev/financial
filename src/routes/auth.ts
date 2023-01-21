import express from 'express';
import routeAdapter from '@adapters/routeAdapter';
import authController from '@controllers/authController';

const router = express.Router();

router.post("/login", routeAdapter(authController.login))
router.post("/register", routeAdapter(authController.register))

export default router
