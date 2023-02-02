import express from 'express';
import routeAdapter from '@adapters/routeAdapter';
import walletsController from '@controllers/walletsController';
import middlewareAdapter from '@adapters/middlewareAdapter';
import { isAuthenticated, validateRequest } from '@middlewares/index';
import validateRequestAdapter from '@adapters/validateRequestAdapter';
import { walletValidations } from '@models/wallet';

const router = express.Router();

router.get("/", middlewareAdapter(isAuthenticated), routeAdapter(walletsController.getAll))
router.post("/",
  middlewareAdapter(isAuthenticated),
  validateRequestAdapter(validateRequest, walletValidations.changeValidation),
  routeAdapter(walletsController.create)
)
router.put("/:id",
  middlewareAdapter(isAuthenticated),
  validateRequestAdapter(validateRequest, walletValidations.changeValidation),
  routeAdapter(walletsController.update)
)
router.delete("/:id", middlewareAdapter(isAuthenticated), routeAdapter(walletsController.remove))

export default router
