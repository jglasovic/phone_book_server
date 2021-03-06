import { Router, Application } from 'express';
import PhoneTypeController from '../controllers/phone_type';

class PhoneTypeRoutes {
  public privateRoutes(app: Router | Application): void {
    app
      .route('/phone_type')
      .get(PhoneTypeController.getAll)
      .post(PhoneTypeController.create);
    app
      .route('/phone_type/:id')
      .put(PhoneTypeController.update)
      .delete(PhoneTypeController.delete);
  }
  public publicRoutes(app: Router | Application): void {
    app.route('/phone_type').get(PhoneTypeController.getAll);
  }
}

export default PhoneTypeRoutes;
