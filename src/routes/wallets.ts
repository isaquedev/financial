import express from 'express';
import routeAdapter from '@adapters/routeAdapter';
import walletsController from '@controllers/walletsController';

const router = express.Router();

router.get("/", routeAdapter(walletsController.getAll))

export default router
