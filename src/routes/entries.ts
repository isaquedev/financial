import express from 'express';
import routeAdapter from '@adapters/routeAdapter';
import entriesController from '@controllers/entriesController';

const router = express.Router();

router.get("/", routeAdapter(entriesController.getAll))

export default router
