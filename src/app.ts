import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { absolutePath } from '../docs/swagger-ui-dist';
import Authentication from './middlewares/authentication';
import Routes from './routes';
import DbClient from './services/dbClient';

class App {
  private app: express.Application = express();
  private Auth: Authentication = new Authentication('/api/v1/');
  private Router: Routes = new Routes();
  private DBClient: DbClient = new DbClient();

  public config = (): express.Application => {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use('/docs', express.static(absolutePath()));
    this.app.all('/api/v1/*', [this.Auth.authenticate]);
    this.Router.initRoutes(this.app);
    this.DBClient.connect();

    return this.app;
  };
}

export default App;
