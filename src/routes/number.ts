import { Router, Application } from 'express';
import NumberController from '../controllers/number';

class NumberRoutes {
  public initRoutes(app: Router | Application): void {
    app
      .route('/number')
      .get(NumberController.findNumber)
      .post(NumberController.create);
    app
      .route('/number/:id')
      .put(NumberController.update)
      .delete(NumberController.delete);
  }
}

export default NumberRoutes;
