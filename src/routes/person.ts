import { Router, Application } from 'express';
import PersonController from '../controllers/person';

class PersonRoutes {
  public privateRoutes(app: Router | Application): void {
    app
      .route('/person')
      .get(PersonController.getAll)
      .post(PersonController.create);

    app
      .route('/person/:id')
      .get(PersonController.getById)
      .put(PersonController.update)
      .delete(PersonController.delete);
  }
  public publicRoutes(app: Router | Application): void {
    app.route('/person').get(PersonController.getAll);
    app.route('/person/:id').get(PersonController.getById);
  }
}

export default PersonRoutes;
