import * as express from 'express';
import User from './user';
import AssetRouter from './assets';

class Routes {
  private AssetRouter: AssetRouter = new AssetRouter();
  private User: User = new User();

  public initRoutes(app: express.Application): void {
    this.User.initRoutes(app);
    this.AssetRouter.initRoutes(app);
  }
}

export default Routes;
