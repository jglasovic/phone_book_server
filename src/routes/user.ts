import { Application, Router } from 'express';
import UserControler from '../controllers/user';

class UserRouter {
  public initRoutes(app: Application | Router): void {
    app.route('/login').post(UserControler.loginUser);
  }
}

export default UserRouter;
