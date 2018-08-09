import { IPhoneTypeModel } from '../interfaces';
import PhoneTypesModel from '../models/phone_type';

class PhoneTypesService {
  public getAll = () =>
    PhoneTypesModel.ModelType.find(
      {},
      PhoneTypesModel.filter // filter auto-import mongoBD _id and __v
    ).exec();

  public create = (data: IPhoneTypeModel) => PhoneTypesModel.ModelType.create(data);

  public update = (data: IPhoneTypeModel) =>
    PhoneTypesModel.ModelType.findByIdAndUpdate(data._id, data, { new: true }).exec();

  public delete = (_id: number) => PhoneTypesModel.ModelType.deleteOne({ _id }).exec();
}

export default PhoneTypesService;
