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
    this.UserRoutes.initRoutes(app);
    this.PresonRoutes.publicRoutes(app);
    this.NumberRoutes.publicRoutes(app);
    this.PhoneTypeRoutes.publicRoutes(app);

    app.use('/api/v1/', this.RouterV1);
    this.PresonRoutes.privateRoutes(this.RouterV1);
    this.NumberRoutes.privateRoutes(this.RouterV1);
    this.PhoneTypeRoutes.privateRoutes(this.RouterV1);
  }
}

export default Routes;
