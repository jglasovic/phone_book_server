import { Router, Application } from 'express';
import PersonController from '../controllers/person';

class PersonRoutes {
  public initRoutes(app: Router | Application): void {
    app
      .route('/person')
      .get(PersonController.getAll)
      .post(PersonController.create)
      .put(PersonController.update);

    app
      .route('/person/:id')
      .get(PersonController.getById)
      .put(PersonController.update)
      .delete(PersonController.delete);
  }
}

export default PersonRoutes;
