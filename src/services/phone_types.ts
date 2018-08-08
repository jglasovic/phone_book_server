import { IModelServices, IPhoneTypeModel } from '../interfaces';
import PhoneTypesModel from '../models/phone_type';

class PhoneTypesService implements IModelServices<IPhoneTypeModel> {
  public getAll = () =>
    PhoneTypesModel.ModelType.find(
      {},
      PhoneTypesModel.filter // filter auto-import mongoBD _id and __v
    );

  public getOne = (_id: number) => PhoneTypesModel.ModelType.findOne({ _id }, PhoneTypesModel.filter);

  public create = (data: IPhoneTypeModel) => PhoneTypesModel.ModelType.create(data);

  public update = (data: IPhoneTypeModel) => PhoneTypesModel.ModelType.update({ _id: data._id }, data);

  public delete = (_id: number) => PhoneTypesModel.ModelType.deleteOne({ _id });
}

export default PhoneTypesService;
