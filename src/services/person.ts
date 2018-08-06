import { IModelServices, IPersonModel } from '../interfaces';
import PersonModel from '../models/person';

class PersonService implements IModelServices<IPersonModel> {
  private PersonModel: PersonModel = new PersonModel();

  public getAll = () =>
    this.PersonModel.ModelType.find(
      {},
      this.PersonModel.filter // filter auto-import mongoBD _id and __v
    );

  public getOne = (Id: number) => this.PersonModel.ModelType.findOne({ Id }, this.PersonModel.filter);

  public create = (data: IPersonModel) => this.PersonModel.ModelType.create(data);

  public update = (data: IPersonModel) => this.PersonModel.ModelType.update({ _id: data._id }, data);

  public delete = (Id: number) => this.PersonModel.ModelType.deleteOne({ _id: Id });
}

export default PersonService;
