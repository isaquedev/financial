import express from 'express';
import routeAdapter from '@adapters/routeAdapter';
import walletsController from '@controllers/walletsController';
import middlewareAdapter from '@adapters/middlewareAdapter';
import { isAuthenticated } from '@middlewares/index';

const router = express.Router();

router.get("/",  middlewareAdapter(isAuthenticated), routeAdapter(walletsController.getAll))
router.post("/", middlewareAdapter(isAuthenticated), routeAdapter(walletsController.create))
router.put("/:id", middlewareAdapter(isAuthenticated), routeAdapter(walletsController.update))

export default router
