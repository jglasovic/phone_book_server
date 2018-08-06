import { Router, Application } from 'express';
import UserRoutes from './user';
import PersonRoutes from './person';

class Routes {
  private RouterV1: Router = Router();
  private PresonRoutes: PersonRoutes = new PersonRoutes();
  private UserRoutes: UserRoutes = new UserRoutes();

  public initRoutes(app: Application | Router): void {
    app.use('/api/v1/', this.RouterV1);
    this.UserRoutes.initRoutes(app);
    this.PresonRoutes.initRoutes(this.RouterV1);
  }
}

export default Routes;
