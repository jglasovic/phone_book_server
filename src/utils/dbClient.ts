import * as mongoose from 'mongoose';
import * as cf from 'config';

class DbClient {
  private dbUrl: string = cf.get('db_url');
  public connect = async () => {
    try {
      await this.connection();
      console.log('Database connected!'); // tslint:disable-line
      return true;
    } catch (error) {
      console.log('Error connecting to database!'); // tslint:disable-line
      console.log(error); // tslint:disable-line
      return false;
    }
  };
  public checkDbError = (err: Error) => {
    if (err.name === 'MongoError') {
      return this.connect();
    }
    return false;
  };

  private connection = (): Promise<typeof mongoose> => {
    return mongoose.connect(
      this.dbUrl,
      { useNewUrlParser: true }
    );
  };
}

export default DbClient;
