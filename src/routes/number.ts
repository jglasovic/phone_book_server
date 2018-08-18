import { Router, Application } from 'express';
import NumberController from '../controllers/number';

class NumberRoutes {
  public privateRoutes(app: Router | Application): void {
    app
      .route('/number')
      .get(NumberController.findNumber)
      .post(NumberController.create);
    app
      .route('/number/:id')
      .put(NumberController.update)
      .delete(NumberController.delete);
  }
  public publicRoutes(app: Router | Application): void {
    app.route('/number').get(NumberController.findNumber);
  }
}

export default NumberRoutes;
