import { Router, Application } from 'express';
import AssetController from '../controllers/assets';

class AssetLinkData {
  private routeV1: Router = Router();

  public initRoutes(app: Router | Application): void {
    app.use('/api/v1/', this.routeV1);

    this.routeV1
      .route('/assets')
      .get(AssetController.getAll)
      .post(AssetController.createOrUpdate)
      .put(AssetController.createOrUpdate);

    this.routeV1
      .route('/assets/:id')
      .get(AssetController.getById)
      .put(AssetController.createOrUpdate)
      .delete(AssetController.delete);
  }
}

export default AssetLinkData;
