import { IRouter } from 'express';

import auth from './auth';
import entries from './entries';
import wallets from './wallets';

const routes = (app: IRouter) => {
  app.use('/auth', auth)
  app.use('/entries', entries);
  app.use('/wallets', wallets)
}

export default routes
