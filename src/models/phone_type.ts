import { Schema, Model, model } from 'mongoose';
import { IPhoneTypeModel, IModelClass } from '../interfaces';

class PhoneTypeModel implements IModelClass<IPhoneTypeModel> {
  public ModelType: Model<IPhoneTypeModel>;
  public ModelSchema: Schema;
  public filter: string = '-__v'; // filter auto-import mongoBD __v
  constructor() {
    this.ModelSchema = new Schema({
      Name: String,
    });
    this.ModelType = model<IPhoneTypeModel>('Phone_type', this.ModelSchema);
  }
}

export default PhoneTypeModel;
