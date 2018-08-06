import { Router, Application } from 'express';
import PersonController from '../controllers/person';

class PersonRoutes {
  public initRoutes(app: Router | Application): void {
    app
      .route('/person')
      .get(PersonController.getAll)
      .post(PersonController.createOrUpdate)
      .put(PersonController.createOrUpdate);

    app
      .route('/person/:id')
      .get(PersonController.getById)
      .put(PersonController.createOrUpdate)
      .delete(PersonController.delete);
  }
}

export default PersonRoutes;
