import { Router, Application } from 'express';
import UserRoutes from './user';
import PersonRoutes from './person';
import NumberRoutes from './number';
import PhoneTypeRoutes from './phone_type';

class Routes {
  private RouterV1: Router = Router();
  private PresonRoutes: PersonRoutes = new PersonRoutes();
  private UserRoutes: UserRoutes = new UserRoutes();
  private NumberRoutes: NumberRoutes = new NumberRoutes();
  private PhoneTypeRoutes: PhoneTypeRoutes = new PhoneTypeRoutes();

  public initRoutes(app: Application | Router): void {
    app.use('/api/v1/', this.RouterV1);
    this.UserRoutes.initRoutes(app);
    this.PresonRoutes.initRoutes(this.RouterV1);
    this.NumberRoutes.initRoutes(this.RouterV1);
    this.PhoneTypeRoutes.initRoutes(this.RouterV1);
  }
}

export default Routes;
