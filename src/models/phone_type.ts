import { Schema, Model, model } from 'mongoose';
import { IPhoneTypeModel, IModelClass } from '../interfaces';

class PhoneTypeModel {
  public static filter: string = '-__v'; // filter auto-import mongoBD __v
  public static readonly ModelSchema: Schema = new Schema({
    Name: String,
  });
  public static readonly ModelType: Model<IPhoneTypeModel> = model<IPhoneTypeModel>(
    'Phone_type',
    PhoneTypeModel.ModelSchema
  );
}

export default PhoneTypeModel;
