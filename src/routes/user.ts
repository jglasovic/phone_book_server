import { Application, Router } from 'express';
import AdminControler from '../controllers/admin';

class AdminRouter {
  public initRoutes(app: Application | Router): void {
    app.route('/login').post(AdminControler.login);
  }
}

export default AdminRouter;
